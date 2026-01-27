import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface HCTopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  isMobile?: boolean;
}

export const HCTopicCard: React.FC<HCTopicCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick,
  isMobile = false
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-full text-left rounded transition-all group ${
        isMobile ? 'p-6' : 'p-6'
      }`}
      style={{
        backgroundColor: '#2D3508',
        border: '1px solid rgba(255, 252, 235, 0.15)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 53, 8, 0.2)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="flex flex-col items-start text-left h-full" style={{ color: '#FDFDFD' }}>
        {/* Icon at the top, centered */}
        <div className="mb-4">
          <Icon size={36} style={{ color: '#FDFDFD' }} strokeWidth={1.5} />
        </div>
        
        {/* Title with arrow */}
        <h5 className="mb-2 font-semibold text-base leading-[140%] transition-colors" style={{ color: '#FDFDFD' }}>
          {title}
        </h5>
        
        {/* Description/subtitle */}
        <p className="text-sm leading-[150%] mb-3" style={{ color: '#FDFDFD', opacity: 0.9 }}>
          {description}
        </p>
        <div className="flex justify-start items-center text-left gap-1 text-sm transition-colors mt-auto" style={{ color: '#FDFDFD', opacity: 0.8 }}>
            <span>Learn more</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
};
