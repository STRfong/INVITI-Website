import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { WireframeButton } from './WireframeButton';
import { parseMarkdown } from '../../utils/markdownParser';
// @ts-ignore - Vite handles ?raw imports
import cookiePolicyMd from '../../assets/Cookie/CookiePolicy.md?raw';

interface CookiePolicyPageProps {
  onBack: () => void;
  onManagePreferences: () => void;
  isMobile?: boolean;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({
  onBack,
  onManagePreferences,
  isMobile = false
}) => {
  const parsedContent = useMemo(() => {
    return parseMarkdown(cookiePolicyMd);
  }, []);

  return (
    <div className={`bg-white min-h-screen ${isMobile ? 'p-3' : 'py-16 px-20'}`}>
      <div className={isMobile ? 'max-w-[343px]' : 'max-w-3xl mx-auto'}>
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group focus:outline-none focus:ring-2 focus:ring-gray-400 rounded px-2 py-1 -ml-2"
        >
          <ArrowLeft size={isMobile ? 18 : 20} className="group-hover:-translate-x-1 transition-transform" />
          <span className={isMobile ? 'text-sm' : ''}>Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">

        </div>

        {/* Content */}
        <div 
          className="prose prose-gray max-w-none blog-content cookie-content"
          dangerouslySetInnerHTML={{ __html: parsedContent.content }}
        />
        <style>{`
          .cookie-content {
            color: #1f1f1f;
          }
          .cookie-content p {
            margin-bottom: 1.5rem;
            line-height: 1.6;
          }
          .cookie-content h2 {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1.4;
          }
          .cookie-content h3 {
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.4;
          }
          .cookie-content ul,
          .cookie-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          .cookie-content ul {
            list-style: none;
            padding-left: 0;
          }
          .cookie-content ul li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          .cookie-content ul li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #1f1f1f;
            font-weight: normal;
          }
          .cookie-content ol {
            list-style-type: decimal;
          }
          .cookie-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
            display: list-item;
          }
          /* Nested lists - preserve indentation */
          .cookie-content ol ul,
          .cookie-content ul ul,
          .cookie-content ol ol,
          .cookie-content ul ol {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding-left: 1.5rem;
          }
          .cookie-content ol ul {
            list-style: none;
            padding-left: 0;
          }
          .cookie-content ol ul li {
            position: relative;
            padding-left: 1.5rem;
          }
          .cookie-content ol ul li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #1f1f1f;
            font-weight: normal;
          }
          .cookie-content blockquote {
            margin: 2rem 0;
            padding: 1.25rem 1.5rem;
            border-left: 4px solid #e5e5e5;
            background-color: #f9f9f9;
            font-style: italic;
            color: #525252;
          }
          .cookie-content blockquote p {
            margin-bottom: 0;
          }
          .cookie-content a {
            color: #2D3508;
            text-decoration: underline;
            transition: color 200ms;
          }
          .cookie-content a:hover {
            color: #1A1F05;
          }
          .cookie-content hr {
            border: none;
            border-top: 1px solid rgb(162, 162, 162);
            margin: 2rem 0;
          }
        `}</style>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t-2 border-gray-300">
          <WireframeButton
            variant="secondary"
            size={isMobile ? 'sm' : 'md'}
            onClick={onManagePreferences}
          >
            Manage cookie preferences
          </WireframeButton>
        </div>
      </div>
    </div>
  );
};
