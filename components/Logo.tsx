import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-10',
    lg: 'h-16'
  };

  const textClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Local SVG Icon */}
      <div className={`relative flex items-center justify-center ${sizeClasses[size]} aspect-square`}>
        <img 
          src="/logo/icon.svg" 
          alt="AI Fit Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Text Logo */}
      <span className={`font-bold tracking-tight text-white ${textClasses[size]}`}>
        AI <span className="text-brand-500">Fit</span>
      </span>
    </div>
  );
};