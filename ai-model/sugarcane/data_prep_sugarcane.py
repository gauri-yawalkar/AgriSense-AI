import os
import shutil
import random

def move_and_merge_sugarcane(base_dir):
    source_dir = os.path.join(base_dir, "Crop-disease-sugarcane")
    raw_datasets_dir = os.path.join(base_dir, "raw_datasets")
    dest_dir = os.path.join(raw_datasets_dir, "sugarcane")
    
    print(f"Moving and merging sugarcane folders to {dest_dir}...")
    os.makedirs(dest_dir, exist_ok=True)
    
    # Mapping old folder names to the unified structure
    mapping = {
        "Healthy": "Sugarcane_Healthy",
        "Sugarcane_Healthy": "Sugarcane_Healthy",
        "RedRot": "Sugarcane_Red Rot",
        "Sugarcane_Red Rot": "Sugarcane_Red Rot",
        "Mosaic": "Sugarcane_Mosaic",
        "Rust": "Sugarcane_Rust",
        "Yellow": "Sugarcane_Yellow",
        "Sugarcane_Bacterial Blight": "Sugarcane_Bacterial Blight"
    }
        
    if os.path.exists(source_dir):
        for folder_name in os.listdir(source_dir):
            if folder_name in mapping:
                target_folder_name = mapping[folder_name]
                src_path = os.path.join(source_dir, folder_name)
                dst_path = os.path.join(dest_dir, target_folder_name)
                
                os.makedirs(dst_path, exist_ok=True)
                
                if os.path.isdir(src_path):
                    for file in os.listdir(src_path):
                        src_file = os.path.join(src_path, file)
                        dst_file = os.path.join(dst_path, file)
                        if not os.path.exists(dst_file):
                            shutil.copy2(src_file, dst_file)
                    print(f" -> Merged {folder_name} into {target_folder_name}")
    else:
        print(f"Source directory {source_dir} not found. Assuming folders are already merged and moved.")

def prepare_sugarcane_dataset(base_dir):
    input_dir = os.path.join(base_dir, "raw_datasets", "sugarcane")
    output_dir = os.path.join(base_dir, "raw_datasets", "sugarcane_split")
    
    print(f"\nPreparing classification dataset from {input_dir}...")
    if not os.path.exists(input_dir):
        print(f"Input directory {input_dir} not found!")
        return
        
    os.makedirs(output_dir, exist_ok=True)
    for split in ['train', 'val']:
        os.makedirs(os.path.join(output_dir, split), exist_ok=True)
        
    classes = [d for d in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir, d))]
    
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
    base_dir = r"c:\T4T\leaf disease\indian-leaf-disease"
    move_and_merge_sugarcane(base_dir)
    prepare_sugarcane_dataset(base_dir)
