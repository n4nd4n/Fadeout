import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Settings, 
  ChevronRight,
  Upload,
  X,
  Lock,
  Clock,
  AppWindow,
  FileImage,
  Eye,
  Info
} from 'lucide-react';
import api from '../utils/api';

const SystemSettings = () => {
  const navigate = useNavigate();

  // Core configuration states
  const [companyName, setCompanyName] = useState('');
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(30);
  const [copyrightText, setCopyrightText] = useState('');
  const [androidAppVersion, setAndroidAppVersion] = useState('1.0.0');
  const [androidForceUpdate, setAndroidForceUpdate] = useState(false);
  const [iosAppVersion, setIosAppVersion] = useState('1.0.0');
  const [iosForceUpdate, setIosForceUpdate] = useState(false);
  const [logoPath, setLogoPath] = useState('');
  const [faviconPath, setFaviconPath] = useState('');

  // File upload states
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [faviconPreview, setFaviconPreview] = useState('');

  // UI state
  const [initialState, setInitialState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  // File input refs
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBaseUrl}${cleanPath}`;
  };

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/system-setting');
        if (response.data && response.data.success) {
          const s = response.data.data;
          setCompanyName(s.companyName || '');
          setMaxLoginAttempts(s.maxLoginAttempts ?? 5);
          setSessionTimeoutMinutes(s.sessionTimeoutMinutes ?? 30);
          setCopyrightText(s.copyrightText || '');
          setAndroidAppVersion(s.androidAppVersion || '1.0.0');
          setAndroidForceUpdate(s.androidForceUpdate ?? false);
          setIosAppVersion(s.iosAppVersion || '1.0.0');
          setIosForceUpdate(s.iosForceUpdate ?? false);
          setLogoPath(s.logoPath || '');
          setFaviconPath(s.faviconPath || '');

          const stateObj = {
            companyName: s.companyName || '',
            maxLoginAttempts: s.maxLoginAttempts ?? 5,
            sessionTimeoutMinutes: s.sessionTimeoutMinutes ?? 30,
            copyrightText: s.copyrightText || '',
            androidAppVersion: s.androidAppVersion || '1.0.0',
            androidForceUpdate: s.androidForceUpdate ?? false,
            iosAppVersion: s.iosAppVersion || '1.0.0',
            iosForceUpdate: s.iosForceUpdate ?? false,
            logoPath: s.logoPath || '',
            faviconPath: s.faviconPath || ''
          };
          setInitialState(stateObj);
        } else {
          toast.error('Failed to load system settings.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error fetching system settings.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Cleanup object URLs on unmount/change
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  useEffect(() => {
    return () => {
      if (faviconPreview) URL.revokeObjectURL(faviconPreview);
    };
  }, [faviconPreview]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo file size must not exceed 2MB.');
      return;
    }

    setLogoFile(file);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error('Favicon file size must not exceed 1MB.');
      return;
    }

    setFaviconFile(file);
    if (faviconPreview) URL.revokeObjectURL(faviconPreview);
    setFaviconPreview(URL.createObjectURL(file));
  };

  const isDirty = () => {
    if (!initialState) return false;
    return (
      companyName !== initialState.companyName ||
      Number(maxLoginAttempts) !== Number(initialState.maxLoginAttempts) ||
      Number(sessionTimeoutMinutes) !== Number(initialState.sessionTimeoutMinutes) ||
      copyrightText !== initialState.copyrightText ||
      androidAppVersion !== initialState.androidAppVersion ||
      androidForceUpdate !== initialState.androidForceUpdate ||
      iosAppVersion !== initialState.iosAppVersion ||
      iosForceUpdate !== initialState.iosForceUpdate ||
      logoFile !== null ||
      faviconFile !== null
    );
  };

  const handleCancel = () => {
    if (initialState) {
      setCompanyName(initialState.companyName);
      setMaxLoginAttempts(initialState.maxLoginAttempts);
      setSessionTimeoutMinutes(initialState.sessionTimeoutMinutes);
      setCopyrightText(initialState.copyrightText);
      setAndroidAppVersion(initialState.androidAppVersion);
      setAndroidForceUpdate(initialState.androidForceUpdate);
      setIosAppVersion(initialState.iosAppVersion);
      setIosForceUpdate(initialState.iosForceUpdate);
      setLogoFile(null);
      setFaviconFile(null);
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (faviconPreview) URL.revokeObjectURL(faviconPreview);
      setLogoPreview('');
      setFaviconPreview('');
      toast.info('Changes discarded.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error('Company Name is required.');
      return;
    }
    if (!copyrightText.trim()) {
      toast.error('Copyright Text is required.');
      return;
    }
    if (!androidAppVersion.trim()) {
      toast.error('Android App Version is required.');
      return;
    }
    if (!iosAppVersion.trim()) {
      toast.error('iOS App Version is required.');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append('companyName', companyName);
      formData.append('maxLoginAttempts', maxLoginAttempts.toString());
      formData.append('sessionTimeoutMinutes', sessionTimeoutMinutes.toString());
      formData.append('copyrightText', copyrightText);
      formData.append('androidAppVersion', androidAppVersion);
      formData.append('androidForceUpdate', androidForceUpdate.toString());
      formData.append('iosAppVersion', iosAppVersion);
      formData.append('iosForceUpdate', iosForceUpdate.toString());

      if (logoFile) {
        formData.append('logo', logoFile);
      }
      if (faviconFile) {
        formData.append('favicon', faviconFile);
      }

      const response = await api.post('/api/system-setting/edit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.success) {
        toast.success('System settings updated successfully.');
        const s = response.data.data;
        
        // Reset file selections
        setLogoFile(null);
        setFaviconFile(null);
        setLogoPreview('');
        setFaviconPreview('');

        // Update local paths
        setLogoPath(s.logoPath || '');
        setFaviconPath(s.faviconPath || '');

        // Sync initial state
        const stateObj = {
          companyName: s.companyName || '',
          maxLoginAttempts: s.maxLoginAttempts ?? 5,
          sessionTimeoutMinutes: s.sessionTimeoutMinutes ?? 30,
          copyrightText: s.copyrightText || '',
          androidAppVersion: s.androidAppVersion || '1.0.0',
          androidForceUpdate: s.androidForceUpdate ?? false,
          iosAppVersion: s.iosAppVersion || '1.0.0',
          iosForceUpdate: s.iosForceUpdate ?? false,
          logoPath: s.logoPath || '',
          faviconPath: s.faviconPath || ''
        };
        setInitialState(stateObj);
        window.dispatchEvent(new Event('system-settings-updated'));
      } else {
        toast.error(response.data?.message || 'Failed to update settings.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error saving changes.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 bg-white dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Loading configurations...</p>
        </div>
      </div>
    );
  }

  const dirty = isDirty();

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col bg-white dark:bg-neutral-950">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto custom-scroll px-6 pt-3 pb-4">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white truncate">System Settings</h1>
                <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 truncate">
                  Manage global branding and security configuration
                </div>
                <nav className="flex items-center gap-1.5 text-xs mt-2">
                  <span className="text-neutral-500 dark:text-neutral-400">Home</span>
                  <ChevronRight size={14} className="text-neutral-400" />
                  <span className="text-neutral-500 dark:text-neutral-400">Configurations</span>
                  <ChevronRight size={14} className="text-neutral-400" />
                  <span className="text-neutral-900 dark:text-white font-medium">System Settings</span>
                </nav>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Global Card */}
            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              {/* Card Header */}
              <div className="border-b border-neutral-200 px-6 py-5 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-brand-600 dark:border-brand-900/30 dark:bg-brand-900/20">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white">Global Configuration</h2>
                    <p className="mt-0.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      Configure branding, security settings, and system assets. Changes will apply system-wide immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-8 px-6 py-6">
                
                {/* Branding Section */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Branding</h3>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      maxLength={150} 
                      className="w-full rounded-lg border px-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-4 dark:bg-neutral-900 dark:text-white border-neutral-200 focus:border-brand-500 focus:ring-brand-100 dark:border-neutral-700 dark:focus:ring-brand-900/30" 
                      placeholder="Enter company name" 
                      type="text" 
                      name="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <div className="mt-1.5 flex items-center justify-between">
                      <span></span>
                      <p className="text-xs text-neutral-500">{companyName.length}/150 characters</p>
                    </div>
                  </div>
                </section>

                {/* Security Section */}
                <section className="space-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Security</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Maximum Login Attempts <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                        <input 
                          min={1} 
                          step={1} 
                          className="w-full rounded-lg border pl-9 pr-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-4 dark:bg-neutral-900 dark:text-white border-neutral-200 focus:border-brand-500 focus:ring-brand-100 dark:border-neutral-700 dark:focus:ring-brand-900/30" 
                          type="number" 
                          name="maxLoginAttempts"
                          value={maxLoginAttempts}
                          onChange={(e) => setMaxLoginAttempts(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Session Timeout (minutes) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Clock size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                        <input 
                          min={1} 
                          step={1} 
                          className="w-full rounded-lg border pl-9 pr-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-4 dark:bg-neutral-900 dark:text-white border-neutral-200 focus:border-brand-500 focus:ring-brand-100 dark:border-neutral-700 dark:focus:ring-brand-900/30" 
                          type="number" 
                          name="sessionTimeoutMinutes"
                          value={sessionTimeoutMinutes}
                          onChange={(e) => setSessionTimeoutMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Footer Section */}
                <section className="space-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Footer</h3>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Copyright Text <span className="text-red-500">*</span>
                    </label>
                    <input 
                      maxLength={200} 
                      className="w-full rounded-lg border px-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-4 dark:bg-neutral-900 dark:text-white border-neutral-200 focus:border-brand-500 focus:ring-brand-100 dark:border-neutral-700 dark:focus:ring-brand-900/30" 
                      placeholder="Enter copyright text" 
                      type="text" 
                      name="copyrightText"
                      value={copyrightText}
                      onChange={(e) => setCopyrightText(e.target.value)}
                    />
                    <div className="mt-1.5 flex items-center justify-between">
                      <span></span>
                      <p className="text-xs text-neutral-500">{copyrightText.length}/200 characters</p>
                    </div>
                  </div>
                </section>

                {/* Mobile App Versions Section */}
                <section className="space-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Mobile App Versions</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Android version controls */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                          Android App Version <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <AppWindow size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                          <input 
                            maxLength={32} 
                            className="w-full rounded-lg border pl-9 pr-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-4 dark:bg-neutral-900 dark:text-white border-neutral-200 focus:border-brand-500 focus:ring-brand-100 dark:border-neutral-700 dark:focus:ring-brand-900/30" 
                            placeholder="e.g. 1.0.0" 
                            type="text" 
                            name="androidAppVersion"
                            value={androidAppVersion}
                            onChange={(e) => setAndroidAppVersion(e.target.value)}
                          />
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span></span>
                          <p className="text-xs text-neutral-500">{androidAppVersion.length}/32 characters</p>
                        </div>
                      </div>
                      <label className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 cursor-pointer transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Force Android Update</p>
                          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Require Android users on older app versions to update.</p>
                        </div>
                        <input 
                          className="h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500 cursor-pointer" 
                          type="checkbox" 
                          name="androidForceUpdate"
                          checked={androidForceUpdate}
                          onChange={(e) => setAndroidForceUpdate(e.target.checked)}
                        />
                      </label>
                    </div>

                    {/* iOS version controls */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                          iOS App Version <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <AppWindow size={16} className="absolute left-3 top-2.5 text-neutral-400" />
                          <input 
                            maxLength={32} 
                            className="w-full rounded-lg border pl-9 pr-3 py-2 text-sm text-neutral-900 outline-none transition focus:ring-4 dark:bg-neutral-900 dark:text-white border-neutral-200 focus:border-brand-500 focus:ring-brand-100 dark:border-neutral-700 dark:focus:ring-brand-900/30" 
                            placeholder="e.g. 1.0.0" 
                            type="text" 
                            name="iosAppVersion"
                            value={iosAppVersion}
                            onChange={(e) => setIosAppVersion(e.target.value)}
                          />
                        </div>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span></span>
                          <p className="text-xs text-neutral-500">{iosAppVersion.length}/32 characters</p>
                        </div>
                      </div>
                      <label className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 cursor-pointer transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Force iOS Update</p>
                          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Require iOS users on older app versions to update.</p>
                        </div>
                        <input 
                          className="h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500 cursor-pointer" 
                          type="checkbox" 
                          name="iosForceUpdate"
                          checked={iosForceUpdate}
                          onChange={(e) => setIosForceUpdate(e.target.checked)}
                        />
                      </label>
                    </div>
                  </div>
                </section>

                {/* Assets Section */}
                <section className="space-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Assets</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Logo Section */}
                    <div className="rounded-xl border border-neutral-100 dark:border-neutral-800/80 p-4 bg-neutral-50/40 dark:bg-neutral-900/10">
                      <label className="mb-2 block text-xs font-bold text-neutral-800 dark:text-neutral-200">Logo Upload</label>
                      <div className="flex min-h-12 items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2 dark:bg-neutral-900 dark:border-neutral-700">
                        <input 
                          ref={logoInputRef}
                          accept=".png,.jpg,.jpeg" 
                          className="hidden" 
                          type="file"
                          onChange={handleLogoChange}
                        />
                        <button 
                          type="button" 
                          onClick={() => logoInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700/80 transition"
                        >
                          <Upload size={13} />
                          Upload Logo
                        </button>
                        <span className="truncate text-xs text-neutral-500 flex-1">
                          {logoFile ? logoFile.name : (logoPath ? 'Logo already configured' : 'No logo selected')}
                        </span>
                        {logoFile && (
                          <button 
                            type="button" 
                            onClick={() => { setLogoFile(null); setLogoPreview(''); }}
                            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-400 hover:text-neutral-600"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                      <p className="mt-2 text-[10px] text-neutral-500 dark:text-neutral-400">PNG or JPG • Max 2MB</p>
                      
                      {/* Logo Preview */}
                      {(logoPreview || logoPath) && (
                        <div className="mt-4 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800/50 bg-white dark:bg-neutral-900">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">Logo Preview</p>
                          <div className="flex items-center gap-4">
                            <button 
                              type="button" 
                              onClick={() => setZoomImage(logoPreview || getFullUrl(logoPath))}
                              className="group relative cursor-zoom-in rounded border border-neutral-100 bg-neutral-50 dark:bg-neutral-950 p-2 flex items-center justify-center min-h-[48px] max-h-[80px]"
                              aria-label="Preview Logo"
                            >
                              <img 
                                alt="Logo Preview" 
                                className="h-10 w-auto max-w-full object-contain transition-transform group-hover:scale-[1.03]" 
                                src={logoPreview || getFullUrl(logoPath)} 
                              />
                              <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                <Eye size={14} className="text-white drop-shadow" />
                              </div>
                            </button>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                              {logoFile ? 'Selected File' : 'Active settings logo'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Favicon Section */}
                    <div className="rounded-xl border border-neutral-100 dark:border-neutral-800/80 p-4 bg-neutral-50/40 dark:bg-neutral-900/10">
                      <label className="mb-2 block text-xs font-bold text-neutral-800 dark:text-neutral-200">Favicon Upload</label>
                      <div className="flex min-h-12 items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2 dark:bg-neutral-900 dark:border-neutral-700">
                        <input 
                          ref={faviconInputRef}
                          accept=".ico,.png" 
                          className="hidden" 
                          type="file"
                          onChange={handleFaviconChange}
                        />
                        <button 
                          type="button" 
                          onClick={() => faviconInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700/80 transition"
                        >
                          <Upload size={13} />
                          Upload Favicon
                        </button>
                        <span className="truncate text-xs text-neutral-500 flex-1">
                          {faviconFile ? faviconFile.name : (faviconPath ? 'Favicon already configured' : 'No favicon selected')}
                        </span>
                        {faviconFile && (
                          <button 
                            type="button" 
                            onClick={() => { setFaviconFile(null); setFaviconPreview(''); }}
                            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-400 hover:text-neutral-600"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                      <p className="mt-2 text-[10px] text-neutral-500 dark:text-neutral-400">ICO or PNG • Max 1MB</p>

                      {/* Favicon Preview */}
                      {(faviconPreview || faviconPath) && (
                        <div className="mt-4 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800/50 bg-white dark:bg-neutral-900">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">Favicon Preview</p>
                          <div className="flex items-center gap-4">
                            <button 
                              type="button" 
                              onClick={() => setZoomImage(faviconPreview || getFullUrl(faviconPath))}
                              className="group relative cursor-zoom-in rounded border border-neutral-100 bg-neutral-50 dark:bg-neutral-950 p-2 flex items-center justify-center"
                              aria-label="Preview Favicon"
                            >
                              <img 
                                alt="Favicon Preview" 
                                className="h-8 w-8 object-contain transition-transform group-hover:scale-[1.05]" 
                                src={faviconPreview || getFullUrl(faviconPath)} 
                              />
                              <div className="absolute inset-0 bg-neutral-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                                <Eye size={12} className="text-white drop-shadow" />
                              </div>
                            </button>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                              {faviconFile ? 'Selected File' : 'Active settings favicon'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Footer Save / Cancel Buttons */}
                <div className="flex items-center gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    disabled={!dirty || isSaving}
                    className="inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={!dirty || isSaving}
                    className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>

            {/* Note alert */}
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 flex items-start gap-2 shadow-sm">
              <Info size={14} className="text-neutral-400 mt-0.5 shrink-0" />
              <span>Note: There is a single global settings record. Any changes will overwrite the previous configuration and apply system-wide immediately after saving.</span>
            </div>
          </form>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-w-3xl max-h-[80vh] bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <button 
              type="button" 
              onClick={() => setZoomImage(null)}
              className="absolute right-4 top-4 p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300 rounded-full transition"
            >
              <X size={18} />
            </button>
            <div className="flex items-center justify-center overflow-hidden p-4">
              <img 
                src={zoomImage} 
                alt="Zoomed preview" 
                className="max-w-full max-h-[60vh] object-contain rounded" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
