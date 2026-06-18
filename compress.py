"""
Compresses and resizes all images in images/thesis_pics so they're
web-friendly (smaller file size, same visual quality on screen).

Run this from inside your portfolio repo folder:
    python compress.py
"""

import os
from PIL import Image

FOLDER = os.path.join("images", "thesis_pics")
MAX_WIDTH = 1920       # max width in pixels — plenty for web display
JPEG_QUALITY = 85       # 0-100, 85 is a good balance of size vs quality

def compress_image(path):
    img = Image.open(path)

    # Convert to RGB if needed (handles some JPEGs saved in other modes)
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Resize only if wider than MAX_WIDTH, keeping aspect ratio
    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        new_size = (MAX_WIDTH, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

    original_size = os.path.getsize(path)
    img.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True)
    new_size_bytes = os.path.getsize(path)

    print(f"{os.path.basename(path)}: {original_size/1024/1024:.2f}MB -> {new_size_bytes/1024/1024:.2f}MB")

def main():
    if not os.path.isdir(FOLDER):
        print(f"Folder not found: {FOLDER}")
        return

    files = [f for f in os.listdir(FOLDER) if f.lower().endswith((".jpg", ".jpeg"))]
    print(f"Found {len(files)} images in {FOLDER}\n")

    total_before = 0
    total_after = 0

    for filename in files:
        path = os.path.join(FOLDER, filename)
        before = os.path.getsize(path)
        compress_image(path)
        after = os.path.getsize(path)
        total_before += before
        total_after += after

    print(f"\nTotal: {total_before/1024/1024:.1f}MB -> {total_after/1024/1024:.1f}MB")

if __name__ == "__main__":
    main()
