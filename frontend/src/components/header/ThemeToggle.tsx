import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
      title="Switch Theme"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
      ) : (
        <Sun className="w-4 h-4 text-brand-600 dark:text-brand-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
