import { platforms, platformKeys } from '../utils/platformConfig';
import './PlatformSelector.css';

function PlatformSelector({ selectedPlatforms, onTogglePlatform }) {
  return (
    <div className="platform-selector">
      <h2>Select Platforms</h2>
      <div className="platform-grid">
        {platformKeys.map(platformKey => {
          const platform = platforms[platformKey];
          const isSelected = selectedPlatforms.includes(platformKey);
          
          return (
            <button
              key={platformKey}
              type="button"
              className={`platform-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onTogglePlatform(platformKey)}
              style={{
                borderColor: isSelected ? platform.color : '#e0e0e0',
                backgroundColor: isSelected ? `${platform.color}10` : '#fff'
              }}
            >
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
              {isSelected && (
                <span className="check-mark" style={{ color: platform.color }}>✓</span>
              )}
            </button>
          );
        })}
      </div>
      {selectedPlatforms.length > 0 && (
        <div className="selected-count">
          {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  );
}

export default PlatformSelector;
