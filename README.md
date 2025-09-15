# Editor.js Viewer

A simple, clean web-based viewer for Editor.js content. Paste your Editor.js JSON data and instantly see how it renders.

## 🌐 Live Demo
**[Try it now: https://aronanand.github.io/EditorJSViewer/](https://aronanand.github.io/EditorJSViewer/)**

## ☕ Support
If you find this tool helpful, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support%20my%20work-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/aronanand)

## Features

- ✅ **Multiple Block Support**: Headers, paragraphs, lists, quotes, code blocks, tables, images, and more
- ✅ **Clean Design**: Responsive and modern interface
- ✅ **Real-time Rendering**: Instant preview of your Editor.js content
- ✅ **Error Handling**: Clear error messages for invalid data
- ✅ **Sample Data**: Included sample for testing

## Supported Block Types

- **Paragraph**: Text content with HTML formatting
- **Header**: Section headings (H1-H6)
- **List**: Ordered and unordered lists
- **Quote**: Blockquotes with optional citations
- **Code**: Syntax-highlighted code blocks
- **Table**: Tables with optional headers
- **Image**: Images with captions
- **Delimiter**: Section dividers
- **Raw HTML**: Raw HTML content
- **Embed**: Embedded content (iframes, etc.)

## Quick Start

1. **Start the server**:
   ```bash
   npm start
   # or
   python3 -m http.server 8080
   ```

2. **Open in browser**:
   Navigate to `http://localhost:8080`

3. **Test with sample data**:
   Copy the content from `sample-data.json` and paste it into the input area

4. **Use your own data**:
   Paste any valid Editor.js JSON output to see it rendered

## Usage

1. Paste your Editor.js JSON data in the left textarea
2. Click "Render Content" to display the formatted output
3. Use "Clear" to reset both input and output areas

## File Structure

```
editorjsviewer/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── sample-data.json    # Sample Editor.js data for testing
├── package.json        # Project configuration
└── README.md           # This file
```

## JSON Format

The viewer expects standard Editor.js JSON format:

```json
{
  "time": 1672531200000,
  "blocks": [
    {
      "id": "unique-id",
      "type": "paragraph",
      "data": {
        "text": "Your content here"
      }
    }
  ],
  "version": "2.28.2"
}
```

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License - feel free to use and modify as needed.