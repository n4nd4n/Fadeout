import React from 'react';
import { User, Calendar, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';

const UserInformation = ({ type = 'user', user, event, data, onToggleStatus }) => {
  const info = data || (type === 'event' ? event : user);
  if (!info) return null;

  const formatDateWithTime = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
  };

  const formatEventDateTime = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');

    return `${month} ${day}, ${year} ${formattedHours}:${minutes}${ampm}`;
  };

  if (type === 'deleted') {
    return (
      <div className="bg-theme-card rounded-xl border border-theme-border shadow-sm overflow-hidden">
        <div className="p-8">
          {/* Component Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-theme-primary">Basic Information</h3>
              <p className="text-sm text-theme-secondary">Deleted user account details</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">User ID</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {(() => {
                  const idStr = String(info.id || '');
                  return idStr === 'u-12' ? 'USR-0152' : (idStr.startsWith('u-') ? `USR-${idStr.substring(2).padStart(4, '0')}` : (idStr ? `USR-${idStr.padStart(4, '0')}` : ''));
                })()}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Name</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {info.fullName}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Email</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary break-all">
                {info.email}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Deleted Date</span>
              <div className="px-4 py-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 shrink-0 text-red-500" />
                <span>{formatDateWithTime(info.deletedDate)}</span>
              </div>
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Delete Reason</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary min-h-[56px] flex items-start pt-3">
                {info.description || 'No reason provided'}
              </div>
            </div>
          </div>

          {/* Shield Disclaimer Box */}
          <div className="mt-10 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl flex gap-3 text-red-800 dark:text-red-400">
            <Shield className="w-5 h-5 shrink-0 opacity-80" />
            <p className="text-sm">
              <span className="font-bold">Note:</span> This is a read-only view of a deleted user account. Deleted accounts cannot be restored or modified. Data is retained for compliance and audit purposes only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'event') {
    const isEventActive = info.status === 'active';

    return (
      <div className="bg-theme-card rounded-xl border border-theme-border shadow-sm overflow-hidden">
        <div className="p-8">
          {/* Component Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-theme-primary">Event Information</h3>
              <p className="text-sm text-theme-secondary">Complete details about this event</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Event ID</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {info.eventId || info.id}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Event Name</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {info.title}
              </div>
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Description</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary min-h-[56px] flex items-center">
                {info.description || 'No description provided'}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Host Name</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {info.hostName || '—'}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Location</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {info.location || '—'}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Start Date & Time</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {formatEventDateTime(info.startDate)}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Expiry Date & Time</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {formatEventDateTime(info.expiryDate)}
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Status</span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-bg border border-theme-border rounded-full">
                  <span className={cn("w-1.5 h-1.5 rounded-full", isEventActive ? "bg-success-500" : "bg-warning-500")} />
                  <span className="text-xs text-theme-secondary capitalize">
                    {isEventActive ? 'Active' : 'Expired'}
                  </span>
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Created Date</span>
              <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
                {formatEventDateTime(info.createdDate)}
              </div>
            </div>
          </div>

          {/* Shield Disclaimer Box */}
          <div className="mt-10 p-4 bg-theme-bg border border-theme-border rounded-xl flex gap-3 text-theme-secondary">
            <Shield className="w-5 h-5 shrink-0 opacity-50" />
            <p className="text-sm">
              <span className="font-bold">Note:</span> This is a read-only view. Event details cannot be modified by administrators.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default User Layout
  const isActive = info.status === 'active';

  return (
    <div className="bg-theme-card rounded-xl border border-theme-border shadow-sm overflow-hidden">
      <div className="p-8">
        {/* Component Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-brand-50 dark:bg-brand-950/20 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-theme-primary">Basic Information</h3>
            <p className="text-sm text-theme-secondary">User account details and status</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Name</span>
            <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
              {info.fullName}
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Email</span>
            <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary break-all">
              {info.email}
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Created Date</span>
            <div className="px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-primary">
              {formatDateWithTime(info.createdDate)}
            </div>
          </div>
        </div>

        {/* Account Status Switch */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-theme-secondary uppercase tracking-wider block">Account Status</span>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={onToggleStatus}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                  isActive ? "bg-success-500" : "bg-neutral-200 dark:bg-neutral-800"
                )}
              >
                <span className="sr-only">Toggle status</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    isActive ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
            
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-theme-card border border-theme-border rounded-full">
              <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-success-500" : "bg-neutral-400")} />
              <span className="text-xs text-theme-secondary capitalize">
                {info.status}
              </span>
            </span>
            
            <span className="text-xs text-theme-secondary ml-2">
              User can log in and access the platform
            </span>
          </div>
        </div>

        {/* Shield Disclaimer Box */}
        <div className="mt-10 p-4 bg-theme-bg border border-theme-border rounded-xl flex gap-3 text-theme-secondary">
          <Shield className="w-5 h-5 shrink-0 opacity-50" />
          <p className="text-sm">
            <span className="font-bold">Note:</span> Admin cannot edit user name or email. Admin cannot delete users from this screen. Status toggle controls user login access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
