import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, Edit3, ArrowLeft, Save, Globe, User, Clock } from 'lucide-react';
import ModuleHeader from '../components/common/ModuleHeader';
import SelectFilter from '../components/common/SelectFilter';
import api from '../utils/api';

const StaticPageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pageName, setPageName] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('active');
  const [lastUpdated, setLastUpdated] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');

  const [activeTab, setActiveTab] = useState('write'); // 'write' | 'preview'
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/static-page/detail/${id}`);
        if (response.data && response.data.success) {
          const page = response.data.data;
          setPageName(page.pageName);
          setSlug(page.slug);
          setContent(page.content);
          setStatus(page.status);
          setLastUpdated(page.lastUpdated);
          setUpdatedBy(page.updatedBy);
        } else {
          toast.error('Static page not found.');
          navigate('/configurations/static-pages');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load page details.');
        navigate('/configurations/static-pages');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPageDetail();
    }
  }, [id, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.post('/api/static-page/edit', {
        pageId: id,
        content,
        status,
      });

      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Static page updated successfully.');
        const updated = response.data.data;
        setLastUpdated(updated.lastUpdated);
        setUpdatedBy(updated.updatedBy);
        setStatus(updated.status);
        // Return to list after save
        navigate('/configurations/static-pages');
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to update static page.';
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 border border-theme-border rounded-xl bg-theme-card">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-sm text-theme-secondary font-medium">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full select-none">
      {/* Header */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/configurations/static-pages')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-theme-secondary hover:text-theme-primary transition-colors mb-3 focus:outline-none"
        >
          <ArrowLeft size={16} />
          Back to Static Pages
        </button>
        <ModuleHeader title={`Edit Page: ${pageName}`} breadcrumb="Configurations / Static Pages / Edit" />
      </div>

      {/* Editor Content Area */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Editor Body (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="border border-theme-border rounded-xl bg-theme-card overflow-hidden shadow-sm flex flex-col min-h-[500px]">
            {/* Tab selection */}
            <div className="flex items-center justify-between border-b border-theme-border px-4 py-2 bg-theme-sidebar">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors focus:outline-none ${
                    activeTab === 'write'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-theme-secondary hover:bg-theme-hover hover:text-theme-primary'
                  }`}
                >
                  <Edit3 size={14} />
                  Write HTML
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors focus:outline-none ${
                    activeTab === 'preview'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-theme-secondary hover:bg-theme-hover hover:text-theme-primary'
                  }`}
                >
                  <Eye size={14} />
                  Preview
                </button>
              </div>
            </div>

            {/* Editor Workspace */}
            <div className="flex-1 flex flex-col">
              {activeTab === 'write' ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter page content in HTML format..."
                  className="flex-1 min-h-[400px] w-full p-4 font-mono text-sm border-none bg-theme-card text-theme-primary focus:outline-none focus:ring-0 resize-y"
                  style={{ outline: 'none' }}
                />
              ) : (
                <div className="flex-1 p-6 bg-white dark:bg-neutral-900 overflow-y-auto max-h-[600px]">
                  {content.trim() ? (
                    <article
                      className="prose prose-neutral dark:prose-invert max-w-none text-theme-primary"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
                      <Eye size={36} className="mb-2 opacity-50" />
                      <p className="text-sm font-medium">Nothing to preview. Enter some HTML content first.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Meta details and Settings (1/3 width) */}
        <div className="flex flex-col gap-4">
          <div className="border border-theme-border rounded-xl bg-theme-card p-5 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-theme-primary border-b border-theme-border pb-2">
              Page Settings & Meta
            </h3>

            {/* Page Name */}
            <div>
              <label className="block text-xs font-semibold text-theme-secondary tracking-wider mb-1.5 uppercase">
                Page Name
              </label>
              <input
                type="text"
                value={pageName}
                readOnly
                className="w-full px-3 py-2 border border-theme-border rounded-lg bg-theme-hover text-theme-primary text-sm font-medium cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-theme-secondary tracking-wider mb-1.5 uppercase">
                Slug / Code
              </label>
              <div className="flex items-center gap-2 w-full px-3 py-2 border border-theme-border rounded-lg bg-theme-hover text-theme-primary text-sm font-medium cursor-not-allowed">
                <Globe size={14} className="text-theme-secondary shrink-0" />
                <span className="truncate select-all">{slug}</span>
              </div>
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-xs font-semibold text-theme-secondary tracking-wider mb-1.5 uppercase">
                Status
              </label>
              <div className="w-full">
                <SelectFilter
                  value={status}
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                  onChange={setStatus}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-theme-border my-1"></div>

            {/* Last Updated By / Time */}
            <div className="flex flex-col gap-2.5 text-xs font-medium text-theme-secondary">
              <div className="flex items-center gap-2">
                <User size={14} className="shrink-0" />
                <span>Updated By: <strong className="text-theme-primary">{updatedBy || 'System'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="shrink-0" />
                <span>Last Updated: <strong className="text-theme-primary">{formatDateTime(lastUpdated)}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-col gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all focus:outline-none shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Page
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/configurations/static-pages')}
                className="w-full h-10 inline-flex items-center justify-center rounded-lg border border-theme-border bg-theme-card text-theme-secondary hover:bg-theme-hover font-semibold text-sm transition-all focus:outline-none cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StaticPageEdit;
