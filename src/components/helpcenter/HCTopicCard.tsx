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
      className={`w-full h-full text-left bg-white rounded hover:bg-gray-50 transition-all group ${
        isMobile ? 'p-6' : 'p-6'
      }`}
    >
      <div className="flex flex-col items-start text-left h-full">
        {/* Icon at the top, centered */}
        <div className="mb-4">
          <Icon size={36} className="text-gray-900" strokeWidth={1.5} />
        </div>
        
        {/* Title with arrow */}
        <h5 className="mb-2 text-gray-900 font-semibold text-base leading-[140%] group-hover:text-gray-700 transition-colors">
          {title}
        </h5>
        
        {/* Description/subtitle */}
        <p className="text-sm text-gray-600 leading-[150%] mb-3">
          {description}
        </p>
        <div className="flex justify-start items-center text-left gap-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors mt-auto">
            <span>Learn more</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </button>
  );
};
