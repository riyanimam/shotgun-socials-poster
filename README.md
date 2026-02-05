# 🚀 Shotgun Social Poster

A React web application that allows you to post to multiple social media platforms simultaneously. Select your platforms, fill in your content once, and post everywhere at the same time!

## Features

- **Multi-Platform Support**: Post to 8 different social media platforms:
  - 👤 Facebook
  - 📷 Instagram
  - 🐦 Twitter / X
  - 🧵 Threads
  - 🦋 BlueSky
  - 🤖 Reddit
  - 🎵 TikTok
  - 💬 Discord

- **Platform-Specific Configurations**: The form intelligently adapts to show only relevant fields based on your selected platforms, respecting each platform's unique requirements:
  - Character limits (e.g., 280 for Twitter, 2200 for Instagram captions)
  - Required fields (e.g., image for Instagram, webhook URL for Discord)
  - Platform-specific options (e.g., threads for Twitter, embeds for Discord)

- **Smart Validation**: Real-time validation ensures your content meets each platform's requirements before posting

- **Preview Feature**: Review your posts for all selected platforms before publishing

- **Beautiful UI**: Modern, responsive design with platform-specific colors and icons

## Installation

1. Clone the repository:
```bash
git clone https://github.com/riyanimam/shotgun-socials-poster.git
cd shotgun-socials-poster
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Select Platforms**: Click on the platform cards to select which social media sites you want to post to
2. **Fill in Content**: The form will dynamically show fields relevant to your selected platforms
3. **Preview**: Click "Post to X Platforms" to see a preview of your posts
4. **Post**: Confirm and post to all selected platforms

## Platform Requirements

### Facebook
- Supports text, images, videos, and links
- No character limit for text

### Instagram
- **Image or video required**
- Caption max: 2,200 characters
- Max 30 hashtags

### Twitter / X
- Text max: 280 characters
- Up to 4 images per tweet
- Thread option for multiple tweets

### Threads
- Text max: 500 characters
- Up to 10 images/videos

### BlueSky
- Text max: 300 characters
- Up to 4 images

### Reddit
- **Title required** (max 300 characters)
- Choose either text OR link post (not both)
- Subreddit selection required

### TikTok
- **Video required**
- Caption max: 2,200 characters

### Discord
- **Webhook URL required**
- Message max: 2,000 characters
- Optional embed support with rich formatting

## Development

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## Technologies Used

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with responsive design
- **ESLint**: Code quality and consistency

## Project Structure

```
shotgun-socials-poster/
├── src/
│   ├── components/
│   │   ├── SocialPosterForm.jsx      # Main form component
│   │   ├── SocialPosterForm.css
│   │   ├── PlatformSelector.jsx      # Platform selection grid
│   │   ├── PlatformSelector.css
│   │   ├── PostPreview.jsx          # Preview modal
│   │   └── PostPreview.css
│   ├── utils/
│   │   └── platformConfig.js        # Platform configurations and validation
│   ├── App.jsx                       # Main app component
│   ├── App.css
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Note

This is a front-end application that demonstrates the UI/UX for multi-platform social media posting. Actual API integrations with social media platforms would need to be implemented in a backend service for production use.
