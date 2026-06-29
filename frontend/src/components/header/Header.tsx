import React from 'react';
import HeaderActions from './HeaderActions';

import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-theme-header border-b border-theme-border" style={{ zIndex: 'var(--z-header)' }}>
      <div className="h-[var(--header-height)] h-(--header-height) px-4 md:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <button type="button" className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-theme-secondary hover:bg-theme-hover transition-colors" aria-label="Open menu">
            <Menu size={20} className="w-5 h-5" />
          </button>
        </div>
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
