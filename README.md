# Ambika Kapoor Makeup Studio

Professional makeup artist portfolio website for Srinagar, Kashmir

[![Live Website](https://img.shields.io/badge/Live-Firebase-orange)](https://ambika-kapoor-makeup-studio.web.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🌐 Live Website

**https://ambika-kapoor-makeup-studio.web.app**

## ✨ Features

- 🎨 **Modern Responsive Design** - Beautiful UI that works on all devices
- 📱 **WhatsApp Integration** - Direct booking and inquiry via WhatsApp (8376088663)
- 📊 **Google Analytics** - Track visitors and engagement (G-K2EZ7N3ZGF)
- 🖼️ **Image Optimization** - WebP format with JPEG fallback
- 🔍 **SEO Optimized** - Meta tags, structured data, sitemap
- ⚡ **Fast Loading** - Lazy loading and optimized assets
- 📦 **3 Bridal Packages** - Classic (₹60K), Premium (₹85K), Complete (₹1.2L)
- 💄 **8 Service Categories** - Bridal, party, photoshoot, and more

## 🚀 Quick Start

### Prerequisites

- Node.js (for development)
- Firebase CLI (for deployment)

### Local Development

```bash
# Clone the repository
git clone git@github.com:ParitoshikPaul/ak.git
cd ak

# Install dependencies
npm install

# Start local server
npm start
# OR use Python
python3 -m http.server 8000

# Visit http://localhost:8000
```

### Deployment to Firebase

```bash
# Login to Firebase (one-time)
firebase login

# Deploy to production
firebase deploy --only hosting
```

## 📁 Project Structure

```
ak/
├── index.html              # Main website file
├── styles.css              # Main stylesheet
├── styles.custom.css       # Custom styles
├── script.js               # JavaScript functionality
├── package.json            # Node dependencies
├── firebase.json           # Firebase configuration
├── robots.txt              # SEO - Search engine rules
├── sitemap.xml             # SEO - Site structure
│
├── images/                 # All website images
│   ├── hero/              # Hero section background
│   ├── about/             # About section photos
│   ├── services/          # Service category images (8 types)
│   ├── packages/          # Package photos (3 packages)
│   └── portfolio/         # Portfolio gallery (6 items)
│
├── docs/                   # Documentation
│   ├── getting-started/   # Setup guides
│   ├── deployment/        # Deployment guides
│   ├── features/          # Feature documentation
│   └── images/            # Image management guides
│
└── scripts/               # Utility scripts
    └── convert-to-webp.js # Image conversion tool
```

## 🎯 Core Technologies

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Hosting**: Firebase Hosting
- **Analytics**: Google Analytics 4
- **Images**: WebP + JPEG fallback
- **Integration**: WhatsApp Business API
- **SEO**: Structured Data (Schema.org)

## 📞 Contact Integration

All contact forms and booking buttons redirect to WhatsApp:

- **Phone Number**: +91 8376088663
- **Navigation "Book Now"** → WhatsApp
- **Hero "Book Your Appointment"** → WhatsApp
- **Package "Book Now" buttons** → WhatsApp (3 packages)
- **Quick Inquiry Form** → WhatsApp with form details

## 🖼️ Image Management

### Image Categories

1. **Hero Background** (1 image) - Main banner
2. **About Profile** (1 image) - Profile photo
3. **Services** (8 images) - Service categories
4. **Packages** (3 images) - Bridal packages
5. **Portfolio** (6 images) - Work samples

### Adding/Replacing Images

```bash
# 1. Add your photos to source-images/ folder
mkdir source-images
cp your-photos/* source-images/

# 2. Convert to WebP format
npm install
npm run convert

# 3. Replace images in appropriate folders
# - images/hero/
# - images/about/
# - images/services/
# - images/packages/
# - images/portfolio/

# 4. Deploy changes
firebase deploy --only hosting
```

See `/docs/images/IMAGE_GUIDE.md` for detailed instructions.

## 📊 Analytics & SEO

### Google Analytics Setup

- **Tracking ID**: G-K2EZ7N3ZGF
- **Location**: Integrated in `<head>` section
- Tracks: Page views, user behavior, conversions

### SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (social sharing)
- ✅ Structured data (Schema.org - BeautySalon)
- ✅ robots.txt for search engines
- ✅ sitemap.xml for site structure
- ✅ Canonical URLs
- ✅ Location-based optimization (Srinagar, Kashmir)

## 🎨 Customization

### Update Contact Information

Edit `index.html`:

```html
<!-- Line 41: Phone number in Schema -->
"telephone": "+91-XXXXX-XXXXX",

<!-- Line 278-279: Contact section -->
<p id="iq547v">ambikakapoor@gmail.com</p>
<p id="ip69h6">+91 8376088663</p>
```

### Update WhatsApp Number

Edit `script.js`:

```javascript
// Line 337: WhatsApp number
const whatsappNumber = '918376088663';
```

### Update Package Pricing

Edit `index.html` - Package section (around line 114):

```html
<span class="amount">60,000</span>  <!-- Classic -->
<span class="amount">85,000</span>  <!-- Premium -->
<span class="amount">1,20,000</span> <!-- Complete -->
```

## 🔧 Development Scripts

```bash
# Install dependencies
npm install

# Start local development server
npm start

# Convert images to WebP
npm run convert

# Deploy to Firebase
firebase deploy --only hosting
```

## 📚 Documentation

### Getting Started
- [`/docs/getting-started/README.md`](docs/getting-started/README.md) - Project overview
- [`/docs/getting-started/START_HERE.md`](docs/getting-started/START_HERE.md) - Quick start guide
- [`/docs/getting-started/QUICK_START.md`](docs/getting-started/QUICK_START.md) - Fast deployment

### Deployment
- [`/docs/deployment/DEPLOYMENT_SUMMARY.md`](docs/deployment/DEPLOYMENT_SUMMARY.md) - Deployment summary
- [`/docs/deployment/GCP_QUICK_START.md`](docs/deployment/GCP_QUICK_START.md) - GCP deployment (alternative)

### Features
- [`/docs/features/UPDATED_FEATURES.md`](docs/features/UPDATED_FEATURES.md) - Feature documentation
- [`/docs/features/PAYMENT_INTEGRATION_GUIDE.md`](docs/features/PAYMENT_INTEGRATION_GUIDE.md) - Payment setup guide

### Images
- [`/docs/images/IMAGE_GUIDE.md`](docs/images/IMAGE_GUIDE.md) - Complete image reference
- [`/docs/images/HOW_TO_ADD_IMAGES.md`](docs/images/HOW_TO_ADD_IMAGES.md) - Image management guide

## 🌍 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly navigation
- Optimized images for mobile
- Fast loading on slow connections
- Mobile-first approach

## 🔒 Security & Privacy

- HTTPS enabled via Firebase
- No sensitive data collection
- Privacy-friendly analytics
- Secure WhatsApp integration
- No payment data stored (WhatsApp-based booking)

## 🚀 Performance

- Lazy loading images
- WebP format (smaller file sizes)
- Minified assets
- CDN delivery via Firebase
- Optimized caching

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Ambika Kapoor**
- Website: https://ambika-kapoor-makeup-studio.web.app
- Facebook: https://www.facebook.com/100063586493527
- WhatsApp: +91 8376088663
- Location: Srinagar, Jammu & Kashmir, India

## 🤝 Contributing

This is a personal portfolio website. For suggestions or issues:
1. Open an issue on GitHub
2. Contact via WhatsApp: +91 8376088663

## 📝 Recent Updates

### Latest Version (2024)
- ✅ Firebase hosting deployment
- ✅ Google Analytics integration
- ✅ WhatsApp-based booking system
- ✅ Removed complex booking forms
- ✅ Production-ready code cleanup
- ✅ GitHub repository setup
- ✅ Optimized images (WebP)
- ✅ SEO improvements

---

**Built with ❤️ for Ambika Kapoor Makeup Studio, Srinagar**

🤖 *Generated with [Claude Code](https://claude.com/claude-code)*
