import { PostResult, ServiceConfig, SocialMediaService } from './base'
import type { FormData } from '@/types'

export class DiscordService extends SocialMediaService {
  protected platformName = 'discord'
  private webhookUrl: string

  constructor(config: ServiceConfig) {
    super()
    this.webhookUrl = config.webhookUrl || ''
  }

  async validateCredentials(): Promise<boolean> {
    return !!this.webhookUrl && this.webhookUrl.includes('discord.com/api/webhooks')
  }

  async post(data: FormData): Promise<PostResult> {
    try {
      const isValid = await this.validateCredentials()
      if (!isValid) {
        throw new Error('Discord webhook URL not configured or invalid')
      }

      const payload: DiscordWebhookPayload = {
        content: data.text as string,
      }

      // Add embed if requested
      if (data.embed && (data.embedTitle || data.embedDescription)) {
        payload.embeds = [
          {
            title: data.embedTitle as string | undefined,
            description: data.embedDescription as string | undefined,
            color: 0x5865f2, // Discord blue
          },
        ]
      }

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Discord API returned ${response.status}: ${await response.text()}`)
      }

      return {
        success: true,
        platform: 'discord',
        postId: 'discord_' + Date.now(),
      }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

interface DiscordWebhookPayload {
  content?: string
  embeds?: Array<{
    title?: string
    description?: string
    color?: number
  }>
}
