import shutil
import os

def main():
    base_dir = r"c:\T4T\leaf disease\indian-leaf-disease"
    raw_datasets = os.path.join(base_dir, "raw_datasets")
    
    # 1. Delete potato_split
    potato_split_dir = os.path.join(raw_datasets, "potato_split")
    if os.path.exists(potato_split_dir):
        print(f"Deleting {potato_split_dir}...")
        shutil.rmtree(potato_split_dir)
        print("Deleted potato_split successfully.")
    else:
        print(f"{potato_split_dir} not found.")

    # 2. Move potato folder to main directory
    potato_dir = os.path.join(raw_datasets, "potato")
    dest_potato_dir = os.path.join(base_dir, "potato")
    
    if os.path.exists(potato_dir):
        if not os.path.exists(dest_potato_dir):
            print(f"Moving {potato_dir} to {dest_potato_dir}...")
            shutil.move(potato_dir, dest_potato_dir)
            print("Moved potato folder successfully.")
        else:
            print(f"Destination {dest_potato_dir} already exists! Cannot move.")
    else:
        print(f"{potato_dir} not found.")

if __name__ == "__main__":
    main()
