# Ambika Kapoor Makeup Studio

Professional makeup artist website - Srinagar, Kashmir

## Quick Start

- **Deploy**: `./scripts/deploy.sh`
- **Update**: `./scripts/update.sh`
- **Docs**: See `/docs/getting-started/START_HERE.md`

## Structure

- `index.html, styles.css, script.js` - Website source
- `images/` - All website images (local hosting)
- `docs/` - Documentation (getting-started, deployment, features, images)
- `scripts/` - Deployment & utility scripts
- `terraform/` - Infrastructure as code

## Documentation

### Getting Started
- `/docs/getting-started/README.md` - Project overview
- `/docs/getting-started/START_HERE.md` - Quick start guide
- `/docs/getting-started/QUICK_START.md` - Fast deployment

### Deployment
- `/docs/deployment/GCP_QUICK_START.md` - GCP quick deployment
- `/docs/deployment/GCP_DEPLOYMENT_GUIDE.md` - Complete GCP guide
- `/docs/deployment/README_GCP.md` - Technical reference
- `/docs/deployment/DEPLOYMENT_SUMMARY.md` - Deployment summary

### Features & Guides
- `/docs/features/UPDATED_FEATURES.md` - Feature documentation
- `/docs/features/PAYMENT_INTEGRATION_GUIDE.md` - Payment setup

### Images
- `/docs/images/HOW_TO_ADD_IMAGES.md` - Image management guide
- `/docs/images/IMAGE_GUIDE.md` - Complete image reference

## Local Development

```bash
# Start local server
python3 -m http.server 8000

# Visit http://localhost:8000
```

## Deployment

```bash
# Initial deployment
./scripts/deploy.sh

# Update website
./scripts/update.sh
```

## Project Structure

```
/Users/apple/Projects/ak/
├── index.html              # Main website
├── styles.css              # Styles
├── script.js               # JavaScript
├── package.json            # Node dependencies
├── robots.txt              # SEO
├── sitemap.xml             # SEO
├── images/                 # Website images (local)
│   ├── hero/
│   ├── about/
│   ├── services/
│   ├── packages/
│   └── portfolio/
├── docs/                   # Documentation
│   ├── getting-started/
│   ├── deployment/
│   ├── features/
│   └── images/
├── scripts/                # Utility scripts
│   ├── deploy.sh
│   ├── update.sh
│   └── convert-to-webp.js
└── terraform/              # Infrastructure
```

## Image Management

All images are now hosted locally for better performance and reliability.

To replace placeholder images with your own photos:

```bash
# 1. Add your photos to source-images/
mkdir source-images
cp your-photos/* source-images/

# 2. Run conversion script
npm install
npm run convert

# 3. Deploy updates
./scripts/update.sh
```

See `/docs/images/IMAGE_GUIDE.md` for detailed instructions.

## Website Features

- ✅ **Visual Editor** (GrapesJS) - Edit without coding!
- ✅ Local image hosting (no external dependencies)
- ✅ WebP images with JPEG fallback
- ✅ Lazy loading for performance
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Booking system with payment integration
- ✅ 16 occasion types
- ✅ 3 bridal packages (₹60K - ₹1.2L)

## Visual Editor (NEW!)

Edit your website visually without coding using the built-in GrapesJS editor.

### Quick Start - Visual Editor

```bash
# 1. Install dependencies (one-time)
npm install

# 2. Start the editor server
npm start

# 3. Open editor in browser
http://localhost:3000/editor.html

# 4. Login with password: ambika2024
```

### Features

- 🎨 Drag & drop page builder
- ✏️ Click to edit text
- 🖼️ Easy image replacement
- 🎯 No coding required
- 💾 Auto-save every 2 minutes
- 🔄 Automatic backups
- 👁️ Live preview
- 📱 Responsive design tools

See **`/docs/features/VISUAL_EDITOR_GUIDE.md`** for complete guide.

## Technologies

- HTML5, CSS3, JavaScript
- WebP + JPEG images
- Google Cloud Platform (Terraform)
- Cloud Storage + CDN
- SSL/HTTPS
