import React, { useState } from 'react';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  screenshot?: string;
  onClick?: () => void;
  onScreenshotClick?: () => void;
  isMobile?: boolean;
  disabled?: boolean;
  learnMoreText?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  screenshot,
  onClick,
  onScreenshotClick,
  isMobile = false,
  disabled = false,
  learnMoreText = 'Learn more'
}) => {
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if (disabled) return;
    // If a custom screenshot click handler exists, avoid triggering card click from screenshot region
    if (
      onScreenshotClick &&
      (e.target as HTMLElement).closest('.screenshot-container')
    ) {
      return;
    }
    onClick?.();
  };

  const handleScreenshotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onScreenshotClick?.();
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`
        card h-100
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${!disabled ? 'shadow-sm hover-shadow' : ''}
      `}
      style={{ transition: 'box-shadow 0.2s' }}
    >
      <div className={`card-body d-flex flex-column ${isMobile ? 'p-3' : 'p-4'}`}>
        
        {/* Screenshot - Fixed 16:9 Ratio */}
        {screenshot && (
          <div 
            className="screenshot-container position-relative mb-3 bg-light border rounded overflow-hidden flex-shrink-0 cursor-pointer"
            onClick={onScreenshotClick ? handleScreenshotClick : undefined}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            style={{
              aspectRatio: '16/9'
            }}
          >
            <ImageWithFallback 
              src={screenshot}
              alt={`${title} screenshot`}
              className="w-100 h-100 object-fit-cover transition-transform"
              style={{ 
                transform: isHoveringImage ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.2s'
              }}
            />
            
            {onScreenshotClick && (
              // Zoom Icon Overlay (only when screenshot click is enabled)
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: isHoveringImage ? 'rgba(0,0,0,0.2)' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
              >
                <div 
                  className="bg-white rounded-circle p-2 shadow transition-all"
                  style={{
                    opacity: isHoveringImage ? 1 : 0,
                    transform: isHoveringImage ? 'scale(1)' : 'scale(0.9)'
                  }}
                >
                  <ZoomIn size={20} className="text-dark" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Icon Circle */}
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light mb-3 flex-shrink-0" style={{ width: '28px', height: '28px' }}>
          {icon}
        </div>

        {/* Title */}
        <h5 className="card-title mb-2 text-truncate-2-lines">
          {title}
        </h5>

        {/* Description */}
        <p className="card-text text-muted mb-3 small flex-grow-1 text-truncate-2-lines">
          {description}
        </p>

        {/* Learn More Link */}
        {!disabled && (
          <div className="d-flex align-items-center gap-1 text-muted small mt-auto">
            <span>{learnMoreText}</span>
            <ArrowRight size={14} />
          </div>
        )}
      </div>
    </div>
  );
};
