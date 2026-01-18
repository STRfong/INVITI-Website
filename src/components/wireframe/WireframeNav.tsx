import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { WireframeButton } from './WireframeButton';
import { LanguageDropdown } from './LanguageDropdown';
import { Locale, localeOptions, getTranslations } from '../../locales/translations';
import invitiLogo from '../../assets/INVITI_Logo.webp';
import inviti from '../../assets/INVITI.webp';

interface WireframeNavProps {
  isMobile?: boolean;
  locale?: Locale;
  onLocaleChange?: (locale: Locale) => void;
  onNavigateToHelpCenter?: () => void;
  onNavigate?: (path: string) => void;
  onSetScrollTarget?: (target: string) => void;
  enableResponsive?: boolean;
}

export const WireframeNav: React.FC<WireframeNavProps> = ({ 
  isMobile = false, 
  locale = 'tc',
  onLocaleChange,
  onNavigateToHelpCenter,
  onNavigate,
  onSetScrollTarget,
  enableResponsive = true
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(isMobile);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    if (!enableResponsive) {
      setIsMobileView(isMobile);
      return;
    }
    
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobileView(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [enableResponsive, isMobile]);
  
  // Handle scroll to add bottom border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const mobile = enableResponsive ? isMobileView : isMobile;
  
  const t = getTranslations(locale);
  const currentLocaleOption = localeOptions.find(opt => opt.code === locale) || localeOptions[0];
  
  // Smooth scroll to section with offset for sticky nav
  // If section doesn't exist on current page, navigate to home and set scroll target
  const handleSmoothScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Section exists on current page, scroll to it
      // Calculate NavStack height (Nav + Banner)
      const navHeight = 64; // h-16 = 64px
      const bannerHeight = isMobile ? 56 : 48;
      const sectionPadding = 100;
      const isBannerDismissed = localStorage.getItem('banner-dismissed') === 'true';
      const totalNavHeight = isBannerDismissed ? navHeight : navHeight + bannerHeight;
      
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - totalNavHeight + sectionPadding;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Section doesn't exist, navigate to home and set scroll target
      if (onSetScrollTarget && onNavigate) {
        onSetScrollTarget(sectionId);
        onNavigate('/');
      }
    }
  };
  
  const handleHomeClick = () => {
    // Check if we're already on the home page by looking for the home section
    const homeSection = document.getElementById('home');
    if (homeSection) {
      // Already on homepage, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Navigate to homepage
      onNavigate?.('/');
    }
  };

  const navItems = [
    { label: t.nav.home, url: '/', isExternal: false, action: handleHomeClick },
    { label: t.nav.features, url: '#features', isExternal: false, action: () => handleSmoothScroll('features') },
    { label: t.nav.blog, url: '/blog', isExternal: false, action: () => onNavigate?.('/blog') },
    // { label: t.nav.pricing, url: '#pricing', isExternal: false, action: () => handleSmoothScroll('pricing') },
    { label: t.nav.helpCenter, url: '#help-center', isExternal: false, action: onNavigateToHelpCenter }
  ];

  return (
    <nav 
      className="bg-light"
      style={{
        borderBottom: isScrolled ? '1px solid rgba(45, 53, 8, 0.15)' : 'none',
        transition: 'border-bottom 0.3s ease'
      }}
    >
      <div className={mobile ? 'container-fluid px-3 py-2' : 'container py-3'}>
        <div className="d-flex align-items-center justify-content-between">
          <button 
            onClick={handleHomeClick}
            className="btn btn-link text-dark p-0 border-0 opacity-hover"
          >
            <div className="d-flex align-items-center gap-2">
              <img src={invitiLogo} alt="INVITI Logo" style={{ height: '30px', width: 'auto', marginRight: '6px'}} />
              <img src={inviti} alt="INVITI" style={{ height: '16px', width: 'auto' }} />
            </div>
          </button>

          {!mobile && (
            <>
              <div className="d-none d-md-flex align-items-center gap-4">
                {navItems.map((item) => (
                  item.action ? (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="btn btn-link text-dark text-decoration-none px-0 position-relative nav-link-button"
                      style={{ 
                        paddingBottom: '4px',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {item.label}
                      <span 
                        className="position-absolute bottom-0 left-0 nav-link-underline"
                        style={{
                          height: '2px',
                          width: '0%',
                          backgroundColor: '#2D3508',
                          transition: 'width 0.3s ease',
                          borderRadius: '1px'
                        }}
                      />
                    </button>
                  ) : (
                    <a 
                      key={item.label} 
                      href={item.url}
                      className="text-dark text-decoration-none"
                    >
                      {item.label}
                    </a>
                  )
                ))}
              </div>

              <div className="d-none d-md-flex align-items-center gap-3">
                <div className="position-relative">
                  <button
                    onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                    className="btn btn-outline-dark d-flex align-items-center gap-2"
                    aria-label="Select language"
                  >
                    <Globe size={16} />
                    <span className="small">{currentLocaleOption.shortLabel}</span>
                    <ChevronDown size={14} className={languageDropdownOpen ? 'rotate-180' : ''} />
                  </button>
                  <LanguageDropdown
                    isOpen={languageDropdownOpen}
                    onClose={() => setLanguageDropdownOpen(false)}
                    currentLocale={locale}
                    onSelectLocale={(newLocale) => onLocaleChange?.(newLocale)}
                    isMobile={false}
                  />
                </div>
                
                <a href="https://app.inviti.vip" target="_blank" rel="noopener noreferrer">
                  <WireframeButton variant="secondary" size="sm">
                    {t.nav.login}
                  </WireframeButton>
                </a>
                <WireframeButton 
                  variant="primary" 
                  size="sm"
                  onClick={() => onNavigate?.('/booking')}
                >
                  {t.nav.tryForFree}
                </WireframeButton>
              </div>
            </>
          )}

          {mobile && (
            <button 
              className="btn d-flex align-items-center justify-content-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {mobile && mobileMenuOpen && (
          <div className="border-top mt-3 pt-3 bg-light">
            <div className="d-flex flex-column gap-3">
              {navItems.map((item) => (
                item.action ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action?.();
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-link text-start text-dark text-decoration-none"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a 
                    key={item.label} 
                    href={item.url}
                    className="text-dark text-decoration-none"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              
              <div>
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center gap-2">
                    <Globe size={16} />
                    <span className="small">{currentLocaleOption.label}</span>
                  </div>
                  <ChevronDown size={14} className={languageDropdownOpen ? 'rotate-180' : ''} />
                </button>
                <LanguageDropdown
                  isOpen={languageDropdownOpen}
                  onClose={() => setLanguageDropdownOpen(false)}
                  currentLocale={locale}
                  onSelectLocale={(newLocale) => {
                    onLocaleChange?.(newLocale);
                    setLanguageDropdownOpen(false);
                  }}
                  isMobile={true}
                />
              </div>
              
              <div className="d-flex flex-column gap-2">
                <a href="https://app.inviti.vip" target="_blank" rel="noopener noreferrer" className="w-100">
                  <WireframeButton variant="secondary" size="sm" className="w-100">
                    {t.nav.login}
                  </WireframeButton>
                </a>
                <WireframeButton 
                  variant="primary" 
                  size="sm" 
                  className="w-100"
                  onClick={() => {
                    onNavigate?.('/booking');
                    setMobileMenuOpen(false);
                  }}
                >
                  {t.nav.tryForFree}
                </WireframeButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
