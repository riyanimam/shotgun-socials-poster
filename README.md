# 🚀 Shotgun Social Poster

A modern TypeScript React web application that allows you to post to multiple social media platforms simultaneously. Select your platforms, fill in your content once, and post everywhere at the same time!

## ✨ Features

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

- **Backend Integration**: Service layer for secure API integration with social media platforms

- **TypeScript**: Full TypeScript support for type safety and better developer experience

- **Modern Tooling**: 
  - Biome for fast linting and formatting
  - Vitest for unit testing with coverage reporting
  - Lefthook for pre-commit hooks

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/riyanimam/shotgun-socials-poster.git
cd shotgun-socials-poster
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional, for API integration):
```bash
cp .env.example .env.local
# Edit .env.local and add your API keys
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔑 API Key Configuration

### Local Development

Create a `.env.local` file in the root directory with your API keys:

```env
# Facebook
VITE_FACEBOOK_API_KEY=your_facebook_access_token

# Instagram
VITE_INSTAGRAM_API_KEY=your_instagram_access_token

# Twitter/X
VITE_TWITTER_API_KEY=your_twitter_api_key
VITE_TWITTER_API_SECRET=your_twitter_api_secret
VITE_TWITTER_ACCESS_TOKEN=your_twitter_access_token
VITE_TWITTER_ACCESS_SECRET=your_twitter_access_secret

# Threads
VITE_THREADS_API_KEY=your_threads_access_token

# BlueSky
VITE_BLUESKY_HANDLE=your_bluesky_handle
VITE_BLUESKY_APP_PASSWORD=your_bluesky_app_password

# Reddit
VITE_REDDIT_CLIENT_ID=your_reddit_client_id
VITE_REDDIT_CLIENT_SECRET=your_reddit_client_secret
VITE_REDDIT_USERNAME=your_reddit_username
VITE_REDDIT_PASSWORD=your_reddit_password

# TikTok
VITE_TIKTOK_API_KEY=your_tiktok_api_key
```

### GitHub Actions Deployment

For production deployment via GitHub Actions, add these secrets to your repository:

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **New repository secret** and add each of the following:
   - `FACEBOOK_API_KEY`
   - `INSTAGRAM_API_KEY`
   - `TWITTER_API_KEY`
   - `TWITTER_API_SECRET`
   - `TWITTER_ACCESS_TOKEN`
   - `TWITTER_ACCESS_SECRET`
   - `THREADS_API_KEY`
   - `BLUESKY_HANDLE`
   - `BLUESKY_APP_PASSWORD`
   - `REDDIT_CLIENT_ID`
   - `REDDIT_CLIENT_SECRET`
   - `REDDIT_USERNAME`
   - `REDDIT_PASSWORD`
   - `TIKTOK_API_KEY`

**Security Note**: API keys will be embedded in the client-side code. For production applications, consider implementing a backend proxy to keep keys secure.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Run Biome linter and auto-fix issues
- `npm run format` - Format code with Biome
- `npm run check` - Run linter and formatter
- `npm run type-check` - Run TypeScript type checking

## 🛠️ Development

### Pre-commit Hooks

This project uses Lefthook for pre-commit hooks. To install:

```bash
npx lefthook install
```

The pre-commit hooks will automatically:
- Run linting and fix issues
- Run type checking
- Run tests

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Run all checks (lint + format)
npm run check
```

## 🚢 Deployment

This project is configured to deploy automatically to GitHub Pages.

### GitHub Pages Setup

The repository is configured with:
1. A GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on push to main
2. A CI workflow (`.github/workflows/ci.yml`) that runs tests and linting on pull requests
3. Vite configured with the correct base path for GitHub Pages

### Automatic Deployment

Every push to the `main` branch will automatically:
1. Run linting and tests
2. Install dependencies
3. Build the project with environment variables
4. Deploy to GitHub Pages

The site will be available at: `https://riyanimam.github.io/shotgun-socials-poster/`

### Manual Deployment

You can also trigger a deployment manually:
1. Go to the Actions tab in the GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### Enable GitHub Pages

To enable GitHub Pages for this repository:
1. Go to repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. The site will be deployed automatically

## 🏗️ Project Structure

```
shotgun-socials-poster/
├── src/
│   ├── components/          # React components
│   │   ├── __tests__/       # Component tests
│   │   └── *.tsx           # Component files
│   ├── services/            # API service layer
│   │   ├── __tests__/       # Service tests
│   │   ├── base.ts         # Base service class
│   │   ├── facebook.ts     # Facebook integration
│   │   ├── twitter.ts      # Twitter integration
│   │   ├── discord.ts      # Discord integration
│   │   └── index.ts        # Service factory
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Global types
│   ├── utils/              # Utility functions
│   │   ├── __tests__/      # Utility tests
│   │   └── platformConfig.ts # Platform configurations
│   ├── test/               # Test setup
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Vite environment types
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI workflow
│       └── deploy.yml      # Deployment workflow
├── public/                 # Static assets
├── biome.json             # Biome configuration
├── lefthook.yml           # Pre-commit hooks
├── tsconfig.json          # TypeScript configuration
├── vitest.config.ts       # Vitest configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies
```

## 🧪 Testing

The project includes comprehensive unit tests for:
- Platform configuration and validation
- API service layer
- Service factory

Test coverage is automatically reported in CI/CD pipelines.

## 📝 Platform Requirements

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Technologies Used

- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Biome**: Fast linter and formatter
- **Vitest**: Unit testing framework
- **Framer Motion**: Animation library
- **Lefthook**: Git hooks manager
- **CSS3**: Custom styling with responsive design

## ⚠️ Note

This application currently serves as a frontend demo with placeholder API integrations for most platforms. Discord integration is functional as it uses webhooks. For production use with other platforms:

1. Implement backend API proxy to keep credentials secure
2. Add proper OAuth flows for user authentication
3. Implement rate limiting and error handling
4. Add request queuing for better reliability
5. Consider using official SDKs for each platform

The current implementation embeds API keys in the client-side code, which is suitable for demos but not recommended for production applications.

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

## Deployment

This project is configured to deploy automatically to GitHub Pages.

### GitHub Pages Setup

The repository is configured with:
1. A GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on push to main
2. Vite configured with the correct base path for GitHub Pages

### Automatic Deployment

Every push to the `main` branch will automatically:
1. Install dependencies
2. Build the project
3. Deploy to GitHub Pages

The site will be available at: `https://riyanimam.github.io/shotgun-socials-poster/`

### Manual Deployment

You can also trigger a deployment manually:
1. Go to the Actions tab in the GitHub repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### Enable GitHub Pages

To enable GitHub Pages for this repository:
1. Go to repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. The site will be deployed automatically

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
