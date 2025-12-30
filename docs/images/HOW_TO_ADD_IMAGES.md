# How to Add Images to Your Website

## Folder Structure

Create an `images` folder in your project:

```
ak/
├── images/
│   ├── logo.png
│   ├── about-photo.jpg
│   ├── hero-bg.jpg
│   └── portfolio/
│       ├── bridal-1.jpg
│       ├── bridal-2.jpg
│       ├── bridal-3.jpg
│       ├── party-1.jpg
│       ├── party-2.jpg
│       └── photoshoot-1.jpg
├── index.html
├── styles.css
└── script.js
```

## Step 1: Create Images Folder

```bash
mkdir images
mkdir images/portfolio
```

## Step 2: Add Your Photos

### Professional Headshot (About Section)
- File: `images/about-photo.jpg`
- Recommended size: 800x1000 pixels
- Format: JPG or PNG

### Portfolio Photos (6 images)
- Files: `images/portfolio/bridal-1.jpg`, `bridal-2.jpg`, etc.
- Recommended size: 800x800 pixels (square)
- Format: JPG
- Quality: High quality but compressed (use TinyPNG.com)

### Logo (Optional)
- File: `images/logo.png`
- Recommended size: 200x200 pixels
- Format: PNG with transparent background

## Step 3: Update HTML with Images

### Replace About Section Photo

Find this in `index.html` (around line 150):

```html
<div class="about-image">
    <div class="image-placeholder">
        <p>Your Professional Photo Here</p>
    </div>
</div>
```

Replace with:

```html
<div class="about-image">
    <img src="images/about-photo.jpg" alt="Ambika Kapoor - Professional Makeup Artist" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
</div>
```

### Replace Portfolio Images

Find this section (around line 330):

```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <div class="image-placeholder">Bridal Makeup Look 1</div>
    </div>
    <div class="portfolio-overlay">
        <h4>Kashmiri Bridal Makeup</h4>
    </div>
</div>
```

Replace with:

```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <img src="images/portfolio/bridal-1.jpg" alt="Kashmiri Bridal Makeup" style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="portfolio-overlay">
        <h4>Kashmiri Bridal Makeup</h4>
    </div>
</div>
```

Do this for all 6 portfolio items.

## Step 4: Add Hero Background (Optional)

Update the hero section in `styles.css`:

```css
.hero {
    height: 100vh;
    background: linear-gradient(135deg, rgba(255, 229, 236, 0.9) 0%, rgba(229, 217, 242, 0.9) 50%, rgba(255, 212, 199, 0.9) 100%),
                url('../images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
```

## Where to Get Images

### Option 1: Use Your Own Photos
- Take professional photos of your work
- Use phone camera (good lighting)
- Get permission from clients

### Option 2: Stock Photos (Temporary)
Free stock photo sites with Indian bridal images:
- **Pexels**: https://www.pexels.com/search/indian%20bride/
- **Unsplash**: https://unsplash.com/s/photos/indian-wedding
- **Pixabay**: https://pixabay.com/images/search/indian%20bride/

⚠️ Use stock photos only temporarily! Replace with your actual work ASAP.

### Option 3: Download from Facebook
From your Facebook page:
1. Go to your video/photos
2. Click on a photo
3. Right-click → "Save image as"
4. Rename and move to `images/portfolio/`

## Image Optimization

Before uploading, compress your images:

1. **TinyPNG** (Recommended)
   - Go to https://tinypng.com
   - Upload images
   - Download compressed versions
   - Can reduce file size by 70% without quality loss

2. **Squoosh** (Advanced)
   - Go to https://squoosh.app
   - Upload image
   - Adjust quality
   - Download

## Image Best Practices

### File Size:
- Portfolio images: < 300 KB each
- About photo: < 200 KB
- Hero background: < 500 KB

### Dimensions:
- Portfolio: 800x800 px (square)
- About photo: 800x1000 px (portrait)
- Hero background: 1920x1080 px (landscape)

### Format:
- Photos: JPG (smaller file size)
- Logo: PNG (transparency support)
- Graphics: PNG or SVG

### File Naming:
- Use lowercase
- No spaces (use hyphens)
- Descriptive names

Good:
- `bridal-makeup-kashmiri-style.jpg`
- `party-makeup-glamorous-look.jpg`

Bad:
- `IMG_1234.jpg`
- `Photo 1.JPG`

## Quick Setup with Sample Images

### 1. Download Sample Indian Bridal Images

Visit Pexels and download:
1. Search "Indian bride makeup"
2. Download 6 different photos
3. Rename them:
   - `bridal-1.jpg`
   - `bridal-2.jpg`
   - `party-1.jpg`
   - `party-2.jpg`
   - `photoshoot-1.jpg`
   - `photoshoot-2.jpg`

### 2. Organize Files

```bash
# Create folders
mkdir images
mkdir images/portfolio

# Move files
# (drag and drop your downloaded images)
```

### 3. Update HTML

Use "Find and Replace" in your editor:

Find:
```html
<div class="image-placeholder">Bridal Makeup Look 1</div>
```

Replace with:
```html
<img src="images/portfolio/bridal-1.jpg" alt="Bridal Makeup" style="width: 100%; height: 100%; object-fit: cover;">
```

## Add Your Logo

### Create a Simple Logo

Use free tools:
- **Canva**: https://www.canva.com (easy, templates)
- **Logo Maker**: https://www.freelogodesign.org

### Add to Navigation

In `index.html`, find:

```html
<div class="logo">Ambika Kapoor</div>
```

Replace with:

```html
<div class="logo">
    <img src="images/logo.png" alt="Ambika Kapoor Makeup Studio" style="height: 40px;">
</div>
```

## Responsive Images (Advanced)

For better mobile performance, use responsive images:

```html
<picture>
    <source media="(max-width: 768px)" srcset="images/portfolio/bridal-1-mobile.jpg">
    <source media="(min-width: 769px)" srcset="images/portfolio/bridal-1.jpg">
    <img src="images/portfolio/bridal-1.jpg" alt="Bridal Makeup" loading="lazy">
</picture>
```

## Lazy Loading

For faster page load, add `loading="lazy"` to images:

```html
<img src="images/portfolio/bridal-1.jpg" alt="Bridal Makeup" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
```

## Complete Example

### Before (Placeholder):
```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <div class="image-placeholder">Bridal Makeup Look 1</div>
    </div>
    <div class="portfolio-overlay">
        <h4>Kashmiri Bridal Makeup</h4>
    </div>
</div>
```

### After (With Image):
```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <img src="images/portfolio/kashmiri-bridal-red-gold.jpg"
             alt="Traditional Kashmiri Bridal Makeup with Red and Gold"
             loading="lazy"
             style="width: 100%; height: 100%; object-fit: cover;">
    </div>
    <div class="portfolio-overlay">
        <h4>Kashmiri Bridal Makeup</h4>
    </div>
</div>
```

## Testing

After adding images, check:
- [ ] All images load correctly
- [ ] Images look good on mobile
- [ ] Page loads reasonably fast
- [ ] Images are not pixelated
- [ ] Alt text is descriptive

## Troubleshooting

**Images not showing?**
- Check file path is correct
- Check file name matches exactly (case-sensitive)
- Make sure images folder is in right location
- Check image file isn't corrupted

**Images look stretched?**
- Use `object-fit: cover` in style
- Check image dimensions are correct
- Crop images to proper aspect ratio

**Page loads slowly?**
- Compress images using TinyPNG
- Add `loading="lazy"` attribute
- Reduce image dimensions

## Next Steps

1. Create `images` and `images/portfolio` folders
2. Add your photos or download samples
3. Optimize images with TinyPNG
4. Update HTML with image paths
5. Test on different devices
6. Replace stock photos with real work as soon as possible

---

**Pro Tip**: Watermark your portfolio images with your logo to prevent theft!

**Remember**: Real photos of your actual work will always perform better than stock photos. They build trust and show your unique style! 💄✨
