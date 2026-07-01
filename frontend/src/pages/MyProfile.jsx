import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { User, Mail, ChevronRight } from 'lucide-react';
import api from '../utils/api';

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, checkAuth } = useAuth();

  // Local state for profile form
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Initialize input value with user data
  useEffect(() => {
    if (user?.fullName) {
      setName(user.fullName);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name field is required.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.put('/admin/profile', { fullName: name });
      if (response.data) {
        toast.success('Profile updated successfully.');
        // Refresh AuthContext user state to update header & sidebar footer
        await checkAuth();
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to current name and navigate to dashboard
    if (user?.fullName) {
      setName(user.fullName);
    }
    navigate('/dashboard');
  };

  return (
    <section className="w-full h-full min-h-0 min-w-0 bg-white dark:bg-neutral-950">
      <div className="flex h-full min-h-0 min-w-0 flex-col [--page-padding-x:24px] [--page-padding-top:12px] [--page-padding-bottom:16px] px-[var(--page-padding-x)] pt-[var(--page-padding-top)] pb-[var(--page-padding-bottom)]">
        
        {/* Page Header / Breadcrumbs */}
        <div className="mb-3 flex-shrink-0">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white truncate">My Profile</h1>
                <nav className="flex items-center gap-1.5 text-xs mt-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Profile</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600" aria-hidden="true" />
                  <a className="text-neutral-900 dark:text-white hover:underline" href="/my-profile" onClick={(e) => e.preventDefault()}>My Profile</a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-h-0 min-w-0">
          <div className="flex flex-col gap-4">
            
            {/* Profile Info Form Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm max-w-xl">
              
              {/* Form Title & Icon */}
              <div className="flex items-start gap-3 p-5 border-b border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-brand-100 dark:bg-brand-900/40 text-brand-500">
                  <User className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Profile Information</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Update your account information. Your email address cannot be changed for security reasons.
                  </p>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit}>
                <div className="p-5 space-y-4">
                  
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Name <span className="text-error-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" aria-hidden="true" />
                      <input
                        id="name"
                        placeholder="Name"
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition"
                        type="text"
                        name="name"
                      />
                    </div>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                      {name.length}/100 characters
                    </p>
                  </div>

                  {/* Email Field (Disabled) */}
                  <div>
                    <label htmlFor="email" className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" aria-hidden="true" />
                      <input
                        id="email"
                        placeholder="Email"
                        value={user?.email || ''}
                        disabled
                        className="w-full h-10 pl-9 pr-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
                        type="email"
                        name="email"
                      />
                    </div>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                      Your email address cannot be changed for security reasons
                    </p>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-2 px-5 py-4 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors border border-neutral-200 dark:border-neutral-800 rounded-lg cursor-pointer outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !name.trim() || name === user?.fullName}
                    className="px-5 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer outline-none"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>

            {/* Note Card */}
            <div className="max-w-xl bg-gray-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 shadow-sm">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">Note:</span> updating your profile will not log you out from any of your active sessions. If you need to change your email address, <span className="text-brand-500">please contact your system administrator</span>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default MyProfile;
