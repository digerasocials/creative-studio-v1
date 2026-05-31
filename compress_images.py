import os
import sys
import subprocess

# Auto-install Pillow library if it's not already installed on the system
try:
    from PIL import Image
except ImportError:
    print("Installing Pillow image processing library...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
        from PIL import Image
    except Exception as e:
        print(f"Could not install Pillow automatically: {e}")
        print("Please run: pip install Pillow")
        sys.exit(1)

base_dir = os.path.dirname(os.path.abspath(__file__))
res_dir = os.path.join(base_dir, 'residential')
comm_dir = os.path.join(base_dir, 'commercial')
prod_dir = os.path.join(base_dir, 'products')
slideshow_dir = os.path.join(base_dir, 'assets', 'slideshow')
project_cover_dir = os.path.join(base_dir, 'assets', 'project cover')


def compress_folder(directory):
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return
    
    valid_exts = ('.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP')
    files = [f for f in os.listdir(directory) if f.endswith(valid_exts)]
    
    print(f"\n==============================================================")
    print(f"COMPRESSING IMAGES IN FOLDER: {os.path.basename(directory).upper()}")
    print(f"==============================================================")
    
    for f in files:
        filepath = os.path.join(directory, f)
        size_bytes = os.path.getsize(filepath)
        size_mb = size_bytes / (1024 * 1024)
        
        # Compress images larger than 300 KB
        if size_bytes > 300 * 1024:
            print(f" -> Optimizing {f} ({size_mb:.2f} MB)... ", end="", flush=True)
            try:
                img = Image.open(filepath)
                
                # Convert PNG transparency (RGBA) to JPEG-compatible RGB if file is a JPEG/JPG
                if img.mode in ('RGBA', 'LA') and not f.lower().endswith('.png'):
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    # Handle transparency mask safely
                    mask = img.split()[3] if len(img.split()) > 3 else None
                    background.paste(img, mask=mask)
                    img = background
                
                # Maintain aspect ratio and scale width down to max 1600px (retina-ready sharpness)
                max_width = 1600
                if img.width > max_width:
                    ratio = max_width / float(img.width)
                    new_height = int(float(img.height) * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # Overwrite original file with optimized web parameters
                if f.lower().endswith('.png'):
                    img.save(filepath, "PNG", optimize=True)
                elif f.lower().endswith('.webp'):
                    img.save(filepath, "WEBP", quality=82, method=6)
                else:
                    img.save(filepath, "JPEG", quality=80, optimize=True)
                
                new_size_bytes = os.path.getsize(filepath)
                new_size_kb = new_size_bytes / 1024
                print(f"Optimized to {new_size_kb:.1f} KB! (Saves {(size_bytes - new_size_bytes)/(1024*1024):.2f} MB)")
            except Exception as e:
                print(f"FAILED: {e}")
        else:
            print(f" -> Skipping {f} (Already optimized: {size_bytes/1024:.1f} KB)")

# Run compression on all root directories
compress_folder(res_dir)
compress_folder(comm_dir)
compress_folder(prod_dir)
compress_folder(slideshow_dir)
compress_folder(project_cover_dir)

print("\n==============================================================")
print("COMPRESSION COMPLETED! RUNNING PORTFOLIO INDEXER...")
print("==============================================================")

# Automatically invoke update_gallery.py to compile the optimized list
try:
    import update_gallery
except Exception as e:
    print(f"Could not automatically index: {e}")
