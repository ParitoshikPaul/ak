# Image Management Guide

Complete guide for managing images on the Ambika Kapoor makeup studio website.

## Table of Contents
1. [Current Images](#current-images)
2. [Replacing with Your Own Photos](#replacing-with-your-own-photos)
3. [Image Specifications](#image-specifications)
4. [Using the Conversion Script](#using-the-conversion-script)
5. [Manual Image Optimization](#manual-image-optimization)
6. [Image Naming Best Practices](#image-naming-best-practices)
7. [SEO Optimization](#seo-optimization)
8. [Troubleshooting](#troubleshooting)

---

## Current Images

### Placeholder Images from Unsplash

Currently, all images are sourced from Unsplash API with Indian bridal makeup themes:

**Hero Section:**
- 1 background image (1920x1080px)
- Professional makeup workspace with cosmetics

**About Section:**
- 1 profile image (800x1000px)
- Professional makeup artist portrait

**Services Section:**
- 8 service card images (600x400px each)
  1. Bridal Makeup (Kashmiri style)
  2. Party Makeup (glamorous look)
  3. Photoshoot Makeup
  4. Devotional Event Makeup
  5. Airbrush Makeup
  6. Hair Styling
  7. Formal Event Makeup
  8. Pre-Wedding Event Makeup

**Packages Section:**
- 3 package images (800x600px each)
  1. Classic Bridal Package
  2. Premium Bridal Package
  3. Complete Bridal Experience

**Portfolio Section:**
- 6 portfolio images (800x800px each)
  1. Kashmiri Bridal Look
  2. Party Glam Makeup
  3. Editorial Photoshoot
  4. Traditional Bridal
  5. Festive Makeup
  6. Airbrush Finish

**Total:** 20 images using WebP format with JPEG fallback

---

## Replacing with Your Own Photos

### Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Add your photos to source-images folder
mkdir source-images
cp ~/your-makeup-photos/* source-images/

# 3. Convert to WebP
npm run convert
```

Your images will be automatically:
- Converted to WebP format (90% quality)
- Resized to correct dimensions for each section
- Saved with JPEG fallback
- Organized into `/images/` subdirectories

### Detailed Process

#### Step 1: Organize Your Source Photos

Create a `source-images` folder and add your photos with descriptive names:

```
source-images/
├── hero-background.jpg            # Makeup workspace or studio
├── profile-photo.jpg              # Your professional headshot
├── bridal-service-1.jpg           # Bridal makeup example
├── party-service-1.jpg            # Party makeup example
├── photoshoot-service-1.jpg       # Photoshoot makeup
├── devotional-service-1.jpg       # Traditional/devotional makeup
├── airbrush-service-1.jpg         # Airbrush technique
├── hair-styling-service-1.jpg     # Hair styling work
├── formal-service-1.jpg           # Formal event makeup
├── prewedding-service-1.jpg       # Pre-wedding look
├── classic-package-1.jpg          # Classic bridal package
├── premium-package-1.jpg          # Premium bridal package
├── complete-package-1.jpg         # Complete bridal package
├── portfolio-bridal-1.jpg         # Portfolio work
├── portfolio-party-1.jpg          # Portfolio work
├── portfolio-editorial-1.jpg      # Portfolio work
├── portfolio-traditional-1.jpg    # Portfolio work
├── portfolio-festive-1.jpg        # Portfolio work
└── portfolio-airbrush-1.jpg       # Portfolio work
```

#### Step 2: Run Conversion Script

```bash
# Install Sharp library (image processing)
npm install

# Convert all images
npm run convert
```

The script will:
- Detect which section each image belongs to (based on filename)
- Resize to recommended dimensions
- Convert to WebP (90% quality)
- Create JPEG fallback (85% quality)
- Show file size savings
- Organize into `/images/` subdirectories

**Example Output:**
```
╔════════════════════════════════════════╗
║   WebP Image Conversion Tool          ║
╚════════════════════════════════════════╝

Found 20 image(s) to convert

Converting: hero-background
  Original: 4032x3024 (jpeg)
  ✓ WebP: 245KB
  ✓ JPEG: 387KB
  Savings: 37%

Converting: profile-photo
  Original: 3000x4000 (jpeg)
  ✓ WebP: 156KB
  ✓ JPEG: 243KB
  Savings: 36%

...

╔════════════════════════════════════════╗
║   Conversion Summary                  ║
╚════════════════════════════════════════╝

  Total: 20
  Success: 20
  Failed: 0

Images saved to:
  images/hero/ - 1 image(s)
  images/about/ - 1 image(s)
  images/services/ - 8 image(s)
  images/packages/ - 3 image(s)
  images/portfolio/ - 6 image(s)

✓ Conversion complete!
```

#### Step 3: Update Website URLs

Open `index.html` and replace Unsplash URLs with your local images:

**Before:**
```html
<source srcset="https://images.unsplash.com/photo-..." type="image/webp">
```

**After:**
```html
<source srcset="images/about/profile.webp" type="image/webp">
<img src="images/about/profile.jpg" alt="Ambika Kapoor - Makeup Artist">
```

Replace all image URLs in these sections:
- Hero background (line ~95)
- About profile (line ~143)
- Service cards (8 images, lines ~180-220)
- Package cards (3 images, lines ~226+)
- Portfolio images (6 images, lines ~337-378)

---

## Image Specifications

### Recommended Dimensions

| Section | Dimensions | Aspect Ratio | Max Size |
|---------|-----------|--------------|----------|
| Hero Background | 1920x1080px | 16:9 | 300KB (WebP) |
| About Profile | 800x1000px | 4:5 | 200KB (WebP) |
| Service Cards | 600x400px | 3:2 | 150KB (WebP) |
| Package Cards | 800x600px | 4:3 | 200KB (WebP) |
| Portfolio | 800x800px | 1:1 | 200KB (WebP) |

### File Formats

**Primary:** WebP
- 25-35% smaller than JPEG
- Excellent quality at 90% compression
- Supported by 95%+ browsers

**Fallback:** JPEG
- For Safari 13 and older
- For Internet Explorer
- 85% quality with mozjpeg optimization

### Quality Settings

```javascript
// Used by convert-to-webp.js
CONFIG = {
    webpQuality: 90,   // WebP compression
    jpegQuality: 85,   // JPEG fallback
    maxWidth: 1920,    // Max width
    maxHeight: 1920    // Max height
}
```

---

## Using the Conversion Script

### Installation

```bash
npm install
```

This installs Sharp, a high-performance image processing library.

### Basic Usage

```bash
# Convert all images in source-images/
npm run convert

# Or directly
node convert-to-webp.js
```

### How It Works

The script automatically:

1. **Reads** all JPEG/PNG files from `/source-images`
2. **Detects** section from filename keywords:
   - "hero", "background", "bg" → hero/
   - "profile", "about", "headshot" → about/
   - "service", "bridal", "party" → services/
   - "package", "classic", "premium" → packages/
   - "portfolio", "work", "sample" → portfolio/
3. **Resizes** to section-specific dimensions
4. **Converts** to WebP (90% quality)
5. **Creates** JPEG fallback (85% quality)
6. **Saves** to `/images/{section}/` folders
7. **Reports** file sizes and savings

### Section Detection Logic

The script uses filename keywords to automatically organize images:

```javascript
// Examples:
"bridal-service-kashmiri.jpg"     → images/services/
"profile-professional.jpg"         → images/about/
"hero-background-studio.jpg"       → images/hero/
"classic-package-bridal.jpg"       → images/packages/
"portfolio-work-editorial.jpg"     → images/portfolio/
```

If no keyword matches, defaults to `portfolio/`.

### Output Directory Structure

```
images/
├── hero/
│   ├── hero-background.webp
│   └── hero-background.jpg
├── about/
│   ├── profile.webp
│   └── profile.jpg
├── services/
│   ├── bridal-makeup.webp
│   ├── bridal-makeup.jpg
│   ├── party-makeup.webp
│   ├── party-makeup.jpg
│   └── ... (16 files total)
├── packages/
│   ├── classic-bridal.webp
│   ├── classic-bridal.jpg
│   └── ... (6 files total)
└── portfolio/
    ├── bridal-kashmiri.webp
    ├── bridal-kashmiri.jpg
    └── ... (12 files total)
```

---

## Manual Image Optimization

If you prefer to optimize images manually without the script:

### Using Online Tools

**1. Squoosh (Recommended)**
- URL: https://squoosh.app
- Best quality control
- Visual comparison
- Manual resize and WebP conversion

**Steps:**
1. Visit https://squoosh.app
2. Upload your image
3. Select "WebP" from format dropdown
4. Set quality to 90%
5. Resize to recommended dimensions
6. Download optimized image

**2. TinyPNG**
- URL: https://tinypng.com
- Batch processing
- Automatic optimization
- Also supports WebP

**3. CloudConvert**
- URL: https://cloudconvert.com
- Format conversion
- Batch processing
- API available

### Using ImageMagick (CLI)

```bash
# Install ImageMagick
brew install imagemagick

# Convert to WebP
convert input.jpg -quality 90 -resize 800x1000 output.webp

# Create JPEG fallback
convert input.jpg -quality 85 -resize 800x1000 output.jpg

# Batch convert all in folder
for img in *.jpg; do
  convert "$img" -quality 90 "${img%.jpg}.webp"
done
```

### Using Photoshop

1. Open image in Photoshop
2. **Image → Image Size** → Resize to recommended dimensions
3. **File → Export → Save for Web (Legacy)**
4. Select JPEG, Quality: 85
5. Save

For WebP:
1. Install WebP plugin from Google
2. **File → Export → WebPShop**
3. Quality: 90
4. Save

---

## Image Naming Best Practices

### Good Naming Examples

✅ **Descriptive and SEO-friendly:**
- `kashmiri-bridal-makeup-red-lehenga.webp`
- `party-makeup-glamorous-smokey-eyes.webp`
- `profile-ambika-kapoor-professional.webp`
- `airbrush-makeup-flawless-finish.webp`

✅ **Use hyphens, lowercase, keywords:**
- Location: `srinagar-bridal-makeup.webp`
- Service: `traditional-kashmiri-bride.webp`
- Event: `wedding-reception-makeup.webp`

### Bad Naming Examples

❌ **Avoid:**
- `IMG_1234.webp` (not descriptive)
- `photo1.webp` (no keywords)
- `Makeup Photo.webp` (spaces, capitals)
- `DSC_0001.webp` (camera default)
- `pic.webp` (too generic)

### Naming Convention

```
{type}-{service}-{detail}-{number}.{ext}

Examples:
bridal-makeup-kashmiri-style-1.webp
party-makeup-glamorous-look-2.webp
portfolio-work-editorial-shoot-3.webp
service-airbrush-technique-1.webp
```

---

## SEO Optimization

### Alt Text Best Practices

Every image should have descriptive alt text with:
- What's in the image
- Location keywords (Srinagar, Kashmir)
- Service keywords (bridal makeup, party makeup)
- Target audience

**Good Alt Text Examples:**

```html
<!-- About Section -->
<img src="images/about/profile.webp"
     alt="Ambika Kapoor - Professional Bridal Makeup Artist in Srinagar, Kashmir">

<!-- Service Cards -->
<img src="images/services/bridal-makeup.webp"
     alt="Traditional Kashmiri Bridal Makeup by Ambika Kapoor in Srinagar">

<img src="images/services/party-makeup.webp"
     alt="Glamorous Party Makeup for Events in Srinagar">

<!-- Portfolio -->
<img src="images/portfolio/bridal-kashmiri.webp"
     alt="Kashmiri Bridal Makeup Look - Red Lehenga with Traditional Jewelry">
```

### File Size Optimization

Google prefers images under 200KB:

✅ **Optimized:**
- Hero: 245KB WebP, 387KB JPEG
- About: 156KB WebP, 243KB JPEG
- Services: 120KB WebP, 189KB JPEG (each)
- Portfolio: 145KB WebP, 225KB JPEG (each)

❌ **Too Large:**
- 4MB original photos
- 1MB+ uncompressed images
- No WebP format

### Image Loading Performance

The website implements:

**1. Lazy Loading:**
```html
<img src="..." loading="lazy">
```
Images below the fold load when scrolling.

**2. Progressive Enhancement:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```
Modern browsers get WebP, older get JPEG.

**3. Responsive Images:**
```css
img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```
Images scale properly on all devices.

### Structured Data

Images are included in schema markup:

```javascript
"image": {
  "@type": "ImageObject",
  "url": "https://artisansinfotech.com/project/ambikakapoorts/images/about/profile.webp",
  "caption": "Ambika Kapoor - Professional Makeup Artist"
}
```

This helps Google understand and index images.

---

## Troubleshooting

### Issue: Script says "sharp module not found"

**Solution:**
```bash
npm install
```

This installs the Sharp library required for image processing.

---

### Issue: "Directory source-images does not exist"

**Solution:**
```bash
mkdir source-images
cp ~/your-photos/* source-images/
npm run convert
```

The script creates the directory if missing, but you need to add images.

---

### Issue: Images are too large (> 500KB)

**Causes:**
- Original images are too big (4000px+)
- Quality setting too high
- Not using WebP format

**Solutions:**

1. **Resize before converting:**
```bash
# Use ImageMagick to pre-resize
convert large-image.jpg -resize 1920x1920\> resized.jpg
```

2. **Lower quality in script:**
Edit `convert-to-webp.js`:
```javascript
webpQuality: 85,  // instead of 90
jpegQuality: 80,  // instead of 85
```

3. **Use compression tools:**
- TinyPNG: https://tinypng.com
- Squoosh: https://squoosh.app

---

### Issue: Images look blurry or pixelated

**Causes:**
- Source image too small
- Quality too low
- Over-compression

**Solutions:**

1. **Use higher resolution sources:**
- Minimum 2x the display size
- Service cards: 1200x800px source for 600x400px display
- Portfolio: 1600x1600px source for 800x800px display

2. **Increase quality:**
```javascript
webpQuality: 95,  // higher quality
```

3. **Use original aspect ratio:**
Don't stretch or distort images to fit.

---

### Issue: WebP images don't show in Safari

**Cause:** Safari 13 and older don't support WebP.

**Solution:** Already implemented!
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">  ← Fallback
</picture>
```

Safari automatically falls back to JPEG.

---

### Issue: Conversion script fails with "Input file is missing"

**Cause:** Invalid file format or corrupted image.

**Solution:**

1. **Check file format:**
```bash
file source-images/your-image.jpg
```
Should show: `JPEG image data`

2. **Convert to JPEG first:**
```bash
convert problematic.png fixed.jpg
```

3. **Re-download if corrupted:**
Use original source.

---

### Issue: Images not showing after deployment

**Causes:**
- Images not uploaded to GCP bucket
- Incorrect file paths
- Cache not cleared

**Solutions:**

1. **Check bucket:**
```bash
gsutil ls gs://YOUR_BUCKET_NAME/images/
```

2. **Re-upload:**
```bash
./update.sh
```

3. **Clear CDN cache:**
```bash
gcloud compute url-maps invalidate-cdn-cache ambikakapoor-url-map \
  --path "/images/*" --async
```

---

## Quick Reference

### Commands

```bash
# Install dependencies
npm install

# Convert images
npm run convert

# Manual conversion
node convert-to-webp.js

# Check installed packages
npm list

# Update Sharp
npm update sharp
```

### File Paths

```
/source-images/       ← Your original photos (JPEG/PNG)
/images/             ← Converted WebP + JPEG output
  ├── hero/          ← Hero section (1 image)
  ├── about/         ← About section (1 image)
  ├── services/      ← Service cards (8 images)
  ├── packages/      ← Package cards (3 images)
  └── portfolio/     ← Portfolio gallery (6 images)
```

### Image Specs Summary

| Section | Size | Format | Max KB |
|---------|------|--------|--------|
| Hero | 1920x1080 | WebP+JPEG | 300 |
| About | 800x1000 | WebP+JPEG | 200 |
| Services | 600x400 | WebP+JPEG | 150 |
| Packages | 800x600 | WebP+JPEG | 200 |
| Portfolio | 800x800 | WebP+JPEG | 200 |

---

## Additional Resources

### Image Sources (Free Stock Photos)

**Unsplash:**
- https://unsplash.com/s/photos/indian-bridal-makeup
- https://unsplash.com/s/photos/makeup-artist
- High quality, royalty-free

**Pexels:**
- https://www.pexels.com/search/bridal-makeup/
- https://www.pexels.com/search/makeup-artist/
- Free for commercial use

**Pixabay:**
- https://pixabay.com/images/search/makeup/
- Free images and vectors

### Image Optimization Tools

**Online:**
- Squoosh: https://squoosh.app
- TinyPNG: https://tinypng.com
- CloudConvert: https://cloudconvert.com
- Compressor.io: https://compressor.io

**Desktop:**
- ImageOptim (macOS): https://imageoptim.com
- RIOT (Windows): https://riot-optimizer.com
- XnConvert (Cross-platform): https://www.xnview.com/en/xnconvert/

**Command Line:**
- ImageMagick: `brew install imagemagick`
- Sharp CLI: `npm install -g sharp-cli`
- cwebp (Google): `brew install webp`

### Learning Resources

**WebP Format:**
- Google WebP Guide: https://developers.google.com/speed/webp
- Can I Use WebP: https://caniuse.com/webp

**Image SEO:**
- Google Image SEO: https://developers.google.com/search/docs/appearance/google-images
- Image Alt Text Guide: https://moz.com/learn/seo/alt-text

**Performance:**
- Web.dev Image Optimization: https://web.dev/fast/#optimize-your-images
- PageSpeed Insights: https://pagespeed.web.dev

---

## Need Help?

### Common Questions

**Q: Do I need to replace all 20 images at once?**
A: No! Replace images gradually as you take new photos.

**Q: Can I use PNG instead of JPEG?**
A: Yes! The script accepts .jpg, .jpeg, and .png files.

**Q: What if my photo is vertical but needs horizontal?**
A: The script uses `fit: 'cover'` to crop intelligently. Use pre-cropped images for best results.

**Q: Can I add more portfolio images?**
A: Yes! Add images to source-images/, convert, then add more portfolio items in index.html.

**Q: Will WebP work on all browsers?**
A: 95%+ yes. JPEG fallback ensures 100% compatibility.

### Getting Support

1. Check this guide first
2. Review troubleshooting section
3. Check console for errors
4. Verify file paths and formats
5. Test in multiple browsers

---

## Summary Checklist

Before going live with your own photos:

- [ ] Install dependencies: `npm install`
- [ ] Organize source photos in `source-images/`
- [ ] Run conversion: `npm run convert`
- [ ] Verify output in `images/` folders
- [ ] Update `index.html` image URLs
- [ ] Check all images load correctly
- [ ] Test on mobile devices
- [ ] Verify alt text is descriptive
- [ ] Test in Safari, Chrome, Firefox
- [ ] Run deployment: `./deploy.sh`
- [ ] Clear CDN cache if needed
- [ ] Test live site
- [ ] Submit to Google Search Console

**Your images are ready for the world to see!** 📸✨
