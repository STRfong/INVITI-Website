import React, { useState, useEffect } from 'react';
import { HCSidebarItem } from './HCSidebarItem';
import { Locale, getTranslations } from '../../locales/translations';
import { ChevronDown } from 'lucide-react';
import { getAllInstructions } from '../../utils/instructionData';
import { Heading } from '../../utils/markdownParser';

interface HCSidebarProps {
  locale?: Locale;
  isMobile?: boolean;
  onNavigate?: (path: string) => void;
  currentInstructionId?: string;
  headings?: Heading[];
}

export const HCSidebar: React.FC<HCSidebarProps> = ({ 
  locale = 'tc',
  isMobile = false,
  onNavigate,
  currentInstructionId,
  headings
}) => {
  const t = getTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState<string>('');

  // Track active heading based on scroll position
  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const handleScroll = () => {
      const navHeight = 64;
      const backButtonSectionHeight = isMobile ? 48 : 72; // py-3 (24px) + button on mobile, py-6 (48px) + button on desktop
      const totalOffset = navHeight + backButtonSectionHeight;
      const scrollOffset = window.pageYOffset + totalOffset + 100; // 100px offset for better UX

      // Find the heading that's currently in view
      let currentHeading = '';
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id) || 
                       document.querySelector(`[data-anchor="${heading.id}"]`);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          if (elementTop <= scrollOffset) {
            currentHeading = heading.id;
            break;
          }
        }
      }

      if (currentHeading && currentHeading !== activeHeading) {
        setActiveHeading(currentHeading);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, isMobile, activeHeading]);


  const handleCategoryClick = (id: string) => {
    if (!onNavigate) return;
    onNavigate(`/instruction/${encodeURIComponent(id)}`);
  };

  const handleHeadingClick = (headingId: string) => {
    setActiveHeading(headingId);
    // Scroll to the heading element
    setTimeout(() => {
      const element = document.getElementById(headingId) || 
                     document.querySelector(`[data-anchor="${headingId}"]`);
      if (element) {
        const navHeight = 64;
        const backButtonSectionHeight = isMobile ? 48 : 72; // py-3 (24px) + button on mobile, py-6 (48px) + button on desktop
        const totalOffset = navHeight + backButtonSectionHeight;
        
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - totalOffset - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
    
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Get all instructions and create categories
  const instructions = getAllInstructions();
  
  // Define order by generating IDs from expected filenames
  const instructionOrderIds = [
    '操作說明＿名詞定義',
    '操作說明＿基礎操作',
    '操作說明＿活動及場次管理',
    '操作說明＿貴賓出席名單管理及邀約',
    '操作說明＿信件模板管理',
    '操作說明＿角色管理及角色分派',
    '幫助中心＿邀請人管理',
    '操作說明＿票務分派',
    '操作說明＿貴賓資料庫管理',
    '操作說明＿標籤管理'
  ].map(title => {
    // Generate ID from filename title (same logic as instructionData)
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '')
      .substring(0, 100);
  });
  
  const categories = instructionOrderIds
    .map(id => {
      const instruction = instructions.find(inst => inst.id === id);
      if (!instruction) return null;
      
      // Display the title from markdown (which doesn't have "操作說明＿" prefix)
      const displayName = instruction.title;
      
      return {
        label: displayName,
        title: instruction.title,
        id: instruction.id,
        hasChildren: false
      };
    })
    .filter((cat): cat is NonNullable<typeof cat> => cat !== null);

  // Check if we're on a page with headings
  const hasHeadingsForCurrentPage = !!(headings && headings.length > 0 && currentInstructionId);

  if (isMobile) {
    return (
      <div className="w-full bg-white">
        <div className="px-4 pt-2 pb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full p-3 border border-gray-200 bg-white rounded-md"
            style={{ borderRadius: '8px' }}
          >
            <span className="text-sm font-medium text-gray-900">操作說明</span>
            <ChevronDown 
              size={16} 
              className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
        
        {isOpen && (
          <div className="px-4 pb-4">
            <div className="p-3 border border-gray-200 bg-white rounded-md">
              <div className="space-y-1">
                {categories.map((category, index) => {
                  const isActiveCategory = currentInstructionId === category.id;
                  const showHeadings = isActiveCategory && hasHeadingsForCurrentPage;
                  
                  return (
                    <HCSidebarItem
                      key={index}
                      label={category.label}
                      hasChildren={showHeadings}
                      isActive={isActiveCategory && !hasHeadingsForCurrentPage}
                      defaultExpanded={showHeadings}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {showHeadings && headings && headings.map((heading, hIndex) => (
                        <HCSidebarItem
                          key={hIndex}
                          label={heading.text}
                          hasChildren={false}
                          isActive={activeHeading === heading.id}
                          onClick={() => handleHeadingClick(heading.id)}
                        />
                      ))}
                    </HCSidebarItem>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Determine if we're on an instruction post page (has headings) or help center page
  const isInstructionPostPage = !!(headings && headings.length > 0);
  
  // Calculate top offset for fixed sidebar (only on instruction post page)
  // Only consider: navigation menu (64px) + back button section (py-6 = 48px + button ~24px = ~72px)
  const navHeight = 64;
  const backButtonSectionHeight = 72; // py-6 (48px) + button height (~24px)
  const topOffset = navHeight + backButtonSectionHeight + 40;

  // Calculate max height to respect footer position
  const [maxHeight, setMaxHeight] = useState<string>(`calc(100vh - ${topOffset}px)`);

  useEffect(() => {
    if (!isInstructionPostPage) return;

    const updateMaxHeight = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        // Get footer's position relative to viewport
        const footerTop = footer.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        
        // Calculate available height: from topOffset to footer top (with some padding)
        // If footer is below viewport, use viewport height; otherwise use footer position
        const availableHeight = footerTop > topOffset 
          ? footerTop - topOffset - 20 // 20px padding before footer
          : viewportHeight - topOffset; // Footer not visible, use full viewport
        
        // Ensure minimum height and don't exceed viewport
        const finalHeight = Math.max(200, Math.min(availableHeight, viewportHeight - topOffset));
        setMaxHeight(`${finalHeight}px`);
      } else {
        // Fallback if footer not found
        setMaxHeight(`calc(100vh - ${topOffset}px)`);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(updateMaxHeight, 0);
    window.addEventListener('scroll', updateMaxHeight, { passive: true });
    window.addEventListener('resize', updateMaxHeight, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', updateMaxHeight);
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, [isInstructionPostPage, topOffset]);

  return (
    <aside className="w-60 flex-shrink-0">
      <div 
        className={isInstructionPostPage ? "fixed space-y-1 overflow-y-auto" : "sticky top-6 space-y-1"}
        style={isInstructionPostPage ? { 
          width: '240px',
          top: `${topOffset}px`,
          maxHeight: maxHeight
        } : undefined}
      >
        <div className="mb-3 px-3">
          <h5 className="text-xs text-gray-500 uppercase tracking-wider leading-[140%]">
            操作說明
          </h5>
        </div>
        {categories.map((category, index) => {
          const isActiveCategory = currentInstructionId === category.id;
          const showHeadings = isActiveCategory && hasHeadingsForCurrentPage;
          
          return (
            <HCSidebarItem
              key={index}
              label={category.label}
              hasChildren={showHeadings}
              isActive={isActiveCategory && !hasHeadingsForCurrentPage}
              defaultExpanded={showHeadings}
              onClick={() => handleCategoryClick(category.id)}
            >
              {showHeadings && headings && headings.map((heading, hIndex) => (
                <HCSidebarItem
                  key={hIndex}
                  label={heading.text}
                  hasChildren={false}
                  isActive={activeHeading === heading.id}
                  onClick={() => handleHeadingClick(heading.id)}
                />
              ))}
            </HCSidebarItem>
          );
        })}
      </div>
    </aside>
  );
};
