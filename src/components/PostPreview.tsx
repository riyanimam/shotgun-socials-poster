import type { FormData, PlatformKey } from '@/types'
import { motion } from 'framer-motion'
import { platforms } from '../utils/platformConfig'
import './PostPreview.css'

interface PostPreviewProps {
  selectedPlatforms: PlatformKey[]
  formData: FormData
  onClose: () => void
  darkMode: boolean
}

export default function PostPreview({
  selectedPlatforms,
  formData,
  onClose,
  darkMode,
}: PostPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="preview-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`preview-modal ${darkMode ? 'dark' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="preview-header">
          <h2>Post Preview</h2>
          <button className="close-button" onClick={onClose} type="button">
            ✕
          </button>
        </div>

        <div className="preview-content">
          <div className="preview-info">
            <p>
              ✅ Ready to post to {selectedPlatforms.length} platform
              {selectedPlatforms.length !== 1 ? 's' : ''}
            </p>
          </div>

          {selectedPlatforms.map((platformKey) => {
            const platform = platforms[platformKey]

            return (
              <div key={platformKey} className="platform-preview">
                <div
                  className="platform-preview-header"
                  style={{ backgroundColor: platform.color }}
                >
                  <span>
                    {platform.icon} {platform.name}
                  </span>
                </div>

                <div className="platform-preview-body">
                  {/* Main content */}
                  {formData.text && (
                    <div className="preview-field">
                      <strong>Text:</strong>
                      <p>{formData.text}</p>
                    </div>
                  )}

                  {formData.caption && (
                    <div className="preview-field">
                      <strong>Caption:</strong>
                      <p>{formData.caption}</p>
                    </div>
                  )}

                  {formData.title && (
                    <div className="preview-field">
                      <strong>Title:</strong>
                      <p>{formData.title}</p>
                    </div>
                  )}

                  {formData.subreddit && (
                    <div className="preview-field">
                      <strong>Subreddit:</strong>
                      <p>{formData.subreddit}</p>
                    </div>
                  )}

                  {formData.link && (
                    <div className="preview-field">
                      <strong>Link:</strong>
                      <p>{formData.link}</p>
                    </div>
                  )}

                  {formData.hashtags && (
                    <div className="preview-field">
                      <strong>Hashtags:</strong>
                      <p>{formData.hashtags}</p>
                    </div>
                  )}

                  {formData.webhookUrl && (
                    <div className="preview-field">
                      <strong>Webhook URL:</strong>
                      <p className="webhook-url">{formData.webhookUrl}</p>
                    </div>
                  )}

                  {formData.embed && (
                    <div className="preview-field">
                      <strong>Embed:</strong>
                      <div className="embed-preview">
                        {formData.embedTitle && (
                          <p>
                            <strong>{formData.embedTitle}</strong>
                          </p>
                        )}
                        {formData.embedDescription && <p>{formData.embedDescription}</p>}
                      </div>
                    </div>
                  )}

                  {formData.thread && (
                    <div className="preview-field">
                      <span className="badge">🧵 Thread</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="preview-footer">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="preview-button secondary"
            onClick={onClose}
          >
            ← Back to Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="preview-button primary"
          >
            🚀 Confirm & Post
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
