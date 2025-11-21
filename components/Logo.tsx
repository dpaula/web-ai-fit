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
      {/* Graphic Icon: Plate + Check + Cutlery */}
      <div className={`relative flex items-center justify-center ${sizeClasses[size]} aspect-square`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Fork Left */}
          <path d="M20 35V75C20 78 22 80 25 80" stroke="#a8d5ca" strokeWidth="6" strokeLinecap="round" />
          <path d="M15 20V35H25V20" stroke="#a8d5ca" strokeWidth="4" strokeLinecap="round" />
          
          {/* Spoon Right */}
          <path d="M80 35V75C80 78 78 80 75 80" stroke="#a8d5ca" strokeWidth="6" strokeLinecap="round" />
          <path d="M80 35C85 35 88 30 88 25C88 20 85 15 80 15C75 15 72 20 72 25C72 30 75 35 80 35Z" fill="#a8d5ca" />

          {/* Plate Circle */}
          <circle cx="50" cy="50" r="35" className="fill-brand-500/20 stroke-brand-500" strokeWidth="4" />
          <circle cx="50" cy="50" r="30" className="fill-brand-600" />
          
          {/* Checkmark */}
          <path d="M38 50L46 58L62 42" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      {/* Text Logo */}
      <span className={`font-bold tracking-tight text-white ${textClasses[size]}`}>
        AI <span className="text-brand-500">Fit</span>
      </span>
    </div>
  );
};