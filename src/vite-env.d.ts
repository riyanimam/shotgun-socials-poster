/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACEBOOK_API_KEY?: string
  readonly VITE_INSTAGRAM_API_KEY?: string
  readonly VITE_TWITTER_API_KEY?: string
  readonly VITE_TWITTER_API_SECRET?: string
  readonly VITE_TWITTER_ACCESS_TOKEN?: string
  readonly VITE_TWITTER_ACCESS_SECRET?: string
  readonly VITE_THREADS_API_KEY?: string
  readonly VITE_BLUESKY_HANDLE?: string
  readonly VITE_BLUESKY_APP_PASSWORD?: string
  readonly VITE_REDDIT_CLIENT_ID?: string
  readonly VITE_REDDIT_CLIENT_SECRET?: string
  readonly VITE_REDDIT_USERNAME?: string
  readonly VITE_REDDIT_PASSWORD?: string
  readonly VITE_TIKTOK_API_KEY?: string
  readonly VITE_DISCORD_WEBHOOK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
