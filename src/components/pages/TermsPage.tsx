import React, { useMemo } from 'react';
import { parseMarkdown } from '../../utils/markdownParser';
// @ts-ignore - Vite handles ?raw imports
import privacyPolicyMd from '../../assets/Term/隱私權政策.md?raw';

interface TermsPageProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  isMobile?: boolean;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  title = '隱私權政策',
  subtitle,
  onBack,
  isMobile = false
}) => {
  const parsedContent = useMemo(() => {
    return parseMarkdown(privacyPolicyMd);
  }, []);

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

        <div 
          className="prose prose-gray max-w-none blog-content terms-content"
          dangerouslySetInnerHTML={{ __html: parsedContent.content }}
        />
        <style>{`
          .terms-content {
            color: #1f1f1f;
          }
          .terms-content p {
            margin-bottom: 1.5rem;
            line-height: 1.6;
          }
          .terms-content h2 {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1.4;
          }
          .terms-content h3 {
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.4;
          }
          .terms-content ul,
          .terms-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          .terms-content ul {
            list-style: none;
            padding-left: 0;
          }
          .terms-content ul li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          .terms-content ul li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #1f1f1f;
            font-weight: normal;
          }
          .terms-content ol {
            list-style-type: decimal;
          }
          .terms-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
            display: list-item;
          }
          /* Nested lists - preserve indentation */
          .terms-content ol ul,
          .terms-content ul ul,
          .terms-content ol ol,
          .terms-content ul ol {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            padding-left: 1.5rem;
          }
          .terms-content ol ul {
            list-style: none;
            padding-left: 0;
          }
          .terms-content ol ul li {
            position: relative;
            padding-left: 1.5rem;
          }
          .terms-content ol ul li:before {
            content: "•";
            position: absolute;
            left: 0;
            color: #1f1f1f;
            font-weight: normal;
          }
          .terms-content blockquote {
            margin: 2rem 0;
            padding: 1.25rem 1.5rem;
            border-left: 4px solid #e5e5e5;
            background-color: #f9f9f9;
            font-style: italic;
            color: #525252;
          }
          .terms-content blockquote p {
            margin-bottom: 0;
          }
          .terms-content a {
            color: #2D3508;
            text-decoration: underline;
            transition: color 200ms;
          }
          .terms-content a:hover {
            color: #1A1F05;
          }
          .terms-content hr {
            border: none;
            border-top: 1px solid rgb(162, 162, 162);
            margin: 2rem 0;
          }
        `}</style>
      </div>
    </div>
  );
};

