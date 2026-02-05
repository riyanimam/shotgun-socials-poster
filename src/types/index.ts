export interface PlatformFieldConfig {
  required?: boolean
  maxLength?: number
  placeholder?: string
  accept?: string
  multiple?: boolean
  maxFiles?: number
  type?: 'boolean' | 'text' | 'file'
  label?: string
}

export interface PlatformConfig {
  name: string
  icon: string
  color: string
  fields: Record<string, PlatformFieldConfig>
  notes: string
}

export type PlatformKey =
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'threads'
  | 'bluesky'
  | 'reddit'
  | 'tiktok'
  | 'discord'

export type PlatformConfigs = Record<PlatformKey, PlatformConfig>

export interface FormData {
  text?: string
  caption?: string
  image?: FileList | null
  video?: FileList | null
  link?: string
  hashtags?: string
  thread?: boolean
  subreddit?: string
  title?: string
  webhookUrl?: string
  embed?: boolean
  embedTitle?: string
  embedDescription?: string
  [key: string]: string | boolean | FileList | null | undefined
}

export interface ValidationErrors {
  [platform: string]: string[]
}

export interface PostData {
  platform: PlatformKey
  content: FormData
}

export interface ApiCredentials {
  facebook?: {
    accessToken: string
  }
  instagram?: {
    accessToken: string
  }
  twitter?: {
    apiKey: string
    apiSecret: string
    accessToken: string
    accessSecret: string
  }
  threads?: {
    accessToken: string
  }
  bluesky?: {
    handle: string
    appPassword: string
  }
  reddit?: {
    clientId: string
    clientSecret: string
    username: string
    password: string
  }
  tiktok?: {
    apiKey: string
  }
  discord?: {
    webhookUrl: string
  }
}
