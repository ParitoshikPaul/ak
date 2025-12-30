# Images Directory

This folder contains all images for the Ambika Kapoor makeup studio website, organized by section.

## Directory Structure

```
images/
├── hero/          # Hero section background images
├── about/         # Profile/about section images
├── services/      # Service card images (8 images)
├── packages/      # Package card images (3 images)
└── portfolio/     # Portfolio gallery images (6 images)
```

## Image Specifications

### File Formats
- **Primary**: WebP (modern, 25-35% smaller)
- **Fallback**: JPEG (for older browsers)

### Recommended Sizes

**Hero Background:**
- Dimensions: 1920x1080px (landscape)
- File size: < 300KB (WebP), < 500KB (JPEG)

**About Profile:**
- Dimensions: 800x1000px (portrait)
- File size: < 200KB (WebP), < 300KB (JPEG)

**Service Cards:**
- Dimensions: 600x400px (landscape)
- File size: < 150KB (WebP), < 250KB (JPEG)

**Package Cards:**
- Dimensions: 800x600px (landscape)
- File size: < 200KB (WebP), < 350KB (JPEG)

**Portfolio Images:**
- Dimensions: 800x800px (square)
- File size: < 200KB (WebP), < 300KB (JPEG)

## Current Images

### Placeholder Images
Currently using Unsplash API URLs for Indian bridal makeup images as placeholders.

To replace with your own photos:
1. Take/collect your makeup photos
2. Place source images in `/source-images` folder
3. Run: `node convert-to-webp.js`
4. Images will be automatically converted and placed in correct folders

## Adding New Images

### Method 1: Use Conversion Script (Recommended)

```bash
# 1. Place your JPEG/PNG images in source-images/
mkdir source-images
cp your-photos/* source-images/

# 2. Install dependencies
npm install

# 3. Convert to WebP
node convert-to-webp.js
```

### Method 2: Manual Conversion

Using ImageMagick or online tools:
```bash
# Convert to WebP
convert input.jpg -quality 90 output.webp

# Create JPEG fallback
cp input.jpg output.jpg
```

### Method 3: Online Tools

- **Squoosh**: https://squoosh.app (best quality control)
- **CloudConvert**: https://cloudconvert.com
- **TinyPNG**: https://tinypng.com (also does WebP)

## Image Naming Convention

Use descriptive, lowercase names with hyphens:

**Good:**
- `bridal-makeup-kashmiri-style.webp`
- `party-makeup-glamorous-look.webp`
- `profile-professional-headshot.webp`

**Bad:**
- `IMG_1234.webp`
- `photo1.webp`
- `Makeup Photo.webp`

## Optimization Tips

1. **Resize before converting**: Don't use 4000px images for 800px display
2. **Compress**: Use 85-90% quality for WebP
3. **Lazy load**: Images below fold load when scrolling
4. **Alt text**: Always include descriptive alt text
5. **Aspect ratio**: Maintain consistent ratios per section

## SEO Best Practices

- Use descriptive filenames (e.g., `indian-bridal-makeup-srinagar.webp`)
- Include location keywords in alt text
- Optimize file sizes (Google prefers < 200KB)
- Use proper `<picture>` tags with fallbacks
- Implement lazy loading

## Browser Support

**WebP Support:** 95%+ of browsers (Chrome, Edge, Firefox, Safari 14+)

Fallback JPEG ensures compatibility with:
- Safari 13 and older
- Internet Explorer
- Older Android browsers

## Questions?

See `IMAGE_GUIDE.md` in the root directory for detailed instructions.
