import type { FormData, PlatformFieldConfig, PlatformKey, ValidationErrors } from '@/types'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { platforms, validatePost } from '../utils/platformConfig'
import PlatformSelector from './PlatformSelector'
import PostPreview from './PostPreview'
import Tooltip from './Tooltip'
import './SocialPosterForm.css'

interface SocialPosterFormProps {
  darkMode: boolean
}

export default function SocialPosterForm({ darkMode }: SocialPosterFormProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformKey[]>([])
  const [formData, setFormData] = useState<FormData>({
    text: '',
    caption: '',
    title: '',
    subreddit: '',
    link: '',
    hashtags: '',
    webhookUrl: '',
    embedTitle: '',
    embedDescription: '',
    thread: false,
    embed: false,
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [showPreview, setShowPreview] = useState(false)

  const handlePlatformToggle = (platformKey: PlatformKey) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformKey) ? prev.filter((p) => p !== platformKey) : [...prev, platformKey]
    )
    setErrors({})
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedPlatforms.length === 0) {
      setErrors({ general: ['Please select at least one platform'] })
      return
    }

    const validationErrors = validatePost(selectedPlatforms, formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Show preview instead of actually posting
    setShowPreview(true)
    console.log('Post data:', { selectedPlatforms, formData })
  }

  const renderField = (
    fieldName: string,
    fieldConfig: PlatformFieldConfig,
    platformKey: PlatformKey
  ) => {
    const platform = platforms[platformKey]

    if (fieldConfig.type === 'boolean') {
      return (
        <div key={`${platformKey}-${fieldName}`} className="form-field checkbox-field">
          <label>
            <input
              type="checkbox"
              name={fieldName}
              checked={(formData[fieldName] as boolean) || false}
              onChange={handleInputChange}
            />
            <span>{fieldConfig.label}</span>
          </label>
          <span className="field-platform" style={{ backgroundColor: platform.color }}>
            {platform.icon} {platform.name}
          </span>
        </div>
      )
    }

    if (fieldConfig.accept) {
      return (
        <div key={`${platformKey}-${fieldName}`} className="form-field">
          <label>
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            {fieldConfig.required && <span className="required">*</span>}
            <span className="field-platform" style={{ backgroundColor: platform.color }}>
              {platform.icon} {platform.name}
            </span>
          </label>
          <input
            type="file"
            name={fieldName}
            accept={fieldConfig.accept}
            multiple={fieldConfig.multiple}
            onChange={handleInputChange}
            className="file-input"
          />
          {fieldConfig.maxFiles && (
            <small className="field-hint">Max {fieldConfig.maxFiles} files</small>
          )}
        </div>
      )
    }

    return null
  }

  const renderTextFields = () => {
    const fieldElements: React.ReactElement[] = []
    const processedFields = new Set<string>()

    for (const platformKey of selectedPlatforms) {
      const platform = platforms[platformKey]

      for (const [fieldName, fieldConfig] of Object.entries(platform.fields)) {
        if (processedFields.has(fieldName)) continue
        processedFields.add(fieldName)

        if (fieldConfig.type === 'boolean' || fieldConfig.accept) continue

        // Find all platforms that use this field
        const usingPlatforms = selectedPlatforms.filter((pk) => platforms[pk].fields[fieldName])

        const isRequired = usingPlatforms.some((pk) => platforms[pk].fields[fieldName]?.required)

        // Get the most restrictive maxLength
        const maxLengths = usingPlatforms
          .map((pk) => platforms[pk].fields[fieldName]?.maxLength)
          .filter((l): l is number => Boolean(l))
        const maxLength = maxLengths.length > 0 ? Math.min(...maxLengths) : null

        fieldElements.push(
          <div key={fieldName} className="form-field">
            <label>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, ' $1')}
              {isRequired && <span className="required">*</span>}
              {maxLength && (
                <span className="char-count">
                  {(formData[fieldName] as string)?.length || 0} / {maxLength}
                </span>
              )}
            </label>
            <div className="field-platforms">
              {usingPlatforms.map((pk) => (
                <span
                  key={pk}
                  className="platform-tag"
                  style={{ backgroundColor: platforms[pk].color }}
                >
                  {platforms[pk].icon} {platforms[pk].name}
                </span>
              ))}
            </div>
            {fieldName === 'text' || fieldName === 'caption' || fieldName === 'embedDescription' ? (
              <textarea
                name={fieldName}
                value={(formData[fieldName] as string) || ''}
                onChange={handleInputChange}
                placeholder={fieldConfig.placeholder}
                maxLength={maxLength || undefined}
                rows={4}
                className="text-input"
              />
            ) : (
              <input
                type="text"
                name={fieldName}
                value={(formData[fieldName] as string) || ''}
                onChange={handleInputChange}
                placeholder={fieldConfig.placeholder}
                maxLength={maxLength || undefined}
                className="text-input"
              />
            )}
            {fieldConfig.placeholder && (
              <small className="field-hint">{fieldConfig.placeholder}</small>
            )}
          </div>
        )
      }
    }

    return fieldElements
  }

  const renderFileFields = () => {
    const processedFields = new Set<string>()
    const fieldElements: (React.ReactElement | null)[] = []

    for (const platformKey of selectedPlatforms) {
      const platform = platforms[platformKey]

      for (const [fieldName, fieldConfig] of Object.entries(platform.fields)) {
        if (fieldConfig.accept && !processedFields.has(fieldName)) {
          processedFields.add(fieldName)
          fieldElements.push(renderField(fieldName, fieldConfig, platformKey))
        }
      }
    }

    return fieldElements
  }

  const renderCheckboxFields = () => {
    const processedFields = new Set<string>()
    const fieldElements: (React.ReactElement | null)[] = []

    for (const platformKey of selectedPlatforms) {
      const platform = platforms[platformKey]

      for (const [fieldName, fieldConfig] of Object.entries(platform.fields)) {
        if (fieldConfig.type === 'boolean' && !processedFields.has(fieldName)) {
          processedFields.add(fieldName)
          fieldElements.push(renderField(fieldName, fieldConfig, platformKey))
        }
      }
    }

    return fieldElements
  }

  return (
    <div className="social-poster-form">
      <PlatformSelector
        selectedPlatforms={selectedPlatforms}
        onTogglePlatform={handlePlatformToggle}
        darkMode={darkMode}
      />

      {selectedPlatforms.length > 0 && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="post-form"
        >
          <div className="form-section">
            <h3>Content</h3>
            {renderTextFields()}
          </div>

          {renderFileFields().length > 0 && (
            <div className="form-section">
              <h3>Media</h3>
              {renderFileFields()}
            </div>
          )}

          {renderCheckboxFields().length > 0 && (
            <div className="form-section">
              <h3>Options</h3>
              {renderCheckboxFields()}
            </div>
          )}

          {selectedPlatforms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="platform-notes"
            >
              <h4>Platform Requirements:</h4>
              {selectedPlatforms.map((platformKey) => {
                const platform = platforms[platformKey]
                return (
                  <motion.div
                    key={platformKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="platform-note"
                  >
                    <div className="platform-note-header">
                      <span style={{ color: platform.color }}>
                        {platform.icon} <strong>{platform.name}:</strong>
                      </span>
                      <Tooltip
                        content={`${platform.name} has specific posting requirements. Make sure to follow these guidelines for successful posting.`}
                        darkMode={darkMode}
                      />
                    </div>
                    <span className="platform-note-text">{platform.notes}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {errors.general && (
            <div className="error-message general-error">
              {errors.general.map((err) => (
                <div key={err}>{err}</div>
              ))}
            </div>
          )}

          {Object.entries(errors).map(
            ([platformKey, platformErrors]) =>
              platformKey !== 'general' && (
                <div key={platformKey} className="error-message platform-error">
                  <strong>{platforms[platformKey as PlatformKey]?.name || platformKey}:</strong>
                  {platformErrors.map((err) => (
                    <div key={err}>{err}</div>
                  ))}
                </div>
              )
          )}

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="form-actions"
          >
            <button type="submit" className="submit-button">
              🚀 Post to {selectedPlatforms.length} Platform
              {selectedPlatforms.length !== 1 ? 's' : ''}
            </button>
          </motion.div>
        </motion.form>
      )}

      {showPreview && (
        <PostPreview
          selectedPlatforms={selectedPlatforms}
          formData={formData}
          onClose={() => setShowPreview(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}
