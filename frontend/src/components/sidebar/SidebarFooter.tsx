import React from 'react';
import { ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SidebarFooter: React.FC = () => {
  const { user } = useAuth();

  // Get initials from user's full name or default to 'JD'
  const getInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.fullName.substring(0, 2).toUpperCase();
    }
    return 'JD';
  };

  const displayName = user?.fullName || 'John Doe';
  const displayEmail = user?.email || 'superadmin@fadeout.ai';

  return (
    <div className="relative mt-auto border-t border-theme-border bg-theme-sidebar min-h-[var(--listing-footer-height)] py-2 flex items-center select-none">
      <button type="button" className="w-full h-full px-3 hover:bg-theme-hover transition-colors focus:outline-none flex items-center">
        <div className="flex items-center gap-3 overflow-hidden w-full">
          <div className="w-10 h-10 text-sm rounded-full flex items-center justify-center text-white font-medium overflow-hidden text-sm shrink-0 bg-brand-600">
            {getInitials()}
          </div>
          <div className="flex-1 min-w-0 text-left overflow-hidden">
            <div className="text-sm font-bold truncate text-brand-600 dark:text-theme-primary">
              {displayName}
            </div>
            <div className="text-xs text-theme-secondary truncate">
              {displayEmail}
            </div>
          </div>
          <ChevronUp size={16} className="text-theme-secondary shrink-0 transition-transform" />
        </div>
      </button>
    </div>
  );
};

export default SidebarFooter;
