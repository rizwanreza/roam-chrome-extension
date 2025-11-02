# Roam Research Chrome Extension

A Chrome extension that saves the current URL to your Roam Research daily notes.

[![Certified Shovelware](https://justin.searls.co/img/shovelware.svg)](https://justin.searls.co/shovelware/)

## Features

- 🔗 Save current page URL directly to Roam Research
- 📅 Automatically adds to today's daily note
- ⚙️ Multiple formatting options (link only, title + link, bullet point)
- 🔐 Secure local storage of API credentials
- 🏷️ Automatically adds [[To Read]] tag to saved items
- ⚡ Direct API integration - no manual copying required

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

## Setup

### Getting Your Roam Research API Token

1. Go to your Roam Research graph settings
2. Navigate to the API section
3. Generate a new API token
4. Copy and save this token securely

### Using the Extension

1. Navigate to any webpage you want to save
2. Click the extension icon in your toolbar
3. Enter your Roam Research credentials:
   - Graph name (e.g., "my-roam-graph")
   - API token (click "Authentication Settings" to expand)
4. Choose your preferred format (link only, title + link, or bullet point)
5. Click "Save to Today's Page"
6. The URL will be saved directly to your Roam Research daily note with a [[To Read]] tag

## How It Works

The extension uses the Roam Research API to directly write blocks to your daily notes. When you save a page, it:

1. Formats the URL according to your preference (e.g., `[Page Title](https://example.com)`)
2. Adds a `[[To Read]]` tag automatically
3. Creates a new block in today's daily note page
4. Saves your settings for future use

## Future Enhancements

- Custom tag configuration (currently hardcoded to [[To Read]])
- Background sync capabilities
- Bulk URL saving
- Custom date selection (save to past/future dates)
- Additional block reference and metadata support
- Keyboard shortcuts for quick saving

## Security Notes

- API tokens are stored locally in Chrome's storage
- Data is only sent to the official Roam Research API (api.roamresearch.com)
- No third-party services or analytics are used
- Keep your API token secure and don't share it

## Project Structure

```
roam-research-chrome-extension/
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup UI
├── popup.js          # Main popup logic and API integration
└── icons/            # Extension icons (16x16, 32x32, 48x48, 128x128)
```

## License

MIT License
