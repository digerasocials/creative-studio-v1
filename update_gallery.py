import os
import re
import ctypes

# Resolve paths relative to where this script is located
base_dir = os.path.dirname(os.path.abspath(__file__))
res_dir = os.path.join(base_dir, 'residential')
comm_dir = os.path.join(base_dir, 'commercial')
prod_dir = os.path.join(base_dir, 'products')
gallery_js_path = os.path.join(base_dir, 'js', 'gallery.js')

# Load Windows Shell API to sort EXACTLY like Windows Explorer does
try:
    shlwapi = ctypes.windll.LoadLibrary("shlwapi.dll")
    str_cmp_logical_w = shlwapi.StrCmpLogicalW
except Exception:
    str_cmp_logical_w = None

class ExplorerSortKey:
    def __init__(self, string_val):
        self.string_val = string_val
    def __lt__(self, other):
        if str_cmp_logical_w:
            # StrCmpLogicalW returns negative if self < other
            return str_cmp_logical_w(ctypes.c_wchar_p(self.string_val), ctypes.c_wchar_p(other.string_val)) < 0
        else:
            # Fallback natural sorting
            s1_parts = [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', self.string_val)]
            s2_parts = [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', other.string_val)]
            return s1_parts < s2_parts

def get_images(directory):
    valid_exts = ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.JPG', '.JPEG', '.PNG', '.WEBP', '.GIF')
    if not os.path.exists(directory):
        return []
    files = [
        f for f in os.listdir(directory)
        if f.endswith(valid_exts) and os.path.isfile(os.path.join(directory, f))
    ]
    # Sort EXACTLY like Windows Explorer
    files.sort(key=ExplorerSortKey)
    return files

res_files = get_images(res_dir)
comm_files = get_images(comm_dir)
prod_files = get_images(prod_dir)

# Read and update js/gallery.js
if os.path.exists(gallery_js_path):
    with open(gallery_js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Format files as formatted JS array entries
    res_formatted = ",\n    ".join(f'"{f}"' for f in res_files)
    comm_formatted = ",\n    ".join(f'"{f}"' for f in comm_files)
    prod_formatted = ",\n    ".join(f'"{f}"' for f in prod_files)

    # Use regular expressions to replace the hardcoded array contents cleanly
    content = re.sub(
        r'(const residentialImages = \[\s*).*?(\s*\];)',
        rf'\1{res_formatted}\2',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'(const commercialImages = \[\s*).*?(\s*\];)',
        rf'\1{comm_formatted}\2',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'(const productsImages = \[\s*).*?(\s*\];)',
        rf'\1{prod_formatted}\2',
        content,
        flags=re.DOTALL
    )

    with open(gallery_js_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("==============================================================")
    print("SUCCESS: CREATIVE STUDIO GALLERY LIST UPDATED SUCCESSFULLY!")
    print("==============================================================")
    print(f" -> Found and synced {len(res_files)} Residential Images (Sorted like Windows).")
    print(f" -> Found and synced {len(comm_files)} Commercial Images (Sorted like Windows).")
    print(f" -> Found and synced {len(prod_files)} Products Images (Sorted like Windows).")
    print("==============================================================")
    print("Just push your changes to GitHub now, and they will load live!")
    print("==============================================================")
else:
    print(f"ERROR: Could not locate js/gallery.js at: {gallery_js_path}")
