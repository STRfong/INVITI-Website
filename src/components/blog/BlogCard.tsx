import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface BlogCardProps {
  id: string;
  thumbnail: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
  onClick?: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  thumbnail,
  title,
  excerpt,
  category,
  date,
  author,
  readTime,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm active:opacity-90"
      style={{ borderRadius: '8px' }}
    >
      {/* Thumbnail */}
      <div className="w-full overflow-hidden" style={{ borderRadius: '8px 8px 0 0' }}>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <ImageWithFallback
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-4">
        {/* Title */}
        <h5 className="mb-2 leading-[140%] text-gray-900 group-hover:text-gray-700 transition-colors text-sm sm:text-base">
          {title}
        </h5>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-[150%] line-clamp-2">
          {excerpt}
        </p>

        {/* Author Row */}
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-gray-100">
          {author.avatar && (
            <div 
              className="blog-card-avatar bg-gray-100"
              style={{
                backgroundImage: `url(${author.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              role="img"
              aria-label={author.name}
            />
          )}
          {!author.avatar && (
            <div className="blog-card-avatar bg-gray-200 flex items-center justify-center">
              <span className="text-[10px] sm:text-xs text-gray-600">{author.name[0]}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm text-gray-900 truncate">{author.name}</div>
            <div className="text-xs text-gray-500 truncate">{author.role}</div>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-500 flex-wrap sm:flex-nowrap pt-1">
          <span className="px-2 py-1 bg-gray-50 border border-gray-200" style={{ borderRadius: '4px' }}>
            {category}
          </span>
          <span>•</span>
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
};
