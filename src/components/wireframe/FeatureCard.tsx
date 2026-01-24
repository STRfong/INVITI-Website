import React, { useState } from 'react';
import { ArrowRight, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  screenshot?: string;
  hoverGif?: string; // Optional GIF to show on hover
  onClick?: () => void;
  onScreenshotClick?: () => void;
  isMobile?: boolean;
  disabled?: boolean;
  learnMoreText?: string;
  isFullWidth?: boolean; // For 3:7 ratio on full-width cards
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  screenshot,
  hoverGif,
  onClick,
  onScreenshotClick,
  isMobile = false,
  disabled = false,
  learnMoreText = 'Learn more',
  isFullWidth = false
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
      style={{ 
        transition: 'box-shadow 0.2s',
        backgroundColor: '#FDFDFD',
        borderColor: 'rgba(45, 53, 8, 0.15)',
        overflow: 'hidden'
      }}
    >
      <div 
        className={`card-body d-flex p-0 ${isFullWidth ? 'flex-column flex-md-row' : 'flex-column'}`}
        style={{ color: '#2D3508', height: '100%' }}
      >
        {/* Content Section */}
        <div 
          className={`d-flex flex-column p-4 p-lg-5 feature-card-content ${isFullWidth ? 'feature-card-content-fullwidth' : ''}`}
          style={{ 
            minWidth: 0,
            flex: isFullWidth && !isMobile ? '0 0 30%' : '1',
            width: isFullWidth && !isMobile ? '30%' : undefined
          }}
        >
          {/* Icon */}
          <div 
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 flex-shrink-0" 
            style={{ 
              width: '40px', 
              height: '40px',
              backgroundColor: 'rgba(45, 53, 8, 0.1)'
            }}
          >
            <div style={{ color: '#2D3508' }}>
              {icon}
            </div>
          </div>

          {/* Title */}
          <h5 className="card-title mb-2" style={{ color: '#2D3508', fontWeight: 600, fontSize: '1.5rem', lineHeight: '1.3' }}>
            {title}
          </h5>

          {/* Description/Subtitle and Button Container */}
          {/* First card (full-width) desktop: Button at bottom */}
          {/* All other cases: Button inline with subtitle */}
          {!isMobile && isFullWidth ? (
            /* Desktop full-width (first card, 3:7 layout): Subtitle with margin, button at bottom */
            <>
              <p 
                className="card-text mb-0 flex-grow-1"
                style={{ color: '#2D3508', opacity: 0.8, lineHeight: '1.6', fontSize: '1rem' }}
              >
                {description}
              </p>
              {!disabled && (
                <button
                  className="btn btn-link d-inline-flex align-items-center gap-2 p-0 text-decoration-none mt-auto feature-card-button"
                  style={{
                    width: 'fit-content',
                    padding: '0',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: '#2D3508',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <span className="feature-card-button-text">{learnMoreText}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </>
          ) : (
            /* All other cases (mobile or small cards): Button inline with subtitle */
            <div className={`d-flex flex-row align-items-start justify-content-between mb-0 ${isMobile ? 'feature-card-button-container-mobile' : 'gap-2 gap-md-3'}`}>
              <p 
                className="card-text mb-0 flex-grow-1"
                style={{ color: '#2D3508', opacity: 0.8, lineHeight: '1.6', fontSize: '1rem' }}
              >
                {description}
              </p>
              {!disabled && (
                <button
                  className={`btn btn-link d-inline-flex align-items-center gap-2 p-0 text-decoration-none flex-shrink-0 feature-card-button`}
                  style={{
                    width: 'fit-content',
                    padding: '0',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: '#2D3508',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <span className="feature-card-button-text">{learnMoreText}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Image Section */}
        {screenshot && (
          <div 
            className={`screenshot-container position-relative flex-shrink-0 overflow-hidden feature-card-image ${isFullWidth ? 'feature-card-image-fullwidth' : ''}`}
            onClick={onScreenshotClick ? handleScreenshotClick : undefined}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            style={{
              width: isFullWidth && !isMobile ? '70%' : '100%',
              height: isFullWidth && !isMobile ? '100%' : '300px',
              minHeight: isFullWidth && !isMobile ? '400px' : '300px',
              flex: isFullWidth && !isMobile ? '0 0 70%' : undefined
            }}
          >
            <ImageWithFallback 
              src={isHoveringImage && hoverGif ? hoverGif : screenshot}
              alt={`${title} screenshot`}
              className="w-100 h-100 object-fit-cover transition-transform"
              style={{ 
                transform: isHoveringImage ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease'
              }}
            />
            
            {onScreenshotClick && (
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ 
                  backgroundColor: isHoveringImage ? 'rgba(0,0,0,0.2)' : 'transparent',
                  transition: 'background-color 0.2s'
                }}
              >
                <div 
                  className="rounded-circle p-2 shadow transition-all"
                  style={{
                    opacity: isHoveringImage ? 1 : 0,
                    transform: isHoveringImage ? 'scale(1)' : 'scale(0.9)',
                    backgroundColor: '#FDFDFD'
                  }}
                >
                  <ZoomIn size={20} style={{ color: '#2D3508' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
