import { AnimatePresence, motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { Eye, Info, Search, Star, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './HelpModal.css'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
  darkMode: boolean
}

interface Tip {
  icon: LucideIcon
  title: string
  description: string
}

interface Shortcut {
  key: string
  description: string
}

export default function HelpModal({ isOpen, onClose, darkMode }: HelpModalProps) {
  const tips: Tip[] = [
    {
      icon: Search,
      title: 'Smart Platform Selection',
      description: 'Select multiple platforms to see combined requirements and character limits.',
    },
    {
      icon: Star,
      title: 'Platform-Specific Fields',
      description:
        'Fields are tagged with platform badges to show which social media requires them.',
    },
    {
      icon: Eye,
      title: 'Preview Before Posting',
      description:
        'Review your posts for all platforms before publishing to ensure everything looks perfect.',
    },
    {
      icon: Info,
      title: 'Validation Helpers',
      description: "Real-time validation ensures your content meets each platform's requirements.",
    },
  ]

  const shortcuts: Shortcut[] = [
    { key: 'Esc', description: 'Close modals and dialogs' },
    { key: 'Tab', description: 'Navigate between form fields' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="help-modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className={`help-modal-content ${darkMode ? 'dark' : ''}`}
          >
            <button onClick={onClose} className="help-modal-close" type="button">
              <X size={20} />
            </button>

            <div className="help-modal-header">
              <h2>🚀 Shotgun Social Poster Help</h2>
              <p>Tips and tricks for posting to multiple platforms</p>
            </div>

            <div className="help-section">
              <h3>✨ Features & Tips</h3>
              <div className="help-tips">
                {tips.map((tip) => {
                  const Icon = tip.icon
                  return (
                    <motion.div
                      key={tip.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: tips.indexOf(tip) * 0.1 }}
                      className="help-tip"
                    >
                      <div className="help-tip-icon">
                        <Icon size={20} />
                      </div>
                      <div className="help-tip-content">
                        <h4>{tip.title}</h4>
                        <p>{tip.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="help-section">
              <h3>⌨️ Keyboard Shortcuts</h3>
              <div className="help-shortcuts">
                {shortcuts.map((shortcut) => (
                  <div key={shortcut.key} className="help-shortcut">
                    <kbd>{shortcut.key}</kbd>
                    <span>{shortcut.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="help-section">
              <h3>🌟 Platform Support</h3>
              <p className="help-description">
                This app supports 8 major social media platforms with their specific requirements,
                character limits, and media constraints. Each platform has unique rules that are
                automatically validated as you type!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
