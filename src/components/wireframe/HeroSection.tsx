import React from 'react';
import { ChevronDown } from 'lucide-react';
import { WireframeButton } from './WireframeButton';
import { Locale, getTranslations } from '../../locales/translations';

interface HeroSectionProps {
  isMobile?: boolean;
  locale?: Locale;
  onNavigate?: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isMobile = false, locale = 'tc', onNavigate }) => {
  const t = getTranslations(locale);
  const [titleFirstLine, ...titleRestParts] = t.hero.title.split('，');
  const titleSecondLine = titleRestParts.join('，');
  
  const handleScrollDown = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      const navHeight = 64;
      const sectionPadding = 100;
      const elementPosition = featuresSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight + sectionPadding;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section id="home" className="bg-background section-padding position-relative">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column align-items-center gap-3">
              <h1 className="display-6 fw-medium">
                {titleFirstLine}
                {titleSecondLine && (
                  <>
                    ，
                    <br />
                    {titleSecondLine}
                  </>
                )}
              </h1>
              <p 
                className="lead"
                style={{
                  fontSize: '1.375rem',
                  fontWeight: 400,
                  color: '#2D3508ee',
                  marginBottom: '0.5rem'
                }}
              >
                {t.hero.subtitle}
              </p>
              <div
                className="d-flex flex-column flex-sm-row gap-3 pt-2 justify-content-center"
                style={{ maxWidth: isMobile ? '100%' : '280px' }}
              >
                <WireframeButton 
                  variant="primary" 
                  size="md"
                  className="w-100 w-sm-auto"
                  onClick={() => onNavigate?.('/booking')}
                >
                  {t.hero.bookDemo}
                </WireframeButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Arrow */}
      <div 
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4 pb-4"
        style={{ cursor: 'pointer' }}
        onClick={handleScrollDown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleScrollDown();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Scroll down"
      >
        <ChevronDown 
          size={32} 
          className="scroll-down-arrow"
          style={{ color: '#2D3508', opacity: 0.6 }}
        />
      </div>
    </section>
  );
};
