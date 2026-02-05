import type { FormData, PlatformKey } from '@/types'
import type { PostResult, ServiceConfig } from './base'
import { DiscordService } from './discord'
import { FacebookService } from './facebook'
import { TwitterService } from './twitter'

// Service factory to create platform-specific services
export class SocialMediaServiceFactory {
  static createService(platform: PlatformKey, config: ServiceConfig = {}) {
    switch (platform) {
      case 'facebook':
        return new FacebookService(config)
      case 'twitter':
        return new TwitterService(config)
      case 'discord':
        return new DiscordService(config)
      case 'instagram':
      case 'threads':
      case 'bluesky':
      case 'reddit':
      case 'tiktok':
        // Return a placeholder service that indicates the platform is not yet implemented
        return new PlaceholderService(platform)
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }
  }

  // Post to multiple platforms simultaneously
  static async postToMultiplePlatforms(
    platforms: PlatformKey[],
    data: FormData,
    configs: Partial<Record<PlatformKey, ServiceConfig>> = {}
  ): Promise<PostResult[]> {
    const promises = platforms.map(async (platform) => {
      const service = this.createService(platform, configs[platform])
      return service.post(data)
    })

    return Promise.all(promises)
  }
}

// Placeholder service for platforms not yet implemented
class PlaceholderService {
  constructor(private platformName: PlatformKey) {}

  async post(_data: FormData): Promise<PostResult> {
    return {
      success: false,
      platform: this.platformName,
      error: `${this.platformName} integration is not yet implemented. This is a frontend-only demo.`,
    }
  }

  async validateCredentials(): Promise<boolean> {
    return false
  }
}

export { DiscordService, FacebookService, TwitterService }
export type { PostResult, ServiceConfig }
