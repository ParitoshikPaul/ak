# Visual Editor Guide

Complete guide for using the GrapesJS visual editor to edit your Ambika Kapoor website without coding.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Using the Editor](#using-the-editor)
4. [Editor Features](#editor-features)
5. [Saving Changes](#saving-changes)
6. [Security](#security)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/apple/Projects/ak
npm install
```

This installs:
- `express` - Web server
- `body-parser` - Request handling
- `sharp` - Image processing

### 2. Start the Editor Server

```bash
npm start
```

Or:

```bash
node server.js
```

You should see:

```
╔════════════════════════════════════════╗
║   Visual Editor Server Running         ║
╚════════════════════════════════════════╝

🌐 Server:        http://localhost:3000
🎨 Editor:        http://localhost:3000/editor.html
📄 Website:       http://localhost:3000/index.html
🔒 Password:      ambika2024
```

### 3. Open the Visual Editor

In your browser, go to:

```
http://localhost:3000/editor.html
```

### 4. Login

**Default Password:** `ambika2024`

⚠️ **IMPORTANT**: Change this password before deploying!

### 5. Start Editing

- Drag and drop elements
- Click to edit text
- Double-click images to change
- Use the sidebar to add components
- Click "Save Changes" when done

---

## Installation

### Prerequisites

- Node.js 18+ installed
- npm (comes with Node.js)

### Step-by-Step Installation

```bash
# 1. Navigate to project directory
cd /Users/apple/Projects/ak

# 2. Install all dependencies
npm install

# 3. Verify installation
node server.js
```

### Dependencies Installed

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web server |
| body-parser | ^1.20.2 | Parse request bodies |
| sharp | ^0.33.0 | Image processing |

### Frontend Libraries (CDN)

These are loaded from CDN (no installation needed):
- **GrapesJS** - Visual page builder
- **GrapesJS Preset Webpage** - Pre-built components

---

## Using the Editor

### Editor Interface

```
┌─────────────────────────────────────────────────────┐
│  🎨 Visual Editor - Ambika Kapoor Website           │
│                                    💾 Save  👁️ Preview │
├─────────────────────────────────────────────────────┤
│ Blocks │                                     │ Style │
│ Panel  │     Website Canvas                  │ Panel │
│        │     (Drag & Drop)                   │       │
│        │                                     │       │
└─────────────────────────────────────────────────────┘
```

### Basic Workflow

#### 1. **Editing Text**

- Click on any text to edit
- Type directly to change content
- Use toolbar for formatting (bold, italic, etc.)

#### 2. **Changing Images**

- Click on an image
- Look for "Settings" in the right panel
- Change the image URL or upload new image
- Or: Right-click → Replace Image

#### 3. **Adding Elements**

- Click "Blocks" panel on the left
- Drag components onto the canvas:
  - Text blocks
  - Images
  - Buttons
  - Columns
  - Sections

#### 4. **Styling Elements**

- Select any element
- Use "Style Manager" on the right
- Adjust:
  - Colors
  - Fonts
  - Spacing
  - Borders
  - Backgrounds

#### 5. **Layout Changes**

- Drag elements to reposition
- Resize by dragging corners
- Use column layouts for structure
- Stack elements vertically

---

## Editor Features

### 1. **Drag & Drop Builder**

Add elements by dragging from the blocks panel:

**Available Blocks:**
- Text (paragraphs, headings)
- Images
- Buttons
- Links
- Videos
- Maps
- Columns (1, 2, 3 columns)
- Quotes
- Dividers

### 2. **Style Manager**

Customize appearance without CSS:

**Style Categories:**
- **General**: Display, position, float
- **Dimension**: Width, height, margins, padding
- **Typography**: Fonts, sizes, colors, alignment
- **Decorations**: Backgrounds, borders, shadows
- **Extra**: Opacity, transitions, transforms

### 3. **Device Preview**

Test responsive design:
- Desktop view
- Tablet view
- Mobile view

Click the device icons in the toolbar.

### 4. **Layers Panel**

View and manage all elements:
- See page structure
- Reorder elements
- Show/hide elements
- Lock elements

### 5. **Asset Manager**

Manage images and files:
- Upload new images
- Browse existing images
- Organize assets

---

## Saving Changes

### Manual Save

1. Click **"💾 Save Changes"** button
2. Wait for confirmation: "✅ Changes saved successfully!"
3. Changes are written to `index.html`

### Auto-Save

The editor automatically saves every **2 minutes** while you're working.

### Backups

Every manual save creates a backup:

```
index.backup.1735488000000.html
```

Backups are timestamped and stored in the root directory.

### Preview Before Saving

1. Click **"👁️ Preview"** button
2. See changes in new window
3. Test functionality
4. Close preview
5. Save if satisfied

---

## Security

### Change Default Password

**Method 1: Environment Variable**

```bash
EDITOR_PASSWORD=your-secure-password npm start
```

**Method 2: Edit Files**

In `editor.html` (line 113):
```javascript
const EDITOR_PASSWORD = 'your-secure-password';
```

In `server.js` (line 20):
```javascript
const EDITOR_PASSWORD = process.env.EDITOR_PASSWORD || 'your-secure-password';
```

### Password Requirements

✅ **Good Passwords:**
- `Ambika@Makeup2024!`
- `Kashmir_Bridal_2024`
- `SecurePass#123`

❌ **Bad Passwords:**
- `password`
- `123456`
- `ambika`

### Production Deployment

**⚠️ IMPORTANT**: For production:

1. **Use environment variables**
   ```bash
   export EDITOR_PASSWORD=strong-password-here
   ```

2. **Add authentication layer**
   - Use proper user authentication
   - Add HTTPS
   - Consider OAuth

3. **Restrict access**
   - Firewall rules
   - IP whitelisting
   - VPN access

4. **Don't expose publicly**
   - Keep editor on private network
   - Use SSH tunneling
   - Or use localhost only

---

## Troubleshooting

### Issue: "Cannot GET /api/get-html"

**Problem**: Server not running

**Solution**:
```bash
npm start
```

---

### Issue: "Failed to load website"

**Causes**:
- Server crashed
- `index.html` missing or corrupted

**Solution**:
```bash
# Check server logs
# Restore from backup if needed
```

---

### Issue: Changes not saving

**Check**:
1. Correct password entered
2. Server running
3. File permissions (index.html writable)
4. Disk space available

**Solution**:
```bash
# Check file permissions
ls -la index.html

# Make writable if needed
chmod 644 index.html
```

---

### Issue: "Port 3000 already in use"

**Solution**:

```bash
# Use different port
PORT=8080 npm start

# Or kill existing process
lsof -ti:3000 | xargs kill
```

---

### Issue: Editor looks broken

**Causes**:
- GrapesJS CDN down
- Browser cache issues

**Solution**:
1. Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Clear browser cache
3. Try different browser

---

### Issue: Auto-save not working

**Check**:
- Editor open for 2+ minutes
- No browser errors (check Console)
- Server still running

**Manual Save**:
- Always use manual save for important changes

---

## Advanced Usage

### Restoring Backups

Backups are stored as:
```
index.backup.[timestamp].html
```

**To restore**:

```bash
# List backups
ls -la index.backup.*.html

# Restore specific backup
cp index.backup.1735488000000.html index.html

# Restart editor to see restored version
```

### Custom CSS

Changes made in the Style Manager are saved to `styles.custom.css`.

This file is loaded after `styles.css`, so your changes override defaults.

### Editing Multiple Pages

Currently, the editor only works with `index.html`.

For multiple pages:
1. Create separate HTML files
2. Modify `server.js` to handle different pages
3. Use different routes (`/api/get-about`, etc.)

---

## Best Practices

### ✅ DO:

- **Test changes in preview** before saving
- **Save frequently** during long editing sessions
- **Use backups** before major changes
- **Keep password secure**
- **Check mobile view** for responsive design

### ❌ DON'T:

- Edit while server is down
- Use weak passwords in production
- Delete backup files immediately
- Make major changes without testing
- Edit raw HTML while using visual editor

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save | `Cmd/Ctrl + S` |
| Undo | `Cmd/Ctrl + Z` |
| Redo | `Cmd/Ctrl + Shift + Z` |
| Delete Element | `Delete` |
| Copy Element | `Cmd/Ctrl + C` |
| Paste Element | `Cmd/Ctrl + V` |

---

## Editor Limitations

### What CAN'T be edited visually:

- JavaScript functionality
- Complex animations
- Form submission logic
- Backend integrations
- Database connections

These require code editing in:
- `script.js` - JavaScript
- `server.js` - Backend
- `styles.css` - Complex CSS

### What CAN be edited:

- ✅ Text content
- ✅ Images
- ✅ Colors
- ✅ Fonts
- ✅ Layouts
- ✅ Spacing
- ✅ Basic styles
- ✅ Simple components

---

## Integration with Deployment

### After Editing

1. **Save changes** in editor
2. **Test locally**: `http://localhost:3000`
3. **Deploy to GCP**:
   ```bash
   ./scripts/update.sh
   ```

### Deployment Workflow

```
Edit in Visual Editor
        ↓
Save Changes (creates backup)
        ↓
Preview & Test
        ↓
Deploy to GCP
        ↓
Live Website Updated
```

---

## FAQ

### Can multiple people edit at once?

No, the current setup doesn't support concurrent editing. Last save wins.

### Can I undo after saving?

Yes, restore from the backup file created before your save.

### Will this work on mobile?

The editor works best on desktop. Editing on mobile is possible but not recommended.

### Do I need to know code?

No! The visual editor lets you make changes without coding. However, understanding HTML/CSS helps for advanced customization.

### Can I add new pages?

Not directly in the editor. You'll need to create new HTML files manually and configure the server to handle them.

### Is my data safe?

- Backups created on each save
- Changes written to local files
- No cloud storage (data stays on your machine)

---

## Support & Resources

### GrapesJS Documentation
- Official Docs: https://grapesjs.com/docs/
- Tutorials: https://grapesjs.com/demo.html
- GitHub: https://github.com/artf/grapesjs

### Project Documentation
- Getting Started: `/docs/getting-started/START_HERE.md`
- Deployment: `/docs/deployment/GCP_QUICK_START.md`
- Features: `/docs/features/`

### Getting Help

1. Check this guide first
2. Review troubleshooting section
3. Check browser console for errors
4. Review server logs

---

## Quick Reference

### Start Editor
```bash
npm start
```

### Access Editor
```
http://localhost:3000/editor.html
```

### Default Password
```
ambika2024
```

### Change Password
```bash
EDITOR_PASSWORD=newpassword npm start
```

### Deploy Changes
```bash
./scripts/update.sh
```

---

**Happy Editing! 🎨**
