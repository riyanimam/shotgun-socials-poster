import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { FormData } from '@/types'
import { DiscordService } from '../discord'

// Mock global fetch
global.fetch = vi.fn()

describe('DiscordService', () => {
  let service: DiscordService

  beforeEach(() => {
    vi.resetAllMocks()
    service = new DiscordService({
      webhookUrl: 'https://discord.com/api/webhooks/123/abc',
    })
  })

  describe('validateCredentials', () => {
    it('should return true for valid webhook URL', async () => {
      const result = await service.validateCredentials()
      expect(result).toBe(true)
    })

    it('should return false for invalid webhook URL', async () => {
      const invalidService = new DiscordService({ webhookUrl: 'https://invalid.com' })
      const result = await invalidService.validateCredentials()
      expect(result).toBe(false)
    })

    it('should return false for empty webhook URL', async () => {
      const invalidService = new DiscordService({ webhookUrl: '' })
      const result = await invalidService.validateCredentials()
      expect(result).toBe(false)
    })
  })

  describe('post', () => {
    it('should successfully post a simple message', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
      })
      global.fetch = mockFetch

      const formData: FormData = {
        text: 'Hello Discord!',
      }

      const result = await service.post(formData)

      expect(result.success).toBe(true)
      expect(result.platform).toBe('discord')
      expect(result.postId).toBeDefined()
      expect(mockFetch).toHaveBeenCalledWith(
        'https://discord.com/api/webhooks/123/abc',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })

    it('should post with embed when requested', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
      })
      global.fetch = mockFetch

      const formData: FormData = {
        text: 'Hello Discord!',
        embed: true,
        embedTitle: 'Test Title',
        embedDescription: 'Test Description',
      }

      const result = await service.post(formData)

      expect(result.success).toBe(true)
      const callArg = mockFetch.mock.calls[0][1]
      const body = JSON.parse(callArg.body)
      expect(body.embeds).toBeDefined()
      expect(body.embeds[0].title).toBe('Test Title')
      expect(body.embeds[0].description).toBe('Test Description')
    })

    it('should handle API errors', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        text: async () => 'Bad Request',
      })
      global.fetch = mockFetch

      const formData: FormData = {
        text: 'Hello Discord!',
      }

      const result = await service.post(formData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('400')
    })

    it('should handle network errors', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))
      global.fetch = mockFetch

      const formData: FormData = {
        text: 'Hello Discord!',
      }

      const result = await service.post(formData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Network error')
    })

    it('should fail when webhook URL is not configured', async () => {
      const invalidService = new DiscordService({ webhookUrl: '' })
      const formData: FormData = {
        text: 'Hello Discord!',
      }

      const result = await invalidService.post(formData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('not configured')
    })
  })
})
