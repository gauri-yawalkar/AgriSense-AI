import os
import json
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
from torch.utils.data import DataLoader
import argparse
import time
import matplotlib.pyplot as plt
import csv

# Force all outputs to the same directory this script resides in!
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

def plot_and_save_history(history):
    plt.figure(figsize=(10, 5))
    plt.plot(history['train_loss'], label='Train Loss', color='blue', marker='o')
    plt.plot(history['val_loss'], label='Validation Loss', color='red', marker='o')
    plt.title('Training and Validation Loss')
    plt.xlabel('Epochs')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)
    plt.savefig(os.path.join(OUTPUT_DIR, 'loss_curve.png'))
    plt.close()

    plt.figure(figsize=(10, 5))
    plt.plot(history['train_acc'], label='Train Accuracy', color='blue', marker='o')
    plt.plot(history['val_acc'], label='Validation Accuracy', color='red', marker='o')
    plt.title('Training and Validation Accuracy')
    plt.xlabel('Epochs')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)
    plt.savefig(os.path.join(OUTPUT_DIR, 'accuracy_curve.png'))
    plt.close()

    csv_path = os.path.join(OUTPUT_DIR, 'training_log.csv')
    with open(csv_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Epoch', 'Train Loss', 'Val Loss', 'Train Acc', 'Val Acc'])
        for i in range(len(history['train_loss'])):
            writer.writerow([
                i + 1, 
                f"{history['train_loss'][i]:.4f}", 
                f"{history['val_loss'][i]:.4f}", 
                f"{history['train_acc'][i]:.4f}", 
                f"{history['val_acc'][i]:.4f}"
            ])
    print(f"Saved training curves and CSV logs to {OUTPUT_DIR}")

def train_model(data_dir, epochs=15, batch_size=32, lr=0.001):
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")

    data_transforms = {
        'train': transforms.Compose([
            transforms.RandomResizedCrop(224),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(15),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'val': transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    if not os.path.exists(data_dir):
        print(f"Error: Data directory '{data_dir}' not found.")
        return

    image_datasets = {x: datasets.ImageFolder(os.path.join(data_dir, x), data_transforms[x]) for x in ['train', 'val']}
    dataloaders = {x: DataLoader(image_datasets[x], batch_size=batch_size, shuffle=True, num_workers=4) for x in ['train', 'val']}
    dataset_sizes = {x: len(image_datasets[x]) for x in ['train', 'val']}
    class_names = image_datasets['train'].classes
    num_classes = len(class_names)
    
    print(f"Found {num_classes} classes: {class_names}")

    class_mapping = {i: name for i, name in enumerate(class_names)}
    with open(os.path.join(OUTPUT_DIR, 'rice_class_mapping.json'), 'w') as f:
        json.dump(class_mapping, f, indent=4)

    weights = EfficientNet_B0_Weights.DEFAULT
    model = efficientnet_b0(weights=weights)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.1)

    best_acc = 0.0
    history = {'train_loss': [], 'val_loss': [], 'train_acc': [], 'val_acc': []}
    start_time = time.time()

    for epoch in range(epochs):
        print(f'\nEpoch {epoch+1}/{epochs}')
        print('-' * 10)
        epoch_metrics = {}

        for phase in ['train', 'val']:
            if phase == 'train': model.train()
            else: model.eval()

            running_loss = 0.0
            running_corrects = 0

            for inputs, labels in dataloaders[phase]:
                inputs, labels = inputs.to(device), labels.to(device)
                optimizer.zero_grad()
                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(inputs)
                    _, preds = torch.max(outputs, 1)
                    loss = criterion(outputs, labels)
                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)
                
            if phase == 'train': scheduler.step()

            epoch_loss = running_loss / dataset_sizes[phase]
            epoch_acc = (running_corrects.double() / dataset_sizes[phase]).item()
            epoch_metrics[f'{phase}_loss'] = epoch_loss
            epoch_metrics[f'{phase}_acc'] = epoch_acc
            print(f'{phase.capitalize()} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')

            if phase == 'val' and epoch_acc > best_acc:
                best_acc = epoch_acc
                torch.save(model.state_dict(), os.path.join(OUTPUT_DIR, 'best_rice_effnet.pth'))
                print(" -> Saved new best model!")
                
        history['train_loss'].append(epoch_metrics['train_loss'])
        history['val_loss'].append(epoch_metrics['val_loss'])
        history['train_acc'].append(epoch_metrics['train_acc'])
        history['val_acc'].append(epoch_metrics['val_acc'])

        if epoch == 0 and epochs > 1:
            time_for_one_epoch = time.time() - start_time
            remaining_epochs = epochs - 1
            eta_seconds = time_for_one_epoch * remaining_epochs
            print(f"\n[ETA] Epoch 1 took {time_for_one_epoch:.0f}s. Estimated time remaining for {remaining_epochs} epochs: {eta_seconds // 60:.0f}m {eta_seconds % 60:.0f}s")

    time_elapsed = time.time() - start_time
    print(f'\nTraining complete in {time_elapsed // 60:.0f}m {time_elapsed % 60:.0f}s')
    print(f'Best Validation Accuracy: {best_acc:.4f}')
    
    plot_and_save_history(history)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Train EfficientNet-B0 on Rice Dataset")
    default_data_dir = r"c:\T4T\leaf disease\indian-leaf-disease\raw_datasets\rice_split"
    parser.add_argument('--data_dir', type=str, default=default_data_dir, help='Path to the split dataset directory')
    parser.add_argument('--epochs', type=int, default=15, help='Number of epochs to train')
    parser.add_argument('--batch_size', type=int, default=32, help='Batch size')
    parser.add_argument('--lr', type=float, default=0.001, help='Learning rate')
    args = parser.parse_args()
    
    train_model(args.data_dir, args.epochs, args.batch_size, args.lr)
