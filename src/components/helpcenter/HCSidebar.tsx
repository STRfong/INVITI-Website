import React, { useState } from 'react';
import { HCSidebarItem } from './HCSidebarItem';
import { Locale, getTranslations } from '../../locales/translations';
import { ChevronDown, Menu } from 'lucide-react';
import { getAllInstructions } from '../../utils/instructionData';

interface HCSidebarProps {
  locale?: Locale;
  isMobile?: boolean;
  onNavigate?: (path: string) => void;
  currentInstructionId?: string;
}

export const HCSidebar: React.FC<HCSidebarProps> = ({ 
  locale = 'tc',
  isMobile = false,
  onNavigate,
  currentInstructionId
}) => {
  const t = getTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);


  const handleCategoryClick = (id: string) => {
    if (!onNavigate) return;
    onNavigate(`/instruction/${encodeURIComponent(id)}`);
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

  if (isMobile) {
    return (
      <div className="w-full border-b border-gray-200 bg-white">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 py-4 text-left"
        >
          <div className="flex items-center gap-2">
            <Menu size={20} className="text-gray-700" />
            <span className="text-gray-900 leading-[140%]">操作說明</span>
          </div>
          <ChevronDown 
            size={20} 
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isOpen && (
          <div className="px-6 pb-4 space-y-1 border-t border-gray-100">
            {categories.map((category, index) => (
              <HCSidebarItem
                key={index}
                label={category.label}
                hasChildren={category.hasChildren}
                isActive={currentInstructionId === category.id}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <aside className="w-60 flex-shrink-0">
      <div className="sticky top-6 space-y-1">
        <div className="mb-3 px-3">
          <h5 className="text-xs text-gray-500 uppercase tracking-wider leading-[140%]">
            操作說明
          </h5>
        </div>
        {categories.map((category, index) => (
          <HCSidebarItem
            key={index}
            label={category.label}
            hasChildren={category.hasChildren}
            isActive={currentInstructionId === category.id}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </aside>
  );
};
