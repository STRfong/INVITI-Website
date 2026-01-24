import React, { useState } from 'react';
import { Calendar, Mail, Database } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { Locale, getTranslations } from '../../locales/translations';
import eventGif from '../../assets/Feature/創建活動_Gif版.gif';
import invitationImage from '../../assets/functions/一鍵邀請與追蹤出席狀況＿封面.webp';
import invitationGif from '../../assets/functions/一鍵邀請與追蹤出席狀況.gif';
import databaseImage from '../../assets/functions/貴賓資料庫＿封面.webp';

interface FeaturesSectionProps {
  isMobile?: boolean;
  onNavigate?: (path: string) => void;
  locale?: Locale;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ 
  isMobile = false, 
  onNavigate,
  locale = 'tc'
}) => {
  const t = getTranslations(locale);

  // Feature 1: Full width card for Row 1
  const feature1 = {
    id: 'event-session-management',
    icon: <Calendar size={24} style={{ color: '#2D3508' }} />,
    title: t.features.card1Title,
    description: t.features.card1Description,
    screenshot: eventGif
  };

  // Features 2 & 3: Side by side cards for Row 2
  const feature2 = {
    id: 'automated-invitations',
    icon: <Mail size={24} style={{ color: '#2D3508' }} />,
    title: t.features.card2Title,
    description: t.features.card2Description,
    screenshot: invitationImage,
    hoverGif: invitationGif
  };

  const feature3 = {
    id: 'guest-database',
    icon: <Database size={24} style={{ color: '#2D3508' }} />,
    title: t.features.card3Title,
    description: t.features.card3Description,
    screenshot: databaseImage
  };

  return (
    <>
      <section 
        id="features" 
        className="section-padding"
        style={{
          backgroundColor: '#2D3508',
          color: '#FDFDFD',
          borderTop: '1px solid rgba(255, 252, 235, 0.15)',
          borderBottom: '1px solid rgba(255, 252, 235, 0.15)'
        }}
      >
        <div className={isMobile ? 'container-fluid px-4' : 'container'}>
          {/* Section Header */}
          <div className="mb-5">
            <h2 
              className={`mb-3 ${isMobile ? 'text-start' : 'text-center'}`}
              style={{ color: '#FDFDFD' }}
            >
              {t.features.sectionTitle}
            </h2>
          </div>
          
          {/* Row 1: Full width card */}
          <div className="row g-4 mb-4">
            <div className="col-12">
              <FeatureCard
                icon={feature1.icon}
                title={feature1.title}
                description={feature1.description}
                screenshot={feature1.screenshot}
                onClick={() => onNavigate?.(`/features/${feature1.id}`)}
                isMobile={isMobile}
                learnMoreText={t.features.viewDetails}
                isFullWidth={true}
              />
            </div>
          </div>

          {/* Row 2: Two cards side by side */}
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <FeatureCard
                icon={feature2.icon}
                title={feature2.title}
                description={feature2.description}
                screenshot={feature2.screenshot}
                hoverGif={feature2.hoverGif}
                onClick={() => onNavigate?.(`/features/${feature2.id}`)}
                isMobile={isMobile}
                learnMoreText={t.features.viewDetails}
              />
            </div>
            <div className="col-12 col-md-6">
              <FeatureCard
                icon={feature3.icon}
                title={feature3.title}
                description={feature3.description}
                screenshot={feature3.screenshot}
                onClick={() => onNavigate?.(`/features/${feature3.id}`)}
                isMobile={isMobile}
                learnMoreText={t.features.viewDetails}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
