# API Integration Guide

This guide explains how to configure and use the API integration features in the Shotgun Social Poster.

## Architecture Overview

The application uses a service-based architecture for API integrations:

```
┌─────────────────┐
│   Components    │ (React UI)
└────────┬────────┘
         │
┌────────▼────────┐
│ Service Factory │ (Creates services)
└────────┬────────┘
         │
┌────────▼────────┐
│    Services     │ (Platform-specific)
│  - Facebook     │
│  - Twitter      │
│  - Discord      │
│  - etc.         │
└─────────────────┘
```

## Setting Up API Keys

### Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your API keys to `.env.local`

3. Restart your development server:
   ```bash
   npm run dev
   ```

### GitHub Actions (Production)

1. Navigate to your repository on GitHub
2. Go to **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Add each secret for the platforms you want to integrate

The secrets will be automatically injected during the build process by the deploy workflow.

## Security Considerations

⚠️ **Important**: The current implementation embeds API keys in client-side code. For production, implement a backend proxy to keep keys secure.

## Resources

- [Facebook Graph API](https://developers.facebook.com/docs/graph-api/)
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api)
- [Discord Webhooks](https://discord.com/developers/docs/resources/webhook)
