import React from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  className?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive = false,
  hasSubmenu = false,
  isExpanded = false,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full flex items-center py-2.5 rounded-lg transition-colors focus:outline-none justify-between px-3 cursor-pointer select-none text-left',
        isActive
          ? 'bg-theme-active text-brand-600 dark:text-theme-primary'
          : 'text-theme-secondary hover:bg-theme-hover hover:text-theme-primary',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon size={20} className="text-current shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </div>
      {hasSubmenu && (
        <span className="shrink-0">
          <ChevronDown
            size={16}
            className={cn(
              'text-neutral-400 transition-transform duration-200',
              isExpanded && 'rotate-180 text-current'
            )}
          />
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
