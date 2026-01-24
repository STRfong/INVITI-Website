import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface HCSidebarItemProps {
  label: string;
  hasChildren?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}

export const HCSidebarItem: React.FC<HCSidebarItemProps> = ({ 
  label, 
  hasChildren = false,
  isActive = false,
  onClick,
  children,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Update expanded state when defaultExpanded changes (e.g., when active category changes)
  useEffect(() => {
    if (defaultExpanded) {
      setIsExpanded(true);
    }
  }, [defaultExpanded]);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onClick?.();
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between px-3 py-2 text-left text-sm transition-colors leading-[140%]"
        style={{
          backgroundColor: isActive ? '#2D3508' : 'transparent',
          color: isActive ? '#FDFDFD' : '#2D3508',
          opacity: isActive ? 1 : 0.8
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = '#2D3508';
            e.currentTarget.style.color = '#FDFDFD';
            e.currentTarget.style.opacity = '1';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#2D3508';
            e.currentTarget.style.opacity = '0.8';
          }
        }}
      >
        <span className="text-sm" style={{ color: 'inherit' }}>{label}</span>
        {hasChildren && (
          <ChevronRight 
            size={16} 
            className="transition-transform"
            style={{ 
              color: isActive ? '#FDFDFD' : '#2D3508',
              opacity: 0.7,
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          />
        )}
      </button>
      
      {hasChildren && isExpanded && children && (
        <div className="ml-3 mt-1 border-l border-gray-200 pl-3 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};
