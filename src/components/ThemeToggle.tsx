import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { notifyThemeChanged } from '../utils/notifications';

interface ThemeToggleProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'full', className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const nextTheme = theme === 'ivory' ? 'midnight' : 'ivory';
    toggleTheme();
    notifyThemeChanged(nextTheme);
  };

  const isMidnight = theme === 'midnight';

  if (variant === 'compact') {
    return (
      <button
        id="btn-theme-toggle-compact"
        onClick={handleToggle}
        className={`p-2 rounded-lg border border-[#E6E2DA] bg-[#F5F2EB] text-[#57534E] hover:text-[#1C1917] hover:border-[#D6CFC4] transition-all cursor-pointer flex items-center justify-center ${className}`}
        title={`Switch to ${isMidnight ? 'Ivory' : 'Midnight'} theme`}
        aria-label={`Switch to ${isMidnight ? 'Ivory' : 'Midnight'} theme`}
      >
        {isMidnight ? (
          <Sun className="w-4 h-4 text-[#F6C15B] animate-spin-slow" />
        ) : (
          <Moon className="w-4 h-4 text-[#78716C]" />
        )}
      </button>
    );
  }

  return (
    <button
      id="btn-theme-toggle"
      onClick={handleToggle}
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E6E2DA] bg-[#F5F2EB] hover:bg-[#EAE5DA] text-[11px] font-sans font-medium uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] hover:border-[#D6CFC4] transition-all cursor-pointer shadow-2xs ${className}`}
      title={`Currently ${isMidnight ? 'Midnight' : 'Ivory'} theme. Click to switch to ${isMidnight ? 'Ivory' : 'Midnight'}.`}
      aria-label={`Toggle theme (currently ${theme})`}
    >
      <div className="flex items-center gap-1.5">
        {isMidnight ? (
          <>
            <Moon className="w-3.5 h-3.5 text-[#F6C15B]" />
            <span className="text-[#F8FAFC] font-semibold">Midnight</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-[#B38E44]" />
            <span>Ivory</span>
          </>
        )}
      </div>
      <span className="w-1 h-1 rounded-full bg-[#B38E44] opacity-50 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};
