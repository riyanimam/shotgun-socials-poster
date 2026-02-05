import { platforms } from '../utils/platformConfig';
import './PostPreview.css';

function PostPreview({ selectedPlatforms, formData, onClose }) {
  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={e => e.stopPropagation()}>
        <div className="preview-header">
          <h2>Post Preview</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="preview-content">
          <div className="preview-info">
            <p>✅ Ready to post to {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}</p>
          </div>

          {selectedPlatforms.map(platformKey => {
            const platform = platforms[platformKey];
            
            return (
              <div key={platformKey} className="platform-preview">
                <div 
                  className="platform-preview-header"
                  style={{ backgroundColor: platform.color }}
                >
                  <span>{platform.icon} {platform.name}</span>
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
                        {formData.embedTitle && <p><strong>{formData.embedTitle}</strong></p>}
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
            );
          })}
        </div>
        
        <div className="preview-footer">
          <button className="preview-button secondary" onClick={onClose}>
            ← Back to Edit
          </button>
          <button className="preview-button primary">
            🚀 Confirm & Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
