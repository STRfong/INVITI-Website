import React from 'react';
import { WireframeButton } from './WireframeButton';
import { Locale, getTranslations } from '../../locales/translations';

interface HeroSectionProps {
  isMobile?: boolean;
  locale?: Locale;
  onNavigate?: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isMobile = false, locale = 'tc', onNavigate }) => {
  const t = getTranslations(locale);
  
  return (
    <section id="home" className="bg-white section-padding">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column gap-3">
              <h1 className="display-6 fw-medium">{t.hero.title}</h1>
              <p className="text-muted lead">{t.hero.subtitle}</p>
              <div className="d-flex flex-column flex-sm-row gap-3 pt-2">
                <WireframeButton 
                  variant="primary" 
                  className="w-100"
                  onClick={() => onNavigate?.('/booking')}
                >
                  {t.hero.bookDemo}
                </WireframeButton>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="bg-light border rounded d-flex align-items-center justify-content-center" style={{ minHeight: isMobile ? '240px' : '320px' }}>
              <span className="text-secondary">Hero Illustration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
