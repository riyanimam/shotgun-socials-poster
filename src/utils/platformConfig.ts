import type { FormData, PlatformConfigs, PlatformKey, ValidationErrors } from '@/types'

export const platforms: PlatformConfigs = {
  facebook: {
    name: 'Facebook',
    icon: '👤',
    color: '#1877F2',
    fields: {
      text: {
        required: true,
        maxLength: 63206,
        placeholder: "What's on your mind?",
      },
      image: {
        type: 'file',
        accept: 'image/*',
        multiple: true,
        maxFiles: 10,
      },
      link: {
        placeholder: 'https://example.com',
      },
    },
    notes: 'Text posts can be up to 63,206 characters. Up to 10 images supported.',
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    fields: {
      caption: {
        maxLength: 2200,
        placeholder: 'Write a caption...',
      },
      image: {
        type: 'file',
        required: true,
        accept: 'image/*',
        multiple: true,
        maxFiles: 10,
      },
      hashtags: {
        maxLength: 30,
        placeholder: '#example #hashtag',
      },
    },
    notes: 'Image required. Captions up to 2,200 characters. Max 30 hashtags.',
  },
  twitter: {
    name: 'Twitter / X',
    icon: '🐦',
    color: '#1DA1F2',
    fields: {
      text: {
        required: true,
        maxLength: 280,
        placeholder: "What's happening?",
      },
      image: {
        type: 'file',
        accept: 'image/*',
        multiple: true,
        maxFiles: 4,
      },
      thread: {
        type: 'boolean',
        label: 'Post as thread',
      },
    },
    notes: 'Max 280 characters per tweet. Up to 4 images. Thread option for longer posts.',
  },
  threads: {
    name: 'Threads',
    icon: '🧵',
    color: '#000000',
    fields: {
      text: {
        required: true,
        maxLength: 500,
        placeholder: 'Start a thread...',
      },
      image: {
        type: 'file',
        accept: 'image/*',
        multiple: true,
        maxFiles: 10,
      },
    },
    notes: 'Max 500 characters. Up to 10 images supported.',
  },
  bluesky: {
    name: 'BlueSky',
    icon: '🦋',
    color: '#0085ff',
    fields: {
      text: {
        required: true,
        maxLength: 300,
        placeholder: "What's up?",
      },
      image: {
        type: 'file',
        accept: 'image/*',
        multiple: true,
        maxFiles: 4,
      },
    },
    notes: 'Max 300 characters. Up to 4 images supported.',
  },
  reddit: {
    name: 'Reddit',
    icon: '🤖',
    color: '#FF4500',
    fields: {
      title: {
        required: true,
        maxLength: 300,
        placeholder: 'An interesting title',
      },
      text: {
        maxLength: 40000,
        placeholder: 'Text (optional)',
      },
      subreddit: {
        required: true,
        placeholder: 'r/subreddit',
      },
      link: {
        placeholder: 'https://example.com (for link posts)',
      },
    },
    notes: 'Title required (max 300 chars). Text up to 40,000 characters. Specify subreddit.',
  },
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    color: '#000000',
    fields: {
      caption: {
        maxLength: 2200,
        placeholder: 'Describe your video...',
      },
      video: {
        type: 'file',
        required: true,
        accept: 'video/*',
      },
      hashtags: {
        placeholder: '#fyp #trending',
      },
    },
    notes: 'Video required. Caption up to 2,200 characters. Hashtags recommended.',
  },
  discord: {
    name: 'Discord',
    icon: '💬',
    color: '#5865F2',
    fields: {
      text: {
        maxLength: 2000,
        placeholder: 'Message content',
      },
      webhookUrl: {
        required: true,
        placeholder: 'https://discord.com/api/webhooks/...',
      },
      embed: {
        type: 'boolean',
        label: 'Use embed',
      },
      embedTitle: {
        maxLength: 256,
        placeholder: 'Embed title (if using embed)',
      },
      embedDescription: {
        maxLength: 4096,
        placeholder: 'Embed description (if using embed)',
      },
    },
    notes: 'Webhook URL required. Message up to 2,000 chars. Embeds support rich formatting.',
  },
}

export const platformKeys: PlatformKey[] = [
  'facebook',
  'instagram',
  'twitter',
  'threads',
  'bluesky',
  'reddit',
  'tiktok',
  'discord',
]

export function validatePost(
  selectedPlatforms: PlatformKey[],
  formData: FormData
): ValidationErrors {
  const errors: ValidationErrors = {}

  for (const platformKey of selectedPlatforms) {
    const platform = platforms[platformKey]
    const platformErrors: string[] = []

    for (const [fieldName, fieldConfig] of Object.entries(platform.fields)) {
      const value = formData[fieldName]

      // Check required fields
      if (fieldConfig.required) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          platformErrors.push(
            `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
          )
        }
      }

      // Check max length for string fields
      if (
        fieldConfig.maxLength &&
        typeof value === 'string' &&
        value.length > fieldConfig.maxLength
      ) {
        platformErrors.push(
          `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} exceeds maximum length of ${fieldConfig.maxLength} characters`
        )
      }

      // Check file fields
      if (fieldConfig.type === 'file' && value instanceof FileList) {
        if (fieldConfig.maxFiles && value.length > fieldConfig.maxFiles) {
          platformErrors.push(
            `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} exceeds maximum of ${fieldConfig.maxFiles} files`
          )
        }
      }
    }

    if (platformErrors.length > 0) {
      errors[platformKey] = platformErrors
    }
  }

  return errors
}
