import React from 'react';

interface LogoProps {
  className?: string;
  white?: boolean;
}

export default function Logo({ className = '', white = false }: LogoProps) {
  const textColor = white ? '#FFFFFF' : '#003B8E';
  const accentColor = white ? '#FFFFFF' : '#F97316';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill={white ? 'rgba(255,255,255,0.15)' : '#003B8E'} />
        <path
          d="M28 12C26.3 10.3 23.9 9.6 21.6 10.1L24.4 12.9L22.9 14.4L20.1 11.6C19.6 13.9 20.3 16.3 22 18C23.5 19.5 25.5 20.2 27.4 19.9L32 24.5C32.8 25.3 32.8 26.6 32 27.4C31.2 28.2 29.9 28.2 29.1 27.4L24.5 22.8C21.7 23.5 18.6 22.7 16.6 20.6C14.3 18.2 13.8 14.8 15.2 11.9L18.9 15.6L21.8 12.7L18.1 9C21 7.6 24.4 8.1 26.8 10.4"
          fill="white"
        />
        <path d="M12 27L19 20" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
        <circle cx="10.5" cy="28.5" r="2.5" fill={accentColor} />
      </svg>
      <div>
        <span style={{ color: textColor }} className="font-bold text-xl leading-tight block">
          TB Værktøj
        </span>
        <span
          style={{ color: white ? 'rgba(255,255,255,0.7)' : '#64748b' }}
          className="text-xs leading-tight block"
        >
          Professionelt værktøj
        </span>
      </div>
    </div>
  );
}
