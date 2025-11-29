import React from 'react';

interface Section {
  heading?: string;
  body: string;
}

interface AboutPageProps {
  title: string;
  subtitle?: string;
  sections?: Section[];
  placeholder?: string;
  onBack?: () => void;
  isMobile?: boolean;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  title,
  subtitle,
  sections = [],
  placeholder = '內容即將更新，敬請期待。',
  onBack,
  isMobile = false
}) => {
  const hasSections = sections.length > 0;

  return (
    <div className={`min-h-screen bg-white ${isMobile ? 'p-3' : 'py-16 px-20'}`}>
      <div className={isMobile ? 'max-w-[343px]' : 'max-w-3xl mx-auto'}>
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-flex items-center gap-2"
          >
            ← 返回首頁
          </button>
        )}

        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h1>
          {subtitle && <p className="text-gray-600 leading-relaxed">{subtitle}</p>}
        </header>

        {hasSections ? (
          <div className="space-y-6">
            {sections.map((section, index) => (
              <p key={`paragraph-${index}`} className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

