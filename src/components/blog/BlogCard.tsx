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
      className="group cursor-pointer border transition-all hover:shadow-lg active:opacity-90 flex flex-col h-full w-full"
      style={{ 
        borderRadius: '8px',
        backgroundColor: '#2D3508',
        borderColor: 'rgba(255, 252, 235, 0.15)'
      }}
    >
      {/* Thumbnail */}
      {thumbnail && (
        <div className="w-full overflow-hidden" style={{ borderRadius: '8px 8px 0 0' }}>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <ImageWithFallback
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-4 flex flex-col flex-grow" style={{ color: '#FDFDFD' }}>
        {/* Title */}
        <h5 className="mb-2 leading-[140%] transition-colors text-sm sm:text-base" style={{ color: '#FDFDFD', fontWeight: 500 }}>
          {title}
        </h5>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm mb-3 sm:mb-4 leading-[150%] line-clamp-2" style={{ color: '#FDFDFD', opacity: 0.9 }}>
          {excerpt}
        </p>

        {/* Author Row */}
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 pb-2 sm:pb-3" style={{ borderBottom: '1px solid rgba(255, 252, 235, 0.15)' }}>
          {author.avatar && (
            <div 
              className="blog-card-avatar flex items-center justify-center"
              style={{ 
                padding: '4px',
                backgroundColor: '#FDFDFD',
                borderRadius: '4px'
              }}
            >
              <ImageWithFallback
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          {!author.avatar && (
            <div 
              className="blog-card-avatar flex items-center justify-center"
              style={{ 
                backgroundColor: 'rgba(255, 252, 235, 0.15)',
                borderRadius: '4px',
                width: '32px',
                height: '32px'
              }}
            >
              <span className="text-[10px] sm:text-xs" style={{ color: '#FDFDFD' }}>{author.name[0]}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm truncate" style={{ color: '#FDFDFD' }}>{author.name}</div>
            <div className="text-xs truncate" style={{ color: '#FDFDFD', opacity: 0.8 }}>{author.role}</div>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs flex-wrap sm:flex-nowrap pt-1 mt-auto" style={{ color: '#FDFDFD', opacity: 0.8 }}>
          <span 
            className="px-2 py-1" 
            style={{ 
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 252, 235, 0.15)',
              border: '1px solid rgba(255, 252, 235, 0.2)',
              color: '#FDFDFD'
            }}
          >
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
