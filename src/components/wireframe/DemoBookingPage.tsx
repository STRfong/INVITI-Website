import React from 'react';
import { WireframeButton } from './WireframeButton';
import { NavStack } from './NavStack';
import { FooterSection } from './FooterSection';
import { Locale, getTranslations } from '../../locales/translations';
import { Settings, MessageSquare, Calendar } from 'lucide-react';

interface DemoBookingPageProps {
  isMobile?: boolean;
  locale?: Locale;
  onNavigate?: (path: string) => void;
  onLocaleChange?: (locale: Locale) => void;
  onScrollToPricing?: () => void;
  onSetScrollTarget?: (target: string) => void;
}

const GOOGLE_CALENDAR_URL = 'https://calendar.app.google/tYrJgzbLhGuS5cjC8';

export const DemoBookingPage: React.FC<DemoBookingPageProps> = ({ 
  isMobile = false, 
  locale = 'tc',
  onNavigate,
  onLocaleChange,
  onScrollToPricing,
  onSetScrollTarget
}) => {
  const t = getTranslations(locale);

  const handleNavigateToHelpCenter = () => {
    if (onNavigate) {
      onNavigate('/help-center');
    }
  };

  const coverCards = [
    {
      icon: Settings,
      title: t.demoBooking.card1Title,
      description: t.demoBooking.card1Description,
    },
    {
      icon: MessageSquare,
      title: t.demoBooking.card2Title,
      description: t.demoBooking.card2Description,
    },
    {
      icon: Calendar,
      title: t.demoBooking.card3Title,
      description: t.demoBooking.card3Description,
    },
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-white">
        <NavStack
          isMobile={isMobile}
          locale={locale}
          onLocaleChange={onLocaleChange}
          onNavigateToHelpCenter={handleNavigateToHelpCenter}
          onNavigate={onNavigate}
          onSetScrollTarget={onSetScrollTarget}
          showBanner={true}
        />
        
        {/* Hero Section */}
        <section className="pt-[120px] pb-8 px-6 bg-white border-b border-gray-200">
          <div className="max-w-[343px] mx-auto space-y-4">
            <h1 className="leading-[140%]">{t.demoBooking.title}</h1>
            <p className="text-gray-600 leading-[150%]">{t.demoBooking.subtitle}</p>
            <WireframeButton 
              variant="primary" 
              className="w-full"
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.demoBooking.ctaButton}
            </WireframeButton>
            <p className="text-sm text-gray-500 text-center leading-[150%]">
              {t.demoBooking.fallbackEmail}
            </p>
          </div>
        </section>

        {/* Meeting Content */}
        <section className="py-8 px-6">
          <div className="max-w-[343px] mx-auto space-y-4">
            <h3 className="leading-[140%]">{t.demoBooking.coverTitle}</h3>
            <div className="space-y-3">
              {coverCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div 
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <h4 className="text-gray-900 leading-[140%]">{card.title}</h4>
                        <p className="text-sm text-gray-600 leading-[150%]">{card.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FooterSection
          isMobile={isMobile}
          locale={locale}
          onNavigate={onNavigate}
          onNavigateToHelpCenter={handleNavigateToHelpCenter}
        />
      </div>
    );
  }

  // Desktop/Tablet Layout
  return (
    <div className="min-h-screen bg-white">
      <NavStack
        isMobile={isMobile}
        locale={locale}
        onLocaleChange={onLocaleChange}
        onNavigateToHelpCenter={handleNavigateToHelpCenter}
        onNavigate={onNavigate}
        onSetScrollTarget={onSetScrollTarget}
        showBanner={true}
      />
      
      {/* Hero Section */}
      <section className="pt-[112px] pb-16 bg-white border-b border-gray-200">
        <div className="max-w-[960px] mx-auto px-20 text-center space-y-6">
          <h1 className="leading-[140%]">{t.demoBooking.title}</h1>
          <p className="text-gray-600 leading-[150%] max-w-[720px] mx-auto">
            {t.demoBooking.subtitle}
          </p>
          <div className="pt-4">
            <WireframeButton 
              variant="primary" 
              className="min-w-[240px]"
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.demoBooking.ctaButton}
            </WireframeButton>
          </div>
          <p className="text-sm text-gray-500 leading-[150%]">
            {t.demoBooking.fallbackEmail}
          </p>
        </div>
      </section>

      {/* Meeting Content */}
      <section className="py-16 px-20">
        <div className="max-w-[1120px] mx-auto space-y-8">
          <h2 className="text-center leading-[140%]">{t.demoBooking.coverTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6 pt-4">
            {coverCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div 
                  key={index}
                  className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="space-y-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                    <div className="space-y-2">
                      <h3 className="leading-[140%]">{card.title}</h3>
                      <p className="text-gray-600 leading-[150%]">{card.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FooterSection
        isMobile={isMobile}
        locale={locale}
        onNavigate={onNavigate}
        onNavigateToHelpCenter={handleNavigateToHelpCenter}
      />
    </div>
  );
};
