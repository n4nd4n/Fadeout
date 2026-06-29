import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();

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

  return (
    <div className="relative">
      <button
        type="button"
        className="h-9 px-2 flex items-center gap-1.5 text-theme-secondary hover:bg-theme-hover rounded-lg transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-8 h-8 select-none">
          <div className="w-8 h-8 text-xs rounded-full flex items-center justify-center text-white font-medium overflow-hidden text-white font-medium transition-all bg-brand-600">
            {getInitials()}
          </div>
          <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-brand-400 rounded-full border border-white dark:border-theme-sidebar animate-pulse" style={{ boxShadow: '0 0 6px var(--color-brand-400)' }}></div>
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-500 rounded-full border border-white dark:border-theme-sidebar" style={{ boxShadow: '0 0 6px var(--color-brand-500)' }}></div>
        </div>
        <ChevronDown className="w-3 h-3 hidden lg:inline text-theme-secondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-theme-sidebar rounded-lg shadow-lg border border-theme-border min-w-[150px] z-20 py-1">
          <div className="px-4 py-2 text-sm text-theme-primary hover:bg-theme-hover hover:text-brand-600 cursor-pointer font-medium font-inter">
            Profile
          </div>
          <div
            onClick={logout}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer font-medium border-t border-theme-border"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
