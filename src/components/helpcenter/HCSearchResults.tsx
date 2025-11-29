import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { SearchResult } from '../../utils/instructionData';

interface HCSearchResultsProps {
  results: SearchResult[];
  query: string;
  isMobile?: boolean;
  onResultClick: (instructionId: string, lineNumber?: number) => void;
}

export const HCSearchResults: React.FC<HCSearchResultsProps> = ({
  results,
  query,
  isMobile = false,
  onResultClick
}) => {
  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500 text-sm">
          沒有找到相關結果
        </p>
      </div>
    );
  }

  // Highlight search term in text
  const highlightText = (text: string, searchTerm: string): React.ReactNode => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className={isMobile ? 'mb-4' : 'mb-6'}>
        <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm'}`}>
          找到 <span className="font-medium text-gray-900">{results.length}</span> 個相關結果
        </p>
      </div>

      <div className={`space-y-4 ${isMobile ? 'space-y-3' : ''}`}>
        {results.map((result, index) => (
          <div
            key={`${result.instruction.id}-${index}`}
            className={`border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer ${
              isMobile ? 'p-3' : 'p-4'
            }`}
            onClick={() => onResultClick(result.instruction.id)}
          >
            <div className="flex items-start gap-3">
              <FileText className={`text-gray-400 mt-1 flex-shrink-0 ${isMobile ? 'hidden' : ''}`} size={20} />
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-gray-900 mb-2 hover:text-gray-700 ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}>
                  {result.instruction.title}
                </h3>
                
                <div className={isMobile ? 'space-y-1.5' : 'space-y-2'}>
                  {result.matches.slice(0, 3).map((match, matchIndex) => (
                    <div key={matchIndex} className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      <div className="flex items-start gap-2">
                        <p className={isMobile ? 'line-clamp-2' : 'line-clamp-2'}>
                          {highlightText(match.text, query)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {result.matches.length > 3 && (
                    <p className={`text-gray-400 mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      還有 {result.matches.length - 3} 個相關結果...
                    </p>
                  )}
                </div>
              </div>
              
              <ChevronRight className="text-gray-400 flex-shrink-0 mt-1" size={isMobile ? 16 : 20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

