import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface HCSearchBarProps {
  placeholder: string;
  isMobile?: boolean;
  onSearch?: (query: string) => void;
  value?: string;
  onChange?: (query: string) => void;
}

export const HCSearchBar: React.FC<HCSearchBarProps> = ({ 
  placeholder, 
  isMobile = false,
  onSearch,
  value: controlledValue,
  onChange
}) => {
  const [internalQuery, setInternalQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Use controlled value if provided, otherwise use internal state
  const query = controlledValue !== undefined ? controlledValue : internalQuery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalQuery(newValue);
    }
    onChange?.(newValue);
    onSearch?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className={`relative ${isMobile ? '' : ''}`}>
        <Search 
          className={`absolute text-gray-400 ${
            isMobile ? 'left-3 top-1/2 -translate-y-1/2' : 'left-4 top-1/2 -translate-y-1/2'
          }`} 
          size={20} 
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full bg-white border transition-colors outline-none leading-[150%] ${
            isFocused ? 'border-gray-400' : 'border-gray-300'
          } ${
            isMobile 
              ? 'h-12 pl-10 pr-4 text-base' 
              : 'h-12 pl-12 pr-4'
          }`}
          style={{ borderRadius: 'var(--radius-btn, 8px)' }}
        />
      </div>
    </form>
  );
};
