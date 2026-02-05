// Platform-specific configurations and requirements
export const platforms = {
  facebook: {
    name: 'Facebook',
    icon: '👤',
    color: '#1877F2',
    fields: {
      text: { required: false, maxLength: 63206, placeholder: 'What\'s on your mind?' },
      image: { required: false, accept: 'image/*,video/*', multiple: true },
      link: { required: false, placeholder: 'https://...' }
    },
    notes: 'Supports text, images, videos, and links. No character limit for text.'
  },
  instagram: {
    name: 'Instagram',
    icon: '📷',
    color: '#E4405F',
    fields: {
      caption: { required: false, maxLength: 2200, placeholder: 'Write a caption...' },
      image: { required: true, accept: 'image/*,video/*', multiple: true },
      hashtags: { required: false, maxLength: 30, placeholder: '#hashtag1 #hashtag2' }
    },
    notes: 'Image or video required. Max 30 hashtags. Caption max 2,200 characters.'
  },
  twitter: {
    name: 'Twitter / X',
    icon: '🐦',
    color: '#1DA1F2',
    fields: {
      text: { required: true, maxLength: 280, placeholder: 'What\'s happening?' },
      image: { required: false, accept: 'image/*,video/*', multiple: true, maxFiles: 4 },
      thread: { required: false, type: 'boolean', label: 'Post as thread' }
    },
    notes: 'Max 280 characters per tweet. Up to 4 images per tweet. Thread option for multiple tweets.'
  },
  threads: {
    name: 'Threads',
    icon: '🧵',
    color: '#000000',
    fields: {
      text: { required: true, maxLength: 500, placeholder: 'Start a thread...' },
      image: { required: false, accept: 'image/*,video/*', multiple: true, maxFiles: 10 }
    },
    notes: 'Max 500 characters. Up to 10 images/videos.'
  },
  bluesky: {
    name: 'BlueSky',
    icon: '🦋',
    color: '#0085FF',
    fields: {
      text: { required: true, maxLength: 300, placeholder: 'What\'s up?' },
      image: { required: false, accept: 'image/*', multiple: true, maxFiles: 4 }
    },
    notes: 'Max 300 characters. Up to 4 images.'
  },
  reddit: {
    name: 'Reddit',
    icon: '🤖',
    color: '#FF4500',
    fields: {
      subreddit: { required: true, placeholder: 'r/subreddit' },
      title: { required: true, maxLength: 300, placeholder: 'Post title' },
      text: { required: false, maxLength: 40000, placeholder: 'Text content (optional)' },
      link: { required: false, placeholder: 'https://... (text OR link, not both)' }
    },
    notes: 'Title required. Choose text OR link post. Max 300 chars for title.'
  },
  tiktok: {
    name: 'TikTok',
    icon: '🎵',
    color: '#000000',
    fields: {
      video: { required: true, accept: 'video/*' },
      caption: { required: false, maxLength: 2200, placeholder: 'Describe your video...' },
      hashtags: { required: false, placeholder: '#FYP #trending' }
    },
    notes: 'Video required. Max 2,200 characters for caption.'
  },
  discord: {
    name: 'Discord',
    icon: '💬',
    color: '#5865F2',
    fields: {
      webhookUrl: { required: true, placeholder: 'Discord webhook URL' },
      text: { required: false, maxLength: 2000, placeholder: 'Message content' },
      embed: { required: false, type: 'boolean', label: 'Use embed format' },
      embedTitle: { required: false, maxLength: 256, placeholder: 'Embed title' },
      embedDescription: { required: false, maxLength: 4096, placeholder: 'Embed description' }
    },
    notes: 'Webhook URL required. Max 2,000 characters for message. Embeds support rich formatting.'
  }
};

export const platformKeys = Object.keys(platforms);

// Validate post content against platform requirements
export const validatePost = (selectedPlatforms, formData) => {
  const errors = {};

  selectedPlatforms.forEach(platformKey => {
    const platform = platforms[platformKey];
    const platformErrors = [];

    Object.entries(platform.fields).forEach(([fieldName, fieldConfig]) => {
      const value = formData[fieldName];

      // Check required fields
      if (fieldConfig.required && !value) {
        platformErrors.push(`${fieldName} is required for ${platform.name}`);
      }

      // Check max length
      if (fieldConfig.maxLength && value && value.length > fieldConfig.maxLength) {
        platformErrors.push(`${fieldName} exceeds max length of ${fieldConfig.maxLength} for ${platform.name}`);
      }
    });

    // Platform-specific validations
    if (platformKey === 'reddit') {
      if (formData.text && formData.link) {
        platformErrors.push('Reddit: Cannot have both text and link - choose one');
      }
    }

    if (platformKey === 'instagram' && !formData.image) {
      platformErrors.push('Instagram requires at least one image or video');
    }

    if (platformKey === 'tiktok' && !formData.video) {
      platformErrors.push('TikTok requires a video');
    }

    if (platformErrors.length > 0) {
      errors[platformKey] = platformErrors;
    }
  });

  return errors;
};

// Get unique fields needed for selected platforms
export const getRequiredFields = (selectedPlatforms) => {
  const fields = new Set();
  
  selectedPlatforms.forEach(platformKey => {
    const platform = platforms[platformKey];
    Object.keys(platform.fields).forEach(field => fields.add(field));
  });

  return Array.from(fields);
};
