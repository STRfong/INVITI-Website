import React from 'react';
import { WireframeButton } from './WireframeButton';
import { Locale, getTranslations } from '../../locales/translations';
import { useIsMobile } from '../ui/use-mobile';

interface CookieBannerProps {
  isMobile?: boolean;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onManagePreferences: () => void;
  onViewPolicy: () => void;
  locale?: Locale;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  isMobile: isMobileProp = false,
  onAcceptAll,
  onRejectNonEssential,
  onManagePreferences,
  onViewPolicy,
  locale = 'tc'
}) => {
  const t = getTranslations(locale);
  // Auto-detect mobile using hook, use detected value as primary source
  // Prop can override if explicitly set to true (for forced mobile view in dev)
  const detectedMobile = useIsMobile();
  const isMobile = isMobileProp === true ? true : detectedMobile;
  
  return (
    <div className={`fixed-banner bg-white border-top shadow-sm ${isMobile ? 'px-4 py-4' : ''}`}>
      <div className={isMobile ? 'w-full' : 'container py-4'}>
        <div className={`${isMobile ? 'flex flex-col gap-3' : 'd-flex align-items-center justify-content-between gap-4'}`}>
          <p className={`mb-0 text-secondary ${isMobile ? 'text-sm text-center' : ''}`}>
            {t.cookieBanner.message}{' '}
            <button
              onClick={onViewPolicy}
              className={`btn btn-link p-0 text-dark ${isMobile ? 'text-sm' : ''}`}
              style={{ textDecoration: isMobile ? 'none' : 'underline' }}
            >
              {t.cookieBanner.cookiePolicy}
            </button>
          </p>

          <div className={`${isMobile ? 'flex flex-col w-full gap-2' : 'd-flex align-items-center gap-2'}`}>
            <WireframeButton
              variant="primary"
              size="sm"
              onClick={onAcceptAll}
              className={isMobile ? 'w-full' : ''}
            >
              {t.cookieBanner.acceptAll}
            </WireframeButton>
            <WireframeButton
              variant="secondary"
              size="sm"
              onClick={onManagePreferences}
              className={isMobile ? 'w-full' : ''}
            >
              {t.cookieBanner.managePreferences}
            </WireframeButton>
            <WireframeButton
              variant="secondary"
              size="sm"
              onClick={onRejectNonEssential}
              className={isMobile ? 'w-full' : ''}
            >
              {t.cookieBanner.rejectNonEssential}
            </WireframeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
