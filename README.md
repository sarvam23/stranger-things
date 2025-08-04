# Dark/Light Mode Switcher Chrome Extension

A simple Chrome extension that allows you to toggle between dark and light modes on any website.

## Features

- 🌓 Toggle between dark and light modes with a single click
- 💾 Remembers your preference for each website
- 🎨 Smooth transitions between modes
- 🔄 Reset option to return to default mode
- 🌐 Works on all websites

## Installation Instructions

### Step 1: Prepare the Extension Files
1. Make sure you have all the extension files in a folder:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `content.js`
   - `styles.css`
   - `icons/` folder with icon files

### Step 2: Enable Developer Mode in Chrome
1. Open Google Chrome
2. Navigate to `chrome://extensions/` (type this in the address bar)
3. In the top-right corner, toggle **"Developer mode"** to ON

### Step 3: Load the Extension
1. Click the **"Load unpacked"** button that appears after enabling Developer mode
2. Navigate to and select the folder containing your extension files
3. Click **"Select Folder"** (or "Open" on some systems)

### Step 4: Verify Installation
1. You should see the "Dark/Light Mode Switcher" extension appear in your extensions list
2. The extension icon should appear in your Chrome toolbar (you may need to click the puzzle piece icon to pin it)

### Step 5: Using the Extension
1. Click on the extension icon in your toolbar
2. Use the toggle switch to switch between light and dark modes
3. The extension will remember your preference for each website
4. Use the "Reset to Default" button to return to the original appearance

## How It Works

- **Light Mode**: Shows websites in their original appearance
- **Dark Mode**: Applies a dark filter to invert colors while preserving images and media
- **Per-Site Memory**: Each website's mode preference is saved separately
- **Dynamic Content**: Handles dynamically loaded content automatically

## Troubleshooting

- **Extension not working**: Try refreshing the webpage after toggling the mode
- **Some elements look weird**: This is normal with filter-based dark mode; use the reset button if needed
- **Extension disappeared**: Check if it's hidden behind the puzzle piece icon in the toolbar

## Files Structure

```
dark-light-mode-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── content.js            # Main dark mode logic
├── styles.css            # Additional styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## Technical Details

- Uses CSS filters to invert page colors
- Preserves images and media by double-inverting them
- Stores preferences using Chrome's sync storage API
- Implements smooth transitions for better user experience