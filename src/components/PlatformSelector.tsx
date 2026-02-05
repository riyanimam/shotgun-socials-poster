import type { PlatformKey } from '@/types'
import { motion } from 'framer-motion'
import { platformKeys, platforms } from '../utils/platformConfig'
import './PlatformSelector.css'

interface PlatformSelectorProps {
  selectedPlatforms: PlatformKey[]
  onTogglePlatform: (platformKey: PlatformKey) => void
  darkMode: boolean
}

export default function PlatformSelector({
  selectedPlatforms,
  onTogglePlatform,
  darkMode,
}: PlatformSelectorProps) {
  return (
    <div className="platform-selector">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        Select Platforms
      </motion.h2>
      <div className="platform-grid">
        {platformKeys.map((platformKey, index) => {
          const platform = platforms[platformKey]
          const isSelected = selectedPlatforms.includes(platformKey)

          return (
            <motion.button
              key={platformKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`platform-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onTogglePlatform(platformKey)}
              style={{
                borderColor: isSelected ? platform.color : darkMode ? '#374151' : '#e0e0e0',
                backgroundColor: isSelected
                  ? `${platform.color}15`
                  : darkMode
                    ? 'rgba(255, 255, 255, 0.05)'
                    : '#fff',
              }}
            >
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="check-mark"
                  style={{ color: platform.color }}
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>
      {selectedPlatforms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="selected-count"
        >
          {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
        </motion.div>
      )}
    </div>
  )
}
