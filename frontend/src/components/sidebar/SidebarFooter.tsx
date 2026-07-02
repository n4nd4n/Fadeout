import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';

const SidebarFooter: React.FC = () => {
  const { logout, user } = useAuth();
  const { isCollapsed, setIsChangePasswordOpen } = useSidebar();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  if (isCollapsed) {
    return (
      <div className="relative mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 min-h-[var(--listing-footer-height)] py-2 flex items-center justify-center select-none" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full px-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
        >
          <div className="w-10 h-10 text-sm rounded-full flex items-center justify-center text-white font-medium overflow-hidden bg-brand-600 shrink-0">
            {getInitials()}
          </div>
        </button>

        {isOpen && (
          <div className="absolute left-full bottom-2 ml-2 w-72 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl overflow-hidden z-50">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start gap-3">
                <div className="relative w-14 h-14 shrink-0">
                  <div
                    className="w-14 h-14 text-base rounded-full flex items-center justify-center text-white font-medium overflow-hidden transition-all bg-brand-600"
                    style={{ backgroundColor: 'var(--color-brand-600)' }}
                  >
                    {getInitials()}
                  </div>
                  <div
                    className="absolute -bottom-1 -left-1 w-3 h-3 bg-brand-400 rounded-full border-2 border-white dark:border-neutral-950 animate-pulse"
                    style={{ boxShadow: '0 0 8px var(--color-brand-400)' }}
                  ></div>
                  <div
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-white dark:border-neutral-950"
                    style={{ boxShadow: '0 0 6px var(--color-brand-500)' }}
                  ></div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-sm font-medium text-neutral-900 dark:text-white mb-0.5 truncate">
                    {displayName}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1 truncate">
                    {displayEmail}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/my-profile');
                }}
                className="w-full px-3 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>My Profile</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsChangePasswordOpen(true);
                }}
                className="w-full px-3 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-key-round w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </svg>
                <span>Change Password</span>
              </button>
            </div>
            <div className="p-1 border-t border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={logout}
                className="w-full px-3 py-2 text-left text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950 rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="m16 17 5-5-5-5"></path>
                  <path d="M21 12H9"></path>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative mt-auto border-t border-theme-border bg-theme-sidebar min-h-[var(--listing-footer-height)] py-2 flex items-center select-none" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full px-3 hover:bg-theme-hover transition-colors focus:outline-none flex items-center cursor-pointer"
      >
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
          <ChevronUp size={16} className={`text-theme-secondary shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-4 mb-2 w-72 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-start gap-3">
              <div className="relative w-14 h-14 shrink-0">
                <div
                  className="w-14 h-14 text-base rounded-full flex items-center justify-center text-white font-medium overflow-hidden transition-all bg-brand-600"
                  style={{ backgroundColor: 'var(--color-brand-600)' }}
                >
                  {getInitials()}
                </div>
                <div
                  className="absolute -bottom-1 -left-1 w-3 h-3 bg-brand-400 rounded-full border-2 border-white dark:border-neutral-950 animate-pulse"
                  style={{ boxShadow: '0 0 8px var(--color-brand-400)' }}
                ></div>
                <div
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-500 rounded-full border-2 border-white dark:border-neutral-950"
                  style={{ boxShadow: '0 0 6px var(--color-brand-500)' }}
                ></div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-medium text-neutral-900 dark:text-white mb-0.5 truncate">
                  {displayName}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1 truncate">
                  {displayEmail}
                </div>
              </div>
            </div>
          </div>
          <div className="p-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate('/my-profile');
              }}
              className="w-full px-3 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user w-4 h-4"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>My Profile</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsChangePasswordOpen(true);
              }}
              className="w-full px-3 py-2 text-left text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-key-round w-4 h-4"
                aria-hidden="true"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </svg>
              <span>Change Password</span>
            </button>
          </div>
          <div className="p-1 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={logout}
              className="w-full px-3 py-2 text-left text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950 rounded transition-colors flex items-center gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out w-4 h-4"
                aria-hidden="true"
              >
                <path d="m16 17 5-5-5-5"></path>
                <path d="M21 12H9"></path>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
