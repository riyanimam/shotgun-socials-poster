import type { FormData, PlatformKey } from '@/types'

// Base service class for all social media integrations
export abstract class SocialMediaService {
  protected abstract platformName: string

  abstract post(data: FormData): Promise<PostResult>
  abstract validateCredentials(): Promise<boolean>

  protected handleError(error: unknown): PostResult {
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error(`${this.platformName} error:`, message)
    return {
      success: false,
      platform: this.platformName as PlatformKey,
      error: message,
    }
  }
}

export interface PostResult {
  success: boolean
  platform: PlatformKey
  postId?: string
  url?: string
  error?: string
}

export interface ServiceConfig {
  apiKey?: string
  apiSecret?: string
  accessToken?: string
  accessSecret?: string
  webhookUrl?: string
  handle?: string
  appPassword?: string
  clientId?: string
  clientSecret?: string
  username?: string
  password?: string
}
