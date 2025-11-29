import React, { useState } from 'react';
import { Calendar, Mail, Database } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { Locale, getTranslations } from '../../locales/translations';

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

  // 3 main feature cards
  const features = [
    {
      id: 'event-session-management',
      icon: <Calendar size={22} className="text-dark" />,
      title: t.features.card1Title,
      description: t.features.card1Description,
      screenshot: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGRhc2hib2FyZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjE4MTI4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'automated-invitations',
      icon: <Mail size={22} className="text-dark" />,
      title: t.features.card2Title,
      description: t.features.card2Description,
      screenshot: 'https://images.unsplash.com/photo-1584543515885-b8981dbf0b5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMGF1dG9tYXRpb24lMjBzeXN0ZW18ZW58MXx8fHwxNzYxODEyODkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'guest-database',
      icon: <Database size={22} className="text-dark" />,
      title: t.features.card3Title,
      description: t.features.card3Description,
      screenshot: 'https://images.unsplash.com/photo-1740560051533-3acef26ace95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMGNvbnRhY3RzJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NjE4MTI4OTN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ] as const;

  return (
    <>
      <section 
        id="features" 
        className="section-padding bg-light border-top border-bottom"
      >
        <div className={isMobile ? 'container-fluid px-4' : 'container'}>
          {/* Section Header */}
          <div className="mb-5">
            <h2 className={`mb-3 ${isMobile ? 'text-start' : 'text-center'}`}>
              {t.features.sectionTitle}
            </h2>
          </div>
          
          {/* Standard Grid */}
          <div className="row g-4">
            {features.map((feature) => (
              <div key={feature.id} className="col-12 col-md-6 col-lg-4">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  screenshot={feature.screenshot}
                  onClick={() => onNavigate?.(`/features/${feature.id}`)}
                  isMobile={isMobile}
                  learnMoreText={t.features.viewDetails}
                />
              </div>
            ))}
          </div>

          
        </div>
      </section>

    </>
  );
};
