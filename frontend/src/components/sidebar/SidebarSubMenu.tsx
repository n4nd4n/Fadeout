import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface SidebarSubMenuProps {
  items: { id: string; label: string; path?: string }[];
  className?: string;
}

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({ items, className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={cn('mt-1 ml-8 mr-2 space-y-1', className)}>
      {items.map((item) => {
        const isActive = item.path ? location.pathname === item.path : false;
        return (
          <div
            key={item.id}
            onClick={() => item.path && navigate(item.path)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors focus:outline-none cursor-pointer select-none",
              isActive
                ? "bg-theme-active text-brand-600 dark:text-theme-primary font-medium"
                : "text-theme-secondary hover:bg-theme-hover hover:text-theme-primary"
            )}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarSubMenu;
