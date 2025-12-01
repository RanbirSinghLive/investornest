#!/usr/bin/env node

/**
 * Script to generate OG image from HTML template
 * Requires: npm install -g playwright
 * Then run: node scripts/generate-og-image.js
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  console.log('🎨 Generating OG image...');
  
  const htmlPath = path.join(__dirname, '../public/og-image-generator.html');
  const outputPath = path.join(__dirname, '../public/og-image.png');
  
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ HTML template not found:', htmlPath);
    process.exit(1);
  }
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to exact OG image dimensions
  await page.setViewportSize({ width: 1200, height: 630 });
  
  // Load the HTML file
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  
  // Take screenshot
  await page.screenshot({
    path: outputPath,
    width: 1200,
    height: 630,
    fullPage: false,
  });
  
  await browser.close();
  
  console.log('✅ OG image generated:', outputPath);
  console.log('📏 Dimensions: 1200x630px');
}

// Check if playwright is available
try {
  require('playwright');
  generateOGImage().catch(console.error);
} catch (error) {
  console.log('⚠️  Playwright not installed.');
  console.log('📝 To install: npm install -g playwright');
  console.log('   Then run: npx playwright install chromium');
  console.log('   Or use the HTML template method (see OG_IMAGE_INSTRUCTIONS.md)');
  process.exit(1);
}

