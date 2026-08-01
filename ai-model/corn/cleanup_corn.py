import shutil
import os

def main():
    base_dir = r"c:\T4T\leaf disease\indian-leaf-disease"
    raw_datasets = os.path.join(base_dir, "raw_datasets")
    
    # 1. Delete corn_split
    corn_split_dir = os.path.join(raw_datasets, "corn_split")
    if os.path.exists(corn_split_dir):
        print(f"Deleting {corn_split_dir}...")
        shutil.rmtree(corn_split_dir)
        print("Deleted corn_split successfully.")
    else:
        print(f"{corn_split_dir} not found.")

    # 2. Move corn folder to main directory
    corn_dir = os.path.join(raw_datasets, "corn")
    dest_corn_dir = os.path.join(base_dir, "corn")
    
    if os.path.exists(corn_dir):
        if not os.path.exists(dest_corn_dir):
            print(f"Moving {corn_dir} to {dest_corn_dir}...")
            shutil.move(corn_dir, dest_corn_dir)
            print("Moved corn folder successfully.")
        else:
            print(f"Destination {dest_corn_dir} already exists! Cannot move.")
    else:
        print(f"{corn_dir} not found.")

if __name__ == "__main__":
    main()
