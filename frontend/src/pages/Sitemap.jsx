import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  return (
    <>
      {/* Module Header */}
      <div className="mb-3 flex-shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white truncate">Sitemap</h1>
            <nav className="flex items-center gap-1.5 text-xs mt-1">
              <Link className="text-neutral-900 dark:text-white hover:underline" to="/sitemap">
                Sitemap
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Grid container */}
      <div className="flex-1 min-h-0 min-w-0">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Dashboard Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-2.5 px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800">
                <LayoutDashboard className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] flex-shrink-0" size={18} />
                <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Dashboard</h2>
              </div>
              <ul className="px-4 py-3 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Management Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-2.5 px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800">
                <Users className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] flex-shrink-0" size={18} />
                <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">User Management</h2>
              </div>
              <ul className="px-4 py-3 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/users/list">
                    Users
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/users/deleted">
                    Deleted Users
                  </Link>
                </li>
              </ul>
            </div>

            {/* Event Management Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-2.5 px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800">
                <Calendar className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] flex-shrink-0" size={18} />
                <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Event Management</h2>
              </div>
              <ul className="px-4 py-3 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/events">
                    Event Management
                  </Link>
                </li>
              </ul>
            </div>

            {/* Configurations Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-2.5 px-4 py-3 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800">
                <Settings className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] flex-shrink-0" size={18} />
                <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">Configurations</h2>
              </div>
              <ul className="px-4 py-3 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/configurations/static-pages">
                    Static Pages
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/configurations/email-notifications">
                    Email Notifications
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/configurations/system-notifications">
                    System Notifications
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/configurations/push-notifications">
                    Push Notifications
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] flex-shrink-0"></span>
                  <Link className="text-sm text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)] hover:text-[var(--color-brand-800)] dark:hover:text-[var(--color-brand-300)] hover:underline transition-colors" to="/configurations/system-settings">
                    System Settings
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
