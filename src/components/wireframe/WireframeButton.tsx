import React from 'react';

interface WireframeButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const WireframeButton: React.FC<WireframeButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  onClick
}) => {
  // Map to Bootstrap classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline-dark'
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: '', 
    lg: 'btn-lg'
  };

  const btnClass = `btn ${variantClasses[variant] || 'btn-primary'} ${sizeClasses[size] || ''} ${className}`;

  return (
    <button 
      className={btnClass}
      onClick={onClick}
      style={variant === 'primary' && size === 'md' ? {
        padding: '12px 32px',
        fontSize: '1.1rem',
        fontWeight: 500
      } : undefined}
    >
      {children}
    </button>
  );
};
