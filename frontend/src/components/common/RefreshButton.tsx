import React from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RefreshButtonProps {
  onClick?: () => void;
  className?: string;
  isSpinning?: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onClick, className, isSpinning = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-10 h-10 flex items-center justify-center text-theme-secondary bg-theme-card border border-theme-border hover:border-brand-300 dark:hover:border-brand-700 rounded-lg transition-all cursor-pointer focus:outline-none",
        className
      )}
      title="Refresh"
      aria-label="Refresh"
    >
      <RefreshCw className={cn("w-5 h-5", isSpinning && "animate-spin")} />
    </button>
  );
};

export default RefreshButton;
