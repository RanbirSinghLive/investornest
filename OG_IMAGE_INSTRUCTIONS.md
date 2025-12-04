# How to Create the OG Image

## Option 1: Screenshot Method (Easiest)

1. Open `public/og-image-generator.html` in your browser
2. Make sure your browser window is at least 1200x630px
3. Take a screenshot or use a browser extension to capture the exact dimensions
4. Save as `public/og-image.png` (1200x630px)

### Browser Extensions for Screenshot:
- **Chrome**: "Full Page Screen Capture" or "GoFullPage"
- **Firefox**: Built-in screenshot tool (Cmd+Shift+S on Mac)
- **Safari**: Use Preview or a screenshot tool

## Option 2: Online Tools

### Canva (Recommended)
1. Go to [canva.com](https://www.canva.com)
2. Create custom size: 1200x630px
3. Use the template:
   - Background: Gradient (purple/blue)
   - Title: "InvestOrNest" (large, bold, white)
   - Subtitle: "Should I pay off my mortgage faster, or invest?"
   - Tagline: "Free Canadian Mortgage vs Investment Calculator"
   - Add Canadian flag emoji (🇨🇦)
4. Download as PNG
5. Save to `public/og-image.png`

### Figma
1. Create a 1200x630px frame
2. Add gradient background
3. Add text and styling as shown in the HTML template
4. Export as PNG
5. Save to `public/og-image.png`

## Option 3: Command Line (Using Playwright/Puppeteer)

If you have Node.js installed:
```bash
npm install -g playwright
npx playwright install chromium
# Then use a script to capture the HTML as PNG
```

## Design Specifications

- **Dimensions**: 1200x630px (exact)
- **Format**: PNG (recommended) or JPG
- **Background**: Gradient (purple/blue) or solid color
- **Text**: 
  - Main title: "InvestOrNest" (large, bold, white)
  - Tagline: "Should I pay off my mortgage faster, or invest?"
  - Subtitle: "Free Canadian Mortgage vs Investment Calculator"
- **Elements**: Canadian flag emoji (🇨🇦)
- **Style**: Clean, modern, professional

## Quick Screenshot Steps

1. Open `public/og-image-generator.html` in Chrome
2. Press F12 to open DevTools
3. Click the device toolbar icon (or Cmd+Shift+M)
4. Set custom dimensions: 1200x630
5. Right-click on the page → "Capture screenshot"
6. Save as `public/og-image.png`

## Verification

After creating the image:
1. Check file exists: `public/og-image.png`
2. Verify dimensions: 1200x630px
3. Test on [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. Test on [Twitter Card Validator](https://cards-dev.twitter.com/validator)



