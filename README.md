# Roam Research Chrome Extension

A Chrome extension that saves the current URL to your Roam Research daily notes.

## Features

- 🔗 Save current page URL to Roam Research
- 📅 Automatically adds to today's daily note
- ⚙️ Multiple formatting options (link only, title + link, bullet point)
- 🔐 Secure local storage of credentials
- 📋 Copy-to-clipboard functionality (current implementation)

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

## Usage

1. Navigate to any webpage you want to save
2. Click the extension icon in your toolbar
3. Enter your Roam Research credentials:
   - Graph name (e.g., "my-roam-graph")
   - Email and password
4. Choose your preferred format
5. Click "Save to Today's Page"
6. The formatted content will be copied to your clipboard
7. Paste it into your Roam Research daily note

## Current Implementation

This version copies formatted content to your clipboard for manual pasting into Roam Research. The content is formatted as:

```
[[December 29th, 2024]]
  - [Page Title](https://example.com)
```

## Future Enhancements

- Direct API integration with Roam Research
- Background sync capabilities
- Bulk URL saving
- Custom date selection
- Tag and block reference support

## Security Notes

- Credentials are stored locally in Chrome's storage
- No data is sent to external servers (except Roam Research when API is integrated)
- Passwords are handled securely within the extension

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `popup.html/js` - User interface
- `background.js` - Background service worker
- `content.js` - Page content interaction

## Icons

You'll need to add icon files in the `icons/` directory:
- `icon16.png` (16x16)
- `icon32.png` (32x32)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

## License

MIT License