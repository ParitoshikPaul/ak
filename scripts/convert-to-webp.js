#!/usr/bin/env node

/**
 * WebP Image Conversion Script
 * Converts JPEG/PNG images to WebP format with optimizations
 *
 * Usage:
 *   node convert-to-webp.js
 *
 * Place your source images in /source-images folder
 * Converted images will be saved to /images folder
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    sourceDir: path.join(__dirname, '..', 'source-images'),
    outputDir: path.join(__dirname, '..', 'images'),
    webpQuality: 90,
    jpegQuality: 85,
    maxWidth: 1920,
    maxHeight: 1920
};

// Section-specific settings
const SECTION_SPECS = {
    hero: { width: 1920, height: 1080 },
    about: { width: 800, height: 1000 },
    services: { width: 600, height: 400 },
    packages: { width: 800, height: 600 },
    portfolio: { width: 800, height: 800 }
};

// Color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

/**
 * Get all image files from a directory
 */
async function getImageFiles(dir) {
    try {
        const files = await fs.readdir(dir);
        return files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png'].includes(ext);
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`${colors.yellow}Directory ${dir} does not exist${colors.reset}`);
            return [];
        }
        throw error;
    }
}

/**
 * Detect which section an image belongs to based on filename
 */
function detectSection(filename) {
    const lower = filename.toLowerCase();

    if (lower.includes('hero') || lower.includes('background') || lower.includes('bg')) {
        return 'hero';
    }
    if (lower.includes('profile') || lower.includes('about') || lower.includes('headshot')) {
        return 'about';
    }
    if (lower.includes('service') || lower.includes('bridal') || lower.includes('party') ||
        lower.includes('photoshoot') || lower.includes('airbrush') || lower.includes('hair')) {
        return 'services';
    }
    if (lower.includes('package') || lower.includes('classic') || lower.includes('premium')) {
        return 'packages';
    }
    if (lower.includes('portfolio') || lower.includes('work') || lower.includes('sample')) {
        return 'portfolio';
    }

    // Default to portfolio if can't detect
    return 'portfolio';
}

/**
 * Convert image to WebP and JPEG
 */
async function convertImage(sourcePath, section) {
    const filename = path.basename(sourcePath, path.extname(sourcePath));
    const specs = SECTION_SPECS[section] || { width: CONFIG.maxWidth, height: CONFIG.maxHeight };

    // Create output directory if it doesn't exist
    const outputSectionDir = path.join(CONFIG.outputDir, section);
    await fs.mkdir(outputSectionDir, { recursive: true });

    const webpPath = path.join(outputSectionDir, `${filename}.webp`);
    const jpegPath = path.join(outputSectionDir, `${filename}.jpg`);

    try {
        // Load image and get metadata
        const image = sharp(sourcePath);
        const metadata = await image.metadata();

        console.log(`${colors.cyan}Converting: ${filename}${colors.reset}`);
        console.log(`  Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

        // Resize maintaining aspect ratio
        const resizeOptions = {
            width: specs.width,
            height: specs.height,
            fit: 'cover',
            position: 'center'
        };

        // Convert to WebP
        await image
            .clone()
            .resize(resizeOptions)
            .webp({ quality: CONFIG.webpQuality })
            .toFile(webpPath);

        const webpStats = await fs.stat(webpPath);
        console.log(`  ${colors.green}✓ WebP: ${Math.round(webpStats.size / 1024)}KB${colors.reset}`);

        // Convert to JPEG (fallback)
        await image
            .clone()
            .resize(resizeOptions)
            .jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true })
            .toFile(jpegPath);

        const jpegStats = await fs.stat(jpegPath);
        console.log(`  ${colors.green}✓ JPEG: ${Math.round(jpegStats.size / 1024)}KB${colors.reset}`);

        const savings = Math.round((1 - webpStats.size / jpegStats.size) * 100);
        console.log(`  ${colors.blue}Savings: ${savings}%${colors.reset}`);

        return { success: true, webpPath, jpegPath, section };
    } catch (error) {
        console.error(`  ${colors.red}✗ Error: ${error.message}${colors.reset}`);
        return { success: false, error: error.message };
    }
}

/**
 * Main conversion function
 */
async function main() {
    console.log(`\n${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║   WebP Image Conversion Tool          ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

    // Check if sharp is installed
    try {
        require.resolve('sharp');
    } catch (error) {
        console.error(`${colors.red}Error: sharp module not found${colors.reset}`);
        console.log(`${colors.yellow}Please install dependencies first:${colors.reset}`);
        console.log(`  npm install\n`);
        process.exit(1);
    }

    // Check if source directory exists
    try {
        await fs.access(CONFIG.sourceDir);
    } catch (error) {
        console.log(`${colors.yellow}Creating source-images directory...${colors.reset}`);
        await fs.mkdir(CONFIG.sourceDir, { recursive: true });
        console.log(`\n${colors.yellow}Please place your images in the 'source-images' folder and run again.${colors.reset}\n`);
        console.log(`Example structure:`);
        console.log(`  source-images/`);
        console.log(`    ├── hero-background.jpg`);
        console.log(`    ├── profile-photo.jpg`);
        console.log(`    ├── bridal-service-1.jpg`);
        console.log(`    └── portfolio-work-1.jpg\n`);
        process.exit(0);
    }

    // Get all images
    const images = await getImageFiles(CONFIG.sourceDir);

    if (images.length === 0) {
        console.log(`${colors.yellow}No images found in source-images directory.${colors.reset}`);
        console.log(`Please add JPEG or PNG images to convert.\n`);
        process.exit(0);
    }

    console.log(`Found ${images.length} image(s) to convert\n`);

    // Convert each image
    const results = [];
    for (const image of images) {
        const sourcePath = path.join(CONFIG.sourceDir, image);
        const section = detectSection(image);
        const result = await convertImage(sourcePath, section);
        results.push(result);
        console.log('');
    }

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;

    console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║   Conversion Summary                  ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
    console.log(`  Total: ${results.length}`);
    console.log(`  ${colors.green}Success: ${successful}${colors.reset}`);
    if (failed > 0) {
        console.log(`  ${colors.red}Failed: ${failed}${colors.reset}`);
    }

    // Show organized output
    console.log(`\n${colors.blue}Images saved to:${colors.reset}`);
    const sections = {};
    results.forEach(r => {
        if (r.success) {
            if (!sections[r.section]) sections[r.section] = 0;
            sections[r.section]++;
        }
    });

    Object.entries(sections).forEach(([section, count]) => {
        console.log(`  images/${section}/ - ${count} image(s)`);
    });

    console.log(`\n${colors.green}✓ Conversion complete!${colors.reset}\n`);
    console.log(`Next steps:`);
    console.log(`  1. Review images in the 'images' folder`);
    console.log(`  2. Update website to use converted images`);
    console.log(`  3. Deploy with: ./deploy.sh or ./update.sh\n`);
}

// Run the script
main().catch(error => {
    console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
});
