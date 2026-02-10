import React, { useMemo, useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Locale, getTranslations } from '../../locales/translations';
import { NavStack } from '../wireframe/NavStack';
import { FooterSection } from '../wireframe/FooterSection';
import { getInstructionById, getAllInstructions, getInstructionContent } from '../../utils/instructionData';
import { parseMarkdown, extractH2Headings } from '../../utils/markdownParser';
import { useIsMobile } from '../ui/use-mobile';
import { HCSidebar } from './HCSidebar';
import { removeBasePath } from '../../utils/routing';

// Import all instruction images using Vite's glob
// @ts-ignore
const instructionImages = import.meta.glob('../../assets/Instruction/img/*', { 
  as: 'url',
  eager: true 
}) as Record<string, string>;

interface InstructionPostPageProps {
  locale?: Locale;
  isMobile?: boolean;
  onNavigate?: (path: string) => void;
  onLocaleChange?: (locale: Locale) => void;
  onScrollToPricing?: (focusCard?: 'free' | 'basic' | 'pro' | 'enterprise') => void;
  onSetScrollTarget?: (target: string) => void;
}

export const InstructionPostPage: React.FC<InstructionPostPageProps> = ({ 
  locale = 'tc', 
  isMobile: isMobileProp = false,
  onNavigate,
  onLocaleChange,
  onScrollToPricing,
  onSetScrollTarget
}) => {
  const t = getTranslations(locale);
  
  // Auto-detect mobile using hook
  const detectedMobile = useIsMobile();
  const isMobile = isMobileProp === true ? true : detectedMobile;

  // Get instruction ID and anchor from URL
  const [instructionId, setInstructionId] = useState(() => {
    const path = removeBasePath(window.location.pathname);
    const match = path.match(/\/instruction\/(.+)/);
    if (!match) return '';
    
    const rawId = match[1];
    try {
      return decodeURIComponent(rawId);
    } catch (e) {
      return rawId;
    }
  });

  const [anchor, setAnchor] = useState(() => {
    const h = window.location.hash.slice(1);
    if (!h) return '';
    try {
      return decodeURIComponent(h);
    } catch {
      return h;
    }
  });

  // Listen for URL changes
  useEffect(() => {
    const updateInstructionId = () => {
      const path = removeBasePath(window.location.pathname);
      const match = path.match(/\/instruction\/(.+)/);
      if (!match) {
        setInstructionId('');
        return;
      }
      
      const rawId = match[1];
      try {
        const decodedId = decodeURIComponent(rawId);
        setInstructionId(decodedId);
      } catch (e) {
        setInstructionId(rawId);
      }
      
      // Update anchor from hash
      const hash = window.location.hash.slice(1);
      setAnchor(hash);
    };

    window.addEventListener('popstate', updateInstructionId);
    window.addEventListener('hashchange', updateInstructionId);
    
    let lastPath = window.location.pathname;
    const checkPath = () => {
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      if (currentPath !== lastPath || currentHash !== window.location.hash) {
        lastPath = currentPath;
        updateInstructionId();
      }
    };
    
    const intervalId = setInterval(checkPath, 50);

    return () => {
      window.removeEventListener('popstate', updateInstructionId);
      window.removeEventListener('hashchange', updateInstructionId);
      clearInterval(intervalId);
    };
  }, []);

  // Scroll to anchor or top when instructionId changes (including first load with hash)
  useEffect(() => {
    if (!instructionId) return;

    const rawHash = window.location.hash.slice(1);
    let hash = '';
    if (rawHash) {
      try {
        hash = decodeURIComponent(rawHash);
      } catch {
        hash = rawHash;
      }
    }
    setAnchor(hash);

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Content is rendered via dangerouslySetInnerHTML; on first load the DOM may not be ready.
    // Poll for the element and scroll when it appears (or give up after ~2s).
    const navHeight = 64;
    const backButtonSectionHeight = isMobile ? 48 : 72;
    const totalOffset = navHeight + backButtonSectionHeight;

    const scrollToAnchor = () => {
      const element =
        document.getElementById(hash) ||
        document.querySelector(`[data-anchor="${hash}"]`);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - totalOffset - 20;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return true;
      }
      return false;
    };

    let attempts = 0;
    const maxAttempts = 40; // 40 * 50ms = 2s
    const intervalId = setInterval(() => {
      attempts += 1;
      if (scrollToAnchor() || attempts >= maxAttempts) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [instructionId, isMobile]);

  // Get instruction data
  const instructionData = useMemo(() => {
    if (!instructionId) return null;
    
    const metadata = getInstructionById(instructionId);
    if (!metadata) return null;

    const markdownContent = getInstructionContent(metadata.markdownPath);
    if (!markdownContent) return null;

    const parsed = parseMarkdown(markdownContent);
    const headings = extractH2Headings(markdownContent);
    
    // Fix image paths in the HTML content
    let content = parsed.content;
    
    // Replace image paths with proper Vite asset URLs
    content = content.replace(/<img data-instruction-image="([^"]+)"[^>]*>/g, (match, filename) => {
      // Find the image in the glob import
      // The glob keys are like: ../../assets/Instruction/img/filename.png
      let imageKey: string | undefined;
      let imageUrl: string | undefined;
      
      // Handle Vite glob return value - it might be a function or a string
      const getImageUrl = (key: string): string | undefined => {
        const value = instructionImages[key];
        if (typeof value === 'string') {
          return value;
        }
        if (typeof value === 'function') {
          // This shouldn't happen with eager: true, but handle it just in case
          return undefined;
        }
        return undefined;
      };
      
      // Try exact match first
      imageKey = Object.keys(instructionImages).find(key => {
        const keyFilename = key.split('/').pop() || '';
        return keyFilename === filename;
      });
      
      if (imageKey) {
        imageUrl = getImageUrl(imageKey);
      }
      
      if (!imageUrl) {
        // Try case-insensitive match
        imageKey = Object.keys(instructionImages).find(key => {
          const keyFilename = key.split('/').pop() || '';
          return keyFilename.toLowerCase() === filename.toLowerCase();
        });
        
        if (imageKey) {
          imageUrl = getImageUrl(imageKey);
        }
      }
      
      if (!imageUrl) {
        // Try partial match (for cases like "場次邀請表單 1.png" -> "場次邀請表單.png")
        const filenameBase = filename.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
        imageKey = Object.keys(instructionImages).find(key => {
          const keyFilename = key.split('/').pop() || '';
          const keyBase = keyFilename.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
          // Check if the base names match (ignoring trailing numbers/spaces)
          const normalizedKeyBase = keyBase.replace(/\s+\d+$/, '').trim();
          const normalizedFilenameBase = filenameBase.replace(/\s+\d+$/, '').trim();
          return normalizedKeyBase === normalizedFilenameBase || 
                 keyBase.includes(filenameBase) || 
                 filenameBase.includes(keyBase);
        });
        
        if (imageKey) {
          imageUrl = getImageUrl(imageKey);
        }
      }
      
      if (imageUrl) {
        // Replace or add the src attribute with the correct URL
        if (match.includes('src=')) {
          return match.replace(/src="[^"]+"/, `src="${imageUrl}"`);
        } else {
          return match.replace(/>/, ` src="${imageUrl}">`);
        }
      }
      
      // If not found, log warning with debug info
      console.warn(`Image not found in glob: ${filename}`);
      if (process.env.NODE_ENV === 'development') {
        console.warn('Available image keys:', Object.keys(instructionImages).map(k => k.split('/').pop()));
        console.warn('Looking for filename:', filename);
        console.warn('Glob object:', instructionImages);
      }
      
      // Return image tag with empty src (will show broken image icon)
      // This is better than returning the original match without src
      return match.replace(/>/, ` src="" alt="Image not found: ${filename}">`);
    });
    
    return {
      id: metadata.id,
      title: metadata.title,
      content,
      headings
    };
  }, [instructionId]);

  // If instruction not found, show error
  if (!instructionData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-gray-600">操作說明未找到</p>
        <button
          onClick={() => onNavigate?.('/help-center')}
          className="mt-4 text-sm text-gray-900 hover:text-gray-700"
        >
          返回操作說明
        </button>
      </div>
    );
  }

  const instruction = instructionData;

  const handleNavigateToHelpCenter = () => {
    if (onNavigate) {
      onNavigate('/help-center');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation Stack */}
      <NavStack
        locale={locale} 
        isMobile={isMobile}
        onNavigate={onNavigate}
        onLocaleChange={onLocaleChange}
        onNavigateToHelpCenter={handleNavigateToHelpCenter}
        onSetScrollTarget={onSetScrollTarget}
        showBanner={true}
      />

      {/* Main Content */}
      <main className={isMobile ? 'flex-1 pt-2' : 'flex-1 pt-8'}>
        {/* Back to Help Center */}
        <div className={`border-b border-gray-200 ${isMobile ? 'py-3 px-4' : 'py-6'}`}>
          <div className={`${isMobile ? '' : 'max-w-[1280px] mx-auto px-6'}`}>
            <button
              onClick={() => onNavigate?.('/help-center')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors active:opacity-70"
            >
              <ArrowLeft size={isMobile ? 12 : 16} />
              <span className="text-sm sm:text-base">返回操作說明</span>
            </button>
          </div>
        </div>

        {/* Article with Sidebar */}
        <div className={isMobile ? 'py-6' : 'py-12'}>
          <div className={`${isMobile ? '' : 'max-w-[1280px] mx-auto px-6'}`}>
            <div className={isMobile ? 'flex flex-col' : 'flex gap-12'}>
              {/* Sidebar Navigation */}
              <HCSidebar 
                locale={locale} 
                isMobile={isMobile}
                onNavigate={onNavigate}
                currentInstructionId={instructionId}
                headings={instructionData.headings}
              />

              {/* Article Content */}
              <article className={`flex-1 ${isMobile ? 'px-4' : ''}`}>
                <div className={isMobile ? '' : 'max-w-[800px]'}>
                  {/* Title */}
                  <h1 className={isMobile ? 'mt-4 mb-4 text-2xl leading-tight' : 'mb-6'}>{instruction.title}</h1>

                  {/* Content */}
                  <div 
                    className={`prose prose-gray max-w-none blog-content ${isMobile ? 'prose-sm' : ''}`}
                    dangerouslySetInnerHTML={{ __html: instruction.content }}
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterSection 
        locale={locale} 
        isMobile={isMobile}
        onNavigate={onNavigate}
        onNavigateToHelpCenter={handleNavigateToHelpCenter}
      />
    </div>
  );
};

