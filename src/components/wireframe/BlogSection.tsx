import React, { useMemo } from 'react';
import { BlogCard, BlogCardProps } from '../blog/BlogCard';
import { Locale, getTranslations } from '../../locales/translations';
import { getAllBlogPosts, getMarkdownContent } from '../../utils/blogData';
import { parseMarkdown } from '../../utils/markdownParser';
import invitLogo from '../../assets/INVITI_Logo.webp';

interface BlogSectionProps {
  isMobile?: boolean;
  locale?: Locale;
  onNavigate?: (path: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isMobile = false, locale = 'tc', onNavigate }) => {
  const t = getTranslations(locale);

  // Map category names from CSV to translation keys
  const categoryMap: Record<string, string> = {
    '產品更新': t.blogPage.productUpdates,
    '客戶故事': t.blogPage.caseStudies,
    '產業觀點': t.blogPage.industryInsights,
    '活動花絮': t.blogPage.events,
  };

  // Get latest 3 blog posts with same processing as BlogPage
  const latestPosts: BlogCardProps[] = useMemo(() => {
    const allPosts = getAllBlogPosts();
    
    // Sort by date (newest first) - assuming date format is YYYY-MM-DD or similar
    const sortedPosts = [...allPosts].sort((a, b) => {
      const dateA = new Date(a.date || '').getTime();
      const dateB = new Date(b.date || '').getTime();
      return dateB - dateA; // Descending order (newest first)
    });
    
    // Get latest 3 posts
    const latest3 = sortedPosts.slice(0, 3);
    
    // Default thumbnails (same as BlogPage)
    const thumbnails = [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    ];
    
    return latest3.map((post, index) => {
      // Get markdown content to extract excerpt
      const markdownContent = post.markdownPath ? getMarkdownContent(post.markdownPath) : '';
      const parsed = markdownContent ? parseMarkdown(markdownContent) : null;
      
      const thumbnail = thumbnails[index % thumbnails.length];
      
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
          avatar: invitLogo
        },
        readTime: `${post.readTime} ${t.blogPage.readTime}`,
      };
    });
  }, [t, categoryMap]);

  const handlePostClick = (postId: string) => {
    if (onNavigate) {
      // Encode the postId for URL (handles Chinese characters)
      const encodedId = encodeURIComponent(postId);
      onNavigate(`/blog/${encodedId}`);
    }
  };

  return (
    <section id="blog" className="section-padding bg-background">
      <div className={isMobile ? 'container-fluid px-4' : 'container'}>
        <div className={`d-flex ${isMobile ? 'flex-column mb-4' : 'align-items-center justify-content-between mb-5'}`}>
          <h2 className={`mb-3 ${isMobile ? 'text-start' : 'mb-0'}`}>{t.blog.sectionTitle}</h2>
          {!isMobile && (
            <button
              onClick={() => onNavigate?.('/blog')}
              className="btn btn-link text-decoration-none text-dark px-0"
            >
              {t.blog.viewAll}
            </button>
          )}
        </div>

        <div className={`row g-4 ${isMobile ? '' : 'row-cols-1 row-cols-md-3'}`}>
          {latestPosts.map((post) => (
            <div 
              key={post.id}
              className={isMobile ? '' : 'col d-flex'}
            >
              <BlogCard {...post} onClick={() => handlePostClick(post.id)} />
            </div>
          ))}
        </div>

        {isMobile && (
          <div className="mt-4">
            <button
              onClick={() => onNavigate?.('/blog')}
              className="btn btn-link text-decoration-none text-dark px-0"
            >
              {t.blog.viewAll}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};