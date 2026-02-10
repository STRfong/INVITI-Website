import React, { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Locale, getTranslations } from '../../locales/translations';
import { NavStack } from '../wireframe/NavStack';
import { FooterSection } from '../wireframe/FooterSection';
import { WireframeButton } from '../wireframe/WireframeButton';
import { getBlogPostById, getAllBlogPosts, getMarkdownContent } from '../../utils/blogData';
import { parseMarkdown } from '../../utils/markdownParser';
import { useIsMobile } from '../ui/use-mobile';
import { removeBasePath } from '../../utils/routing';
import invitLogo from '../../assets/INVITI_Logo.webp';
import blog1 from '../../assets/Blog/img/blog1.jpeg.webp';
import blog2 from '../../assets/Blog/img/blog2.jpeg.webp';
import blog3 from '../../assets/Blog/img/blog3.jpeg.webp';
import blog4 from '../../assets/Blog/img/blog4.jpeg.webp';
import blog5 from '../../assets/Blog/img/blog5.jpeg.webp';
import blog6 from '../../assets/Blog/img/blog6.jpeg.webp';
import blog7 from '../../assets/Blog/img/blog7.jpeg.webp';
import blog8 from '../../assets/Blog/img/blog1.jpeg.webp';

interface BlogPostPageProps {
  locale?: Locale;
  isMobile?: boolean;
  onNavigate?: (path: string) => void;
  onLocaleChange?: (locale: Locale) => void;
  onScrollToPricing?: (focusCard?: 'free' | 'basic' | 'pro' | 'enterprise') => void;
  onSetScrollTarget?: (target: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ 
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

  // Debug: Log screen size detection (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[BlogPostPage] Screen size detection:', {
        windowWidth: window.innerWidth,
        detectedMobile,
        isMobileProp,
        finalIsMobile: isMobile
      });
    }
  }, [detectedMobile, isMobileProp, isMobile]);

  // Get post ID from URL - update when URL changes
  const [postId, setPostId] = useState(() => {
    const path = removeBasePath(window.location.pathname);
    const match = path.match(/\/blog\/(.+)/);
    if (!match) return '';
    
    // Decode the ID from URL
    const rawId = match[1];
    try {
      return decodeURIComponent(rawId);
    } catch (e) {
      return rawId;
    }
  });

  // Listen for URL changes
  useEffect(() => {
    const updatePostId = () => {
      const path = removeBasePath(window.location.pathname);
      const match = path.match(/\/blog\/(.+)/);
      if (!match) {
        setPostId('');
        return;
      }
      
      const rawId = match[1];
      try {
        const decodedId = decodeURIComponent(rawId);
        setPostId(decodedId);
      } catch (e) {
        setPostId(rawId);
      }
    };

    // Listen for popstate (back/forward button)
    window.addEventListener('popstate', updatePostId);
    
    // Use MutationObserver to detect when history changes (for programmatic navigation)
    // This is a workaround since pushState doesn't trigger popstate
    let lastPath = window.location.pathname;
    const checkPath = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        lastPath = currentPath;
        updatePostId();
      }
    };
    
    // Check periodically (fallback method)
    const intervalId = setInterval(checkPath, 50);

    return () => {
      window.removeEventListener('popstate', updatePostId);
      clearInterval(intervalId);
    };
  }, []);

  // Scroll to top when postId changes
  useEffect(() => {
    if (postId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [postId]);

  // Blog images array - mapped by sequence
  const blogImages = [blog1, blog2, blog3, blog4, blog5, blog6, blog7, blog8];

  // Map category names from CSV to translation keys
  const categoryMap: Record<string, string> = {
    '產品更新': t.blogPage.productUpdates,
    '客戶故事': t.blogPage.caseStudies,
    '產業觀點': t.blogPage.industryInsights,
    '活動花絮': t.blogPage.events,
  };

  // Get post data from CSV and markdown
  const postData = useMemo(() => {
    if (!postId) return null;
    
    const metadata = getBlogPostById(postId);
    if (!metadata) return null;

    const markdownContent = metadata.markdownPath ? getMarkdownContent(metadata.markdownPath) : '';
    if (!markdownContent) return null;

    const parsed = parseMarkdown(markdownContent);

    // Find the index of this post in all posts to get the corresponding image
    const allPosts = getAllBlogPosts();
    const postIndex = allPosts.findIndex(p => p.id === postId);
    const heroImage = postIndex >= 0 ? (blogImages[postIndex] || '') : '';

    return {
      id: metadata.id,
      title: metadata.title,
      category: categoryMap[metadata.category] || metadata.category,
      date: metadata.date,
      readTime: `${metadata.readTime} ${t.blogPage.readTime}`,
      author: {
        name: metadata.author || 'INVITI 團隊',
        role: '產品與營運',
        avatar: invitLogo
      },
      heroImage,
      content: parsed.content
    };
  }, [postId, t, categoryMap, blogImages]);

  // Get previous and next posts
  const { prevPost, nextPost } = useMemo(() => {
    const allPosts = getAllBlogPosts();
    const currentIndex = allPosts.findIndex(p => p.id === postId);
    
    const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    
    return {
      prevPost: prev ? { id: prev.id, title: prev.title } : null,
      nextPost: next ? { id: next.id, title: next.title } : null
    };
  }, [postId]);

  // If post not found, show error or redirect
  if (!postData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <p className="text-gray-600">文章未找到</p>
        <button
          onClick={() => onNavigate?.('/blog')}
          className="mt-4 text-sm text-gray-900 hover:text-gray-700"
        >
          返回部落格
        </button>
      </div>
    );
  }

  const post = postData;

  const handleNavigateToHelpCenter = () => {
    if (onNavigate) {
      onNavigate('/help-center');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FDFDFD' }}>
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
        {/* Back to Blog */}
        <div className={`border-b border-gray-200 ${isMobile ? 'py-3 px-4' : 'py-6'}`}>
          <div className={`${isMobile ? '' : 'max-w-[800px] mx-auto px-6'}`}>
            <button
              onClick={() => onNavigate?.('/blog')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors active:opacity-70"
            >
              <ArrowLeft size={isMobile ? 12 : 16} />
              <span className="text-sm sm:text-base">{t.blogPage.backToBlog}</span>
            </button>
          </div>
        </div>

        {/* Article */}
        <article className={isMobile ? 'py-6' : 'py-12'}>
          <div className={`${isMobile ? 'px-4' : 'max-w-[800px] mx-auto px-6'}`}>
            {/* Meta Row */}
            <div className={`flex items-center gap-2 text-xs text-gray-500 mb-3 ${isMobile ? 'flex-wrap' : ''}`}>
              <span 
                className="px-2 py-1 border" 
                style={{ 
                  borderRadius: '4px',
                  backgroundColor: '#2D3508',
                  borderColor: 'rgba(45, 53, 8, 0.2)',
                  color: '#FDFDFD'
                }}
              >
                {post.category}
              </span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className={isMobile ? 'mb-4 text-2xl leading-tight' : 'mb-6'}>{post.title}</h1>

            {/* Author Row */}
            <div className={`flex items-center gap-3 mb-6 pb-6 ${isMobile ? '' : 'my-8'}`}>
              <div 
                className="rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{
                  width: isMobile ? '40px' : '48px',
                  height: isMobile ? '40px' : '48px',
                  minWidth: isMobile ? '40px' : '48px',
                  minHeight: isMobile ? '40px' : '48px',
                  padding: isMobile ? '6px' : '8px',
                  backgroundColor: '#FDFDFD'
                }}
              >
                <ImageWithFallback
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <div className={`text-gray-900 ${isMobile ? 'text-xs' : 'text-sm'}`}>{post.author.name}</div>
                <div className={`text-gray-500 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>{post.author.role}</div>
              </div>
            </div>

            {/* Hero Image */}
            {post.heroImage && (
              <div className={`overflow-hidden ${isMobile ? 'mb-6 -mx-4' : 'mb-8'}`} style={{ borderRadius: isMobile ? '0' : '8px' }}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <ImageWithFallback
                    src={post.heroImage}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div 
              className={`prose prose-gray max-w-none blog-content ${isMobile ? 'prose-sm' : ''}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Prev/Next Navigation */}
        <div 
          className={`border-t-2 ${isMobile ? 'py-4 px-4' : 'py-8'}`}
          style={{
            backgroundColor: '#2D3508',
            borderTopColor: 'rgba(255, 252, 235, 0.15)'
          }}
        >
          <div className={`${isMobile ? '' : 'max-w-[800px] mx-auto px-6'}`}>
            <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center gap-6'}`}>
              {/* Previous Post */}
              {prevPost ? (
                <button
                  onClick={() => {
                    const newPath = `/blog/${encodeURIComponent(prevPost.id)}`;
                    onNavigate?.(newPath);
                    // Force update postId immediately
                    setPostId(prevPost.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-3 text-left flex-1 group ${isMobile ? 'active:opacity-70' : ''}`}
                >
                  <ArrowLeft 
                    size={isMobile ? 18 : 20} 
                    className="transition-colors flex-shrink-0 group-hover:opacity-100" 
                    style={{ color: 'rgba(255, 252, 235, 0.7)' }} 
                  />
                  <div className="min-w-0">
                    <div className={`mb-1 ${isMobile ? 'text-[10px]' : 'text-xs'} transition-colors`} style={{ color: 'rgba(255, 252, 235, 0.7)' }}>{t.blogPage.previousPost}</div>
                    <div className={`transition-colors truncate ${isMobile ? 'text-xs' : 'text-sm'} group-hover:opacity-90`} style={{ color: '#FDFDFD' }}>
                      {prevPost.title}
                    </div>
                  </div>
                </button>
              ) : (
                <div className="flex-1" />
              )}

              {/* Next Post */}
              {nextPost ? (
                <button
                  onClick={() => {
                    const newPath = `/blog/${encodeURIComponent(nextPost.id)}`;
                    onNavigate?.(newPath);
                    // Force update postId immediately
                    setPostId(nextPost.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-3 text-right flex-1 group justify-end ${isMobile ? 'active:opacity-70' : ''}`}
                >
                  <div className="min-w-0">
                    <div className={`mb-1 ${isMobile ? 'text-[10px]' : 'text-xs'} transition-colors`} style={{ color: 'rgba(255, 252, 235, 0.7)' }}>{t.blogPage.nextPost}</div>
                    <div className={`transition-colors truncate ${isMobile ? 'text-xs' : 'text-sm'} group-hover:opacity-90`} style={{ color: '#FDFDFD' }}>
                      {nextPost.title}
                    </div>
                  </div>
                  <ArrowRight 
                    size={isMobile ? 18 : 20} 
                    className="transition-colors flex-shrink-0 group-hover:opacity-100" 
                    style={{ color: 'rgba(255, 252, 235, 0.7)' }} 
                  />
                </button>
              ) : (
                <div className="flex-1" />
              )}
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
