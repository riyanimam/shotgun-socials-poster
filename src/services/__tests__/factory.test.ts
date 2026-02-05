import { describe, expect, it } from 'vitest'
import { SocialMediaServiceFactory } from '../index'

describe('SocialMediaServiceFactory', () => {
  describe('createService', () => {
    it('should create FacebookService', () => {
      const service = SocialMediaServiceFactory.createService('facebook')
      expect(service).toBeDefined()
    })

    it('should create TwitterService', () => {
      const service = SocialMediaServiceFactory.createService('twitter')
      expect(service).toBeDefined()
    })

    it('should create DiscordService', () => {
      const service = SocialMediaServiceFactory.createService('discord', {
        webhookUrl: 'https://discord.com/api/webhooks/123/abc',
      })
      expect(service).toBeDefined()
    })

    it('should create PlaceholderService for unimplemented platforms', () => {
      const service = SocialMediaServiceFactory.createService('instagram')
      expect(service).toBeDefined()
    })
  })

  describe('postToMultiplePlatforms', () => {
    it('should post to multiple platforms', async () => {
      const formData = {
        text: 'Test post',
      }

      const results = await SocialMediaServiceFactory.postToMultiplePlatforms(
        ['facebook', 'twitter'],
        formData
      )

      expect(results).toHaveLength(2)
      expect(results[0].platform).toBe('facebook')
      expect(results[1].platform).toBe('twitter')
    })

    it('should handle mix of implemented and unimplemented platforms', async () => {
      const formData = {
        text: 'Test post',
      }

      const results = await SocialMediaServiceFactory.postToMultiplePlatforms(
        ['facebook', 'instagram'],
        formData
      )

      expect(results).toHaveLength(2)
      expect(results[1].success).toBe(false)
      expect(results[1].error).toContain('not yet implemented')
    })
  })
})
