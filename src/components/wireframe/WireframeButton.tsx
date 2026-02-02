import React from 'react';

interface WireframeButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  /** When provided, renders as <a> for GA4 link tracking. */
  href?: string;
  target?: string;
  rel?: string;
}

export const WireframeButton: React.FC<WireframeButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  target,
  rel
}) => {
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

  const btnClass = `btn ${variantClasses[variant] || 'btn-primary'} ${sizeClasses[size] || ''} ${className}`.trim();
  const style = variant === 'primary' && size === 'md' ? {
    padding: '12px 32px',
    fontSize: '1.1rem',
    fontWeight: 500
  } : undefined;

  if (href != null) {
    return (
      <a
        href={href}
        className={btnClass}
        style={style}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={btnClass}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};
