import React from 'react';
import { Locale, getTranslations } from '../../locales/translations';
import logo from '../../assets/logo.webp';
import logo_light from '../../assets/INVITI_Logo_Light.webp';

interface FooterSectionProps {
  isMobile?: boolean;
  locale?: Locale;
  onNavigate?: (path: string) => void;
  onNavigateToHelpCenter?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  isMobile = false, 
  locale = 'tc',
  onNavigate,
  onNavigateToHelpCenter
}) => {
  const t = getTranslations(locale);

  const handleHomeClick = () => {
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="border-0" style={{ backgroundColor: '#2D350B', color: '#FDFDFD' }}>
      <div className={isMobile ? 'container-fluid px-4 py-5' : 'container py-5'}>
        <div className="row g-5">
          
          {/* Logo Section */}
          <div className={`col-12 ${isMobile ? 'text-center mb-4' : 'col-lg-3 mb-0 d-flex justify-content-center'}`}>
            <img 
              src={logo_light} 
              alt="INVITI" 
              style={{ 
                height: isMobile ? '48px' : '114px', 
                width: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                filter: 'brightness(0) invert(1)'
              }} 
              className="img-fluid"
            />
          </div>

          {/* Columns Container */}
          <div className="col-10 col-lg-9 mx-auto">
            <div className="row g-4">
              {/* Column 1: Company */}
              <div className="col-12 col-md-4">
                <h6 className="mb-3 fw-bold" style={{ color: '#FDFDFD' }}>{t.footer.company}</h6>
                <div className="d-flex flex-column gap-2">
                  <button
                    onClick={() => onNavigate?.('/about')}
                    className="text-decoration-none small text-start bg-transparent border-0 p-0"
                    style={{ color: '#FDFDFD', opacity: 0.9 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    {t.footer.aboutUs}
                  </button>
                  <button
                    onClick={() => onNavigate?.('/terms')}
                    className="text-decoration-none small text-start bg-transparent border-0 p-0"
                    style={{ color: '#FDFDFD', opacity: 0.9 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    {t.footer.termsAndPrivacy}
                  </button>
                </div>
              </div>

              {/* Column 2: Resources */}
              <div className="col-12 col-md-4">
                <h6 className="mb-3 fw-bold" style={{ color: '#FDFDFD' }}>{t.footer.resources}</h6>
                <div className="d-flex flex-column gap-2">
                  <button 
                    onClick={onNavigateToHelpCenter} 
                    className="text-decoration-none small text-left bg-transparent border-0 p-0"
                    style={{ color: '#FDFDFD', opacity: 0.9 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    {t.footer.helpCenter}
                  </button>
                  <button 
                    onClick={() => onNavigate?.('/blog')} 
                    className="text-decoration-none small text-left bg-transparent border-0 p-0"
                    style={{ color: '#FDFDFD', opacity: 0.9 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                  >
                    {t.footer.blog}
                  </button>
                </div>
              </div>

              {/* Column 3: INVITI For */}
              <div className="col-12 col-md-4">
                <h6 className="mb-3 fw-bold" style={{ color: '#FDFDFD' }}>{t.footer.invitiFor}</h6>
                <div className="d-flex flex-column gap-2 small" style={{ color: '#FDFDFD', opacity: 0.9 }}>
                  <span>{t.footer.enterprise}</span>
                  <span>{t.footer.teams}</span>
                  <span className="mb-0">{t.footer.individuals}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: 'rgba(255, 252, 235, 0.25)' }} />

        <div className="text-center">
          <p className="small mb-0" style={{ color: '#FDFDFD', opacity: 0.8 }}>
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
