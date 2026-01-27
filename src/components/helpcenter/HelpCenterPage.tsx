import React, { useState, useMemo } from 'react';
import { HCSearchBar } from './HCSearchBar';
import { HCSidebar } from './HCSidebar';
import { HCTopicCard } from './HCTopicCard';
import { HCSearchResults } from './HCSearchResults';
import { NavStack } from '../wireframe/NavStack';
import { FooterSection } from '../wireframe/FooterSection';
import { Locale, getTranslations } from '../../locales/translations';
import { Send, Eye, Tags } from 'lucide-react';
import { getAllInstructions, searchInstructions } from '../../utils/instructionData';
import { useIsMobile } from '../ui/use-mobile';

// Mapping of instruction titles (from filename) to their IDs
const instructionTitleToIdMap: Record<string, string> = {
  '操作說明＿貴賓出席名單管理及邀約': '操作說明＿貴賓出席名單管理及邀約',
  '操作說明＿貴賓資料庫管理': '操作說明＿貴賓資料庫管理',
  '操作說明＿信件模板管理': '操作說明＿信件模板管理',
};

// Helper function to generate ID from filename title
function generateIdFromFilenameTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .substring(0, 100);
}

// Helper function to find instruction path with anchor
function findInstructionPathWithAnchor(instructionTitle: string, anchor?: string): string {
  const instructions = getAllInstructions();
  
  // Generate ID from filename title
  const expectedId = generateIdFromFilenameTitle(instructionTitle);
  const instruction = instructions.find(inst => inst.id === expectedId);
  
  if (!instruction) {
    // Fallback: try to find by title match
    const fallbackInstruction = instructions.find(inst => 
      inst.title.includes(instructionTitle.replace(/^操作說明＿/, '')) ||
      instructionTitle.includes(inst.title)
    );
    
    if (fallbackInstruction) {
      let path = `/instruction/${encodeURIComponent(fallbackInstruction.id)}`;
      if (anchor) {
        const anchorId = anchor
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\u4e00-\u9fff-]/g, '')
          .replace(/[？?！!。，,]/g, '');
        path += `#${anchorId}`;
      }
      return path;
    }
    
    return '/help-center';
  }
  
  let path = `/instruction/${encodeURIComponent(instruction.id)}`;
  
  // Add anchor if provided
  if (anchor) {
    // Convert anchor to URL-friendly format (matching markdownParser logic)
    const anchorId = anchor
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '')
      .replace(/[？?！!。，,]/g, '');
    path += `#${anchorId}`;
  }
  
  return path;
}



interface HelpCenterPageProps {
  locale?: Locale;
  isMobile?: boolean;
  onBack?: () => void;
  onNavigate?: (path: string) => void;
  onLocaleChange?: (locale: Locale) => void;
  onScrollToPricing?: (focusCard?: 'free' | 'basic' | 'pro' | 'enterprise') => void;
  onSetScrollTarget?: (target: string) => void;
}

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ 
  locale = 'tc',
  isMobile: isMobileProp = false,
  onBack,
  onNavigate,
  onLocaleChange,
  onScrollToPricing,
  onSetScrollTarget
}) => {
  const t = getTranslations(locale);
  
  // Auto-detect mobile using hook
  const detectedMobile = useIsMobile();
  const isMobile = isMobileProp === true ? true : detectedMobile;
  
  const [searchQuery, setSearchQuery] = useState('');

  // Perform search when query changes
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      return [];
    }
    return searchInstructions(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleResultClick = (instructionId: string, lineNumber?: number) => {
    const path = `/instruction/${encodeURIComponent(instructionId)}`;
    onNavigate?.(path);
  };

  // Popular topics with links to specific sections
  const topics = [
    {
      icon: Send,
      title: '發送您的第一封邀請',
      description: '了解如何建立和發送您的第一封活動邀請信',
      instructionTitle: '操作說明＿貴賓出席名單管理及邀約',
      anchor: '如何進行邀約'
    },
    {
      icon: Eye,
      title: '匯入貴賓名單',
      description: '快速批量匯入貴賓名單與聯絡資訊',
      instructionTitle: '操作說明＿貴賓資料庫管理',
      anchor: '如何批量匯入貴賓資料？'
    },
    {
      icon: Tags,
      title: '自訂信件範本',
      description: '建立客製化的信件內容',
      instructionTitle: '操作說明＿信件模板管理',
      anchor: '如何建立信件模板？'
    }
  ];

  // Tags removed per user request
  const tags: string[] = [];

  // Help Center is always the current page, so no-op
  const handleNavigateToHelpCenter = () => {
    // Already on Help Center page, scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDFDFD' }}>
      {/* Global Navigation Stack (Fixed) */}
      <NavStack
        isMobile={isMobile}
        locale={locale}
        onLocaleChange={onLocaleChange}
        onNavigateToHelpCenter={handleNavigateToHelpCenter}
        onNavigate={onNavigate}
        onSetScrollTarget={onSetScrollTarget}
        showBanner={true}
      />

      {/* Header Section - with top padding for fixed NavStack */}
      <div 
        className={`${isMobile ? 'pt-12 pb-6' : 'px-6 py-6 pt-[112px] pb-12'}`}
        style={{ backgroundColor: '#2D3508' }}
      >
        <div className={`max-w-[1120px] mx-auto ${isMobile ? 'px-6' : ''}`}>
          <h1 className={`mb-6 ${isMobile ? 'text-2xl' : 'text-3xl'}`} style={{ color: '#FDFDFD' }}>
            {t.helpCenterPage.title}
          </h1>
          
          {/* Search Bar */}
          <div className={isMobile ? 'my-3' : 'my-4'}>
            <HCSearchBar 
              placeholder={t.helpCenterPage.searchPlaceholder}
              isMobile={isMobile}
              onSearch={handleSearch}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={isMobile ? 'pb-8' : 'px-6 pt-12 pb-5'}>
        <div className="max-w-[1120px] mx-auto">
          <div className={isMobile ? 'flex flex-col' : 'flex gap-12'}>
            {/* Desktop Sidebar */}
            {!isMobile && (
              <HCSidebar 
                locale={locale} 
                isMobile={isMobile}
                onNavigate={onNavigate}
              />
            )}

            {/* Mobile Sidebar - collapsible, shown in content flow */}
            {isMobile && (
              <div className="border-b border-gray-200">
                <HCSidebar 
                  locale={locale} 
                  isMobile={isMobile}
                  onNavigate={onNavigate}
                />
              </div>
            )}

            {/* Main Content */}
            <main className={`flex-1 ${isMobile ? 'px-6 pt-6' : ''}`}>
              {/* Show search results if there's a query */}
              {searchQuery.trim().length > 0 ? (
                <div className={isMobile ? 'mt-0' : ''}>
                  <HCSearchResults
                    results={searchResults}
                    query={searchQuery}
                    isMobile={isMobile}
                    onResultClick={handleResultClick}
                  />
                </div>
              ) : (
                /* Popular Topics - only show when not searching */
                <div className={isMobile ? 'mb-8 mt-4' : 'mb-12'}>
                  <h2 className={`text-gray-900 leading-[140%] ${isMobile ? 'mb-4 text-xl' : 'mb-6 text-2xl'}`}>
                    {t.helpCenterPage.popularTopics}
                  </h2>
                  
                  <div className={`grid gap-4 items-start ${
                    isMobile ? 'grid-cols-1' : 'mt-6 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {topics.map((topic, index) => (
                      <HCTopicCard
                        key={index}
                        icon={topic.icon}
                        title={topic.title}
                        description={topic.description}
                        isMobile={isMobile}
                        onClick={() => {
                          const path = findInstructionPathWithAnchor(topic.instructionTitle, topic.anchor);
                          onNavigate?.(path);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Block - Removed per user request */}
            </main>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <FooterSection 
        locale={locale}
        isMobile={isMobile}
        onNavigate={onNavigate}
        onNavigateToHelpCenter={handleNavigateToHelpCenter}
      />
    </div>
  );
};
