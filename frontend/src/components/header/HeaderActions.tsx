import React from 'react';
import { Bell } from 'lucide-react';
import UserDropdown from './UserDropdown';
import ThemeToggle from './ThemeToggle';

const HeaderActions: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <button type="button" className="relative w-9 h-9 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer" title="Notifications">
          <Bell className="w-4 h-4 text-brand-600 dark:text-brand-400" />
        </button>
      </div>
      <ThemeToggle />
      <UserDropdown />
    </div>
  );
};

export default HeaderActions;
