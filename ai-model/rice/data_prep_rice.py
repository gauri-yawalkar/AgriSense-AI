import os
import shutil
import random

def move_rice_folders(base_dir):
    source_dir = os.path.join(base_dir, "Crop-disease-02")
    dest_dir = os.path.join(base_dir, "rice")
    
    print(f"Moving rice folders from {source_dir} to {dest_dir}...")
    os.makedirs(dest_dir, exist_ok=True)
        
    if os.path.exists(source_dir):
        for folder_name in os.listdir(source_dir):
            if folder_name.lower().startswith("rice"):
                src_path = os.path.join(source_dir, folder_name)
                dst_path = os.path.join(dest_dir, folder_name)
                if os.path.isdir(src_path) and not os.path.exists(dst_path):
                    shutil.move(src_path, dst_path)
                    print(f" -> Moved {folder_name}")
    else:
        print(f"Source directory {source_dir} not found. Assuming folders are already moved.")

def prepare_rice_dataset(base_dir):
    input_dir = os.path.join(base_dir, "rice")
    output_dir = os.path.join(base_dir, "rice_split")
    
    print(f"\nPreparing classification dataset from {input_dir}...")
    if not os.path.exists(input_dir):
        print(f"Input directory {input_dir} not found!")
        return
        
    os.makedirs(output_dir, exist_ok=True)
    for split in ['train', 'val']:
        os.makedirs(os.path.join(output_dir, split), exist_ok=True)
        
    classes = [d for d in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, d))]
    if not classes:
        print(f"No class folders found in {input_dir}!")
        return
        
    split_ratio = 0.8
    for class_name in classes:
        class_path = os.path.join(input_dir, class_name)
        images = [f for f in os.listdir(class_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.JPG'))]
        
        random.seed(42)
        random.shuffle(images)
        
        n_train = int(len(images) * split_ratio)
        train_imgs = images[:n_train]
        val_imgs = images[n_train:]
        
        os.makedirs(os.path.join(output_dir, 'train', class_name), exist_ok=True)
        os.makedirs(os.path.join(output_dir, 'val', class_name), exist_ok=True)
        
        for img in train_imgs:
            shutil.copy(os.path.join(class_path, img), os.path.join(output_dir, 'train', class_name, img))
        for img in val_imgs:
            shutil.copy(os.path.join(class_path, img), os.path.join(output_dir, 'val', class_name, img))
            
    print(f"Dataset preparation complete! Data is available in {output_dir}")

if __name__ == "__main__":
    raw_datasets_dir = r"c:\T4T\leaf disease\indian-leaf-disease\raw_datasets"
    move_rice_folders(raw_datasets_dir)
    prepare_rice_dataset(raw_datasets_dir)
