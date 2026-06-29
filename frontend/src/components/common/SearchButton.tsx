import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchButtonProps {
  onClick?: () => void;
  className?: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-10 h-10 flex items-center justify-center text-theme-secondary bg-theme-card border border-theme-border hover:border-brand-300 dark:hover:border-brand-700 rounded-lg transition-all cursor-pointer focus:outline-none",
        className
      )}
      aria-label="Search"
      title="Search"
    >
      <Search className="w-5 h-5" />
    </button>
  );
};

export default SearchButton;
