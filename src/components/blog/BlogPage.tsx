import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlogCard, BlogCardProps } from './BlogCard';
import { Locale, getTranslations } from '../../locales/translations';
import { NavStack } from '../wireframe/NavStack';
import { FooterSection } from '../wireframe/FooterSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getAllBlogPosts, findMarkdownByTitle, getMarkdownContent } from '../../utils/blogData';
import { parseMarkdown } from '../../utils/markdownParser';
import { useIsMobile } from '../ui/use-mobile';
import deadImage from '../../assets/dead.webp';

interface BlogPageProps {
  locale?: Locale;
  isMobile?: boolean;
  onNavigate?: (path: string) => void;
  onLocaleChange?: (locale: Locale) => void;
  onScrollToPricing?: (focusCard?: 'free' | 'basic' | 'pro' | 'enterprise') => void;
  onSetScrollTarget?: (target: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ 
  locale = 'tc', 
  isMobile: isMobileProp = false,
  onNavigate,
  onLocaleChange,
  onScrollToPricing,
  onSetScrollTarget
}) => {
  const t = getTranslations(locale);
  // Auto-detect mobile using hook, use detected value as primary source
  // Prop can override if explicitly set to true (for forced mobile view in dev)
  const detectedMobile = useIsMobile();
  const isMobile = isMobileProp === true ? true : detectedMobile;
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Debug: Log screen size detection (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[BlogPage] Screen size detection:', {
        windowWidth: window.innerWidth,
        detectedMobile,
        isMobileProp,
        finalIsMobile: isMobile
      });
    }
  }, [detectedMobile, isMobileProp, isMobile]);

  const categories = [
    { id: 'all', label: t.blogPage.allPosts },
    { id: 'product', label: t.blogPage.productUpdates },
    { id: 'case', label: t.blogPage.caseStudies },
    { id: 'industry', label: t.blogPage.industryInsights },
    { id: 'events', label: t.blogPage.events }
  ];

  // Map category names from CSV to translation keys
  const categoryMap: Record<string, string> = {
    '產品更新': t.blogPage.productUpdates,
    '客戶故事': t.blogPage.caseStudies,
    '產業觀點': t.blogPage.industryInsights,
    '活動花絮': t.blogPage.events,
  };

  // Reverse map: from category ID to CSV category name
  const categoryIdToCsvName: Record<string, string> = {
    'product': '產品更新',
    'case': '客戶故事',
    'industry': '產業觀點',
    'events': '活動花絮',
  };

  // Get blog posts from CSV and markdown files
  const allBlogPosts: BlogCardProps[] = useMemo(() => {
    const allPosts = getAllBlogPosts();
    
    return allPosts.map((post) => {
      // Get markdown content to extract excerpt
      const markdownContent = post.markdownPath ? getMarkdownContent(post.markdownPath) : '';
      const parsed = markdownContent ? parseMarkdown(markdownContent) : null;
      
      // Default thumbnail (you can customize per post later)
      const thumbnails = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      ];
      const thumbnail = thumbnails[allPosts.indexOf(post) % thumbnails.length];
      
      // Parse author name and role
      const authorName = post.author || 'INVITI 團隊';
      const authorRole = '產品與營運'; // Default role, can be extracted from markdown if needed
      
      return {
        id: post.id,
        thumbnail,
        title: post.title,
        excerpt: parsed?.excerpt || '閱讀完整文章...',
        category: categoryMap[post.category] || post.category,
        date: post.date,
        author: {
          name: authorName,
          role: authorRole,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
        },
        readTime: `${post.readTime} ${t.blogPage.readTime}`,
        // Store original CSV category for filtering
        originalCategory: post.category
      };
    });
  }, [t, categoryMap]);

  // Filter blog posts based on active category
  const blogPosts: BlogCardProps[] = useMemo(() => {
    if (activeCategory === 'all') {
      return allBlogPosts;
    }
    
    // Get the CSV category name for the selected category ID
    const csvCategoryName = categoryIdToCsvName[activeCategory];
    if (!csvCategoryName) {
      return allBlogPosts;
    }
    
    // Filter posts that match the selected category
    return allBlogPosts.filter((post): post is BlogCardProps => {
      // Access the originalCategory we stored (using type assertion for internal use)
      const postWithCategory = post as BlogCardProps & { originalCategory?: string };
      return postWithCategory.originalCategory === csvCategoryName;
    });
  }, [allBlogPosts, activeCategory, categoryIdToCsvName]);

  const handlePostClick = (postId: string) => {
    if (onNavigate) {
      // Encode the postId for URL (handles Chinese characters)
      const encodedId = encodeURIComponent(postId);
      onNavigate(`/blog/${encodedId}`);
    }
  };

  const handleNavigateToHelpCenter = () => {
    if (onNavigate) {
      onNavigate('/help-center');
    }
  };

  // Sidebar component
  const SidebarContent = () => (
    <nav className="space-y-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => {
            setActiveCategory(category.id);
            if (isMobile) {
              setIsSidebarOpen(false);
            }
          }}
          className={`w-full text-left px-3 py-2 text-sm transition-colors leading-[140%] ${
            activeCategory === category.id
              ? 'bg-gray-100 text-gray-900 font-medium'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
          style={{ borderRadius: '4px' }}
        >
          {category.label}
        </button>
      ))}
    </nav>
  );

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
      <main className={isMobile ? 'flex-1' : 'flex-1'}>
        {/* Hero Section */}
        <div className={`border-b border-gray-200 bg-gray-50 ${isMobile ? 'pt-12 pb-6 px-4' : 'py-12'}`}>
          <div className={`${isMobile ? '' : 'max-w-[1120px] mx-auto px-6'}`}>
            <h1 className={`mb-2 ${isMobile ? 'text-left text-2xl' : 'text-center'}`}>
              {t.blogPage.title}
            </h1>
            <p className={`text-gray-600 leading-[150%] ${isMobile ? 'text-left text-sm' : 'text-center'}`}>
              {t.blogPage.subtitle}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className={isMobile ? 'py-4' : 'py-12'}>
          <div className={`${isMobile ? '' : 'max-w-[1120px] mx-auto px-6'}`}>
            {isMobile ? (
              // Mobile: Collapsible Sidebar + Single Column Feed
              <div>
                {/* Collapsible Sidebar */}
                <div className="px-4 mb-4">
                  <Collapsible open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 border border-gray-200 bg-white rounded-md">
                      <span className="text-sm font-medium text-gray-900">
                        {categories.find(c => c.id === activeCategory)?.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${
                          isSidebarOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 border border-gray-200 bg-white rounded-md">
                      <SidebarContent />
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Single Column Feed */}
                <div className="px-4 space-y-4">
                  {blogPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                      <div className={`${isMobile ? 'w-14 h-auto' : 'w-12 h-auto'} mb-3`}>
                        <ImageWithFallback
                          src={deadImage}
                          alt="Empty state"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <p className="text-sm text-gray-500 text-center">
                        此分類暫無文章
                      </p>
                    </div>
                  ) : (
                    blogPosts.map((post) => (
                      <div key={post.id} className="w-full">
                        <BlogCard {...post} onClick={() => handlePostClick(post.id)} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              // Desktop: Sidebar + Two Column Feed
              <div className="flex gap-8">
                {/* Left Sidebar - Sticky */}
                <aside
                  className="flex-shrink-0"
                  style={{ width: '240px', position: 'sticky', top: '96px', height: 'fit-content' }}
                >
                  <SidebarContent />
                </aside>

                {/* Main Feed - Two Columns */}
                <div className="flex-1">
                  {blogPosts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24">
                      <div className="w-12 h-12 mb-6">
                        <ImageWithFallback
                          src={deadImage}
                          alt="Empty state"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-base text-gray-500">
                        此分類暫無文章
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      {blogPosts.map((post) => (
                        <BlogCard key={post.id} {...post} onClick={() => handlePostClick(post.id)} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
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
