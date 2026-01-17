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
  const [titleFirstLine, ...titleRestParts] = t.hero.title.split('，');
  const titleSecondLine = titleRestParts.join('，');
  
  return (
    <section id="home" className="bg-background section-padding">
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
              <p className="text-muted lead">{t.hero.subtitle}</p>
              <div
                className="d-flex flex-column flex-sm-row gap-3 pt-2 justify-content-center"
                style={{ maxWidth: isMobile ? '100%' : '280px' }}
              >
                <WireframeButton 
                  variant="primary" 
                  className="w-100 w-sm-auto px-4"
                  onClick={() => onNavigate?.('/booking')}
                >
                  {t.hero.bookDemo}
                </WireframeButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
