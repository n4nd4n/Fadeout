import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  ChevronDown, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Baseline, 
  Highlighter, 
  Minus, 
  CornerDownLeft, 
  Link2, 
  Table, 
  Undo, 
  Redo,
  ChevronRight,
  FileText
} from 'lucide-react';
import SelectFilter from '../components/common/SelectFilter';
import api from '../utils/api';
import { cn } from '../lib/utils';

const StaticPageEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pageName, setPageName] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('active');
  const [lastUpdated, setLastUpdated] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Editor states
  const editorRef = useRef(null);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [currentFormat, setCurrentFormat] = useState('Paragraph');
  const [currentFont, setCurrentFont] = useState('Default');
  const [currentSize, setCurrentSize] = useState('Default');
  const [currentAlign, setCurrentAlign] = useState('Left');

  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  });

  const formatOptions = [
    { tag: 'p', label: 'Paragraph' },
    { tag: 'h1', label: 'Heading 1' },
    { tag: 'h2', label: 'Heading 2' },
    { tag: 'h3', label: 'Heading 3' },
    { tag: 'blockquote', label: 'Blockquote' },
    { tag: 'pre', label: 'Code Block' },
  ];

  const fontOptions = [
    { font: 'Inter', label: 'Default' },
    { font: 'Georgia', label: 'Serif' },
    { font: 'Courier New', label: 'Monospace' },
    { font: 'sans-serif', label: 'Sans-Serif' },
  ];

  const sizeOptions = [
    { size: '3', label: 'Default' },
    { size: '2', label: 'Small' },
    { size: '4', label: 'Medium' },
    { size: '5', label: 'Large' },
    { size: '6', label: 'Extra Large' },
  ];

  const alignOptions = [
    { align: 'justifyLeft', label: 'Left', icon: <AlignLeft size={14} className="mr-1" /> },
    { align: 'justifyCenter', label: 'Center', icon: <AlignCenter size={14} className="mr-1" /> },
    { align: 'justifyRight', label: 'Right', icon: <AlignRight size={14} className="mr-1" /> },
    { align: 'justifyFull', label: 'Justify', icon: <AlignJustify size={14} className="mr-1" /> },
  ];

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

  // Set initial editor content once loaded
  useEffect(() => {
    if (!loading && editorRef.current && !editorInitialized && content) {
      editorRef.current.innerHTML = content;
      setEditorInitialized(true);
    }
  }, [loading, content, editorInitialized]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const updateActiveStyles = () => {
    if (typeof document !== 'undefined') {
      setActiveStyles({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
      });
    }
  };

  const executeCommand = (command, value = null) => {
    if (value) {
      document.execCommand(command, false, value);
    } else {
      document.execCommand(command);
    }
    updateActiveStyles();
    handleInput();
  };

  const applyFormat = (tag, label) => {
    document.execCommand('formatBlock', false, tag);
    setCurrentFormat(label);
    setActiveDropdown(null);
    updateActiveStyles();
    handleInput();
  };

  const applyFont = (font, label) => {
    document.execCommand('fontName', false, font);
    setCurrentFont(label);
    setActiveDropdown(null);
    updateActiveStyles();
    handleInput();
  };

  const applySize = (size, label) => {
    document.execCommand('fontSize', false, size);
    setCurrentSize(label);
    setActiveDropdown(null);
    updateActiveStyles();
    handleInput();
  };

  const applyAlign = (align, label) => {
    document.execCommand(align);
    setCurrentAlign(label);
    setActiveDropdown(null);
    updateActiveStyles();
    handleInput();
  };

  const handleLink = () => {
    const url = prompt('Enter the link URL:');
    if (url !== null) {
      document.execCommand('createLink', false, url);
      updateActiveStyles();
      handleInput();
    }
  };

  const insertTable = () => {
    const tableHTML = `<table class="w-full border-collapse border border-neutral-300 dark:border-neutral-700 my-4">
      <thead>
        <tr class="bg-neutral-100 dark:bg-neutral-800">
          <th class="border border-neutral-300 dark:border-neutral-700 p-2 text-left">Header 1</th>
          <th class="border border-neutral-300 dark:border-neutral-700 p-2 text-left">Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-neutral-300 dark:border-neutral-700 p-2">Cell 1</td>
          <td class="border border-neutral-300 dark:border-neutral-700 p-2">Cell 2</td>
        </tr>
        <tr>
          <td class="border border-neutral-300 dark:border-neutral-700 p-2">Cell 3</td>
          <td class="border border-neutral-300 dark:border-neutral-700 p-2">Cell 4</td>
        </tr>
      </tbody>
    </table>`;
    document.execCommand('insertHTML', false, tableHTML);
    updateActiveStyles();
    handleInput();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!content.trim() || content === '<br>') {
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
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const getWordCount = () => {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, ' ');
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = () => {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, '');
    return text.length;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-24 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 font-medium">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Editor styles */}
      <style>{`
        .tiptap {
          min-height: 200px;
          outline: none;
        }
        .tiptap h1 { font-size: 1.875rem; font-weight: 800; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.2; }
        .tiptap h2 { font-size: 1.5rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.3; }
        .tiptap h3 { font-size: 1.25rem; font-weight: 700; margin-top: 1.25rem; margin-bottom: 0.5rem; line-height: 1.4; }
        .tiptap p { margin-bottom: 1rem; line-height: 1.6; }
        .tiptap ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .tiptap li { margin-bottom: 0.25rem; }
        .tiptap li p { margin-bottom: 0px; }
        .tiptap blockquote { border-left: 4px solid var(--color-brand-600, #3641f5); padding-left: 1rem; font-style: italic; margin-bottom: 1rem; color: #6B7280; }
        .tiptap pre { background-color: #F3F4F6; padding: 0.75rem; border-radius: 0.375rem; font-family: monospace; font-size: 0.875rem; overflow-x: auto; margin-bottom: 1rem; }
        .dark .tiptap pre { background-color: #1F2937; }
        .tiptap a { color: var(--color-brand-600, #3641f5); text-decoration: underline; font-weight: 600; }
        .dark .tiptap a { color: var(--color-brand-400, #7592ff); }
        .tiptap table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
        .tiptap th, .tiptap td { border: 1px solid #E5E7EB; padding: 0.5rem; text-align: left; }
        .dark .tiptap th, .dark .tiptap td { border-color: #374151; }
      `}</style>

      {/* Header and Breadcrumbs */}
      <div className="mb-3 flex-shrink-0">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white truncate">Edit Static Page</h1>
              <div className="mt-2.5 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 truncate">
                Editing: {pageName}
              </div>
              <nav className="flex items-center gap-1.5 text-xs mt-1">
                <a className="text-neutral-600 dark:text-neutral-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="/configurations/static-pages">
                  Static Pages
                </a>
                <ChevronRight size={14} className="text-neutral-400 dark:text-neutral-600" />
                <a className="text-neutral-900 dark:text-white" href={`/configurations/static-pages/${id}`}>
                  {pageName}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Form and Editor Card */}
      <div className="flex-1 min-h-0 min-w-0">
        <div className="max-w-full">
          <form onSubmit={handleSave}>
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="flex items-start gap-3 px-6 pt-6 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-brand-50 dark:bg-brand-900/20 text-brand-600 border border-brand-100 dark:border-brand-900/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">{pageName}</h2>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                    Last updated: {formatDateTime(lastUpdated)} UTC by {updatedBy || 'John Doe'}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Page Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                      Page Name <span className="text-error-500">*</span>
                    </label>
                    <input
                      placeholder="Enter title"
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 focus:ring-brand-500/10 rounded-lg text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-4 transition-all"
                      type="text"
                      value={pageName}
                      onChange={(e) => setPageName(e.target.value)}
                      name="title"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label htmlFor="slug" className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                      Slug
                    </label>
                    <input
                      id="slug"
                      readOnly
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm text-neutral-500 dark:text-neutral-400 font-mono cursor-not-allowed focus:outline-none"
                      type="text"
                      value={slug}
                      name="slug"
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                      Status
                    </label>
                    <div className="w-full max-w-[200px]">
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

                  {/* Page Content / Editor */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                      Page Content <span className="text-error-500">*</span>
                    </label>
                    
                    <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                      <div className="border border-neutral-200 dark:border-neutral-800 rounded-md py-2 pl-1.5 pr-1 space-y-2">
                        {/* Editor Toolbar */}
                        <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200 dark:border-neutral-800 pb-1 relative">
                          <div className="relative flex items-center gap-1">
                            {/* Format dropdown */}
                            <div className="relative w-28">
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'format' ? null : 'format'); }}
                                className="w-full px-3 py-1 flex items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900"
                              >
                                <span className="truncate">{currentFormat}</span>
                                <ChevronDown size={14} className="shrink-0 ml-1 text-neutral-500" />
                              </button>
                              {activeDropdown === 'format' && (
                                <div className="absolute left-0 mt-1 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50 py-1">
                                  {formatOptions.map((opt) => (
                                    <button
                                      key={opt.label}
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => applyFormat(opt.tag, opt.label)}
                                      className="w-full text-left px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium"
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Font dropdown */}
                            <div className="relative w-28">
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'font' ? null : 'font'); }}
                                className="w-full px-3 py-1 flex items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900"
                              >
                                <span className="truncate">{currentFont}</span>
                                <ChevronDown size={14} className="shrink-0 ml-1 text-neutral-500" />
                              </button>
                              {activeDropdown === 'font' && (
                                <div className="absolute left-0 mt-1 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50 py-1">
                                  {fontOptions.map((opt) => (
                                    <button
                                      key={opt.label}
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => applyFont(opt.font, opt.label)}
                                      className="w-full text-left px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium"
                                      style={{ fontFamily: opt.font }}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Size dropdown */}
                            <div className="relative w-28">
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'size' ? null : 'size'); }}
                                className="w-full px-3 py-1 flex items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900"
                              >
                                <span className="truncate">{currentSize}</span>
                                <ChevronDown size={14} className="shrink-0 ml-1 text-neutral-500" />
                              </button>
                              {activeDropdown === 'size' && (
                                <div className="absolute left-0 mt-1 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50 py-1">
                                  {sizeOptions.map((opt) => (
                                    <button
                                      key={opt.label}
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => applySize(opt.size, opt.label)}
                                      className="w-full text-left px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium"
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Align dropdown */}
                            <div className="relative w-28">
                              <button
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'align' ? null : 'align'); }}
                                className="w-full px-3 py-1 flex items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900"
                              >
                                <div className="flex items-center gap-1 truncate">
                                  {alignOptions.find(opt => opt.label === currentAlign)?.icon}
                                  <span>{currentAlign}</span>
                                </div>
                                <ChevronDown size={14} className="shrink-0 ml-1 text-neutral-500" />
                              </button>
                              {activeDropdown === 'align' && (
                                <div className="absolute left-0 mt-1 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50 py-1">
                                  {alignOptions.map((opt) => (
                                    <button
                                      key={opt.label}
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => applyAlign(opt.align, opt.label)}
                                      className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium"
                                    >
                                      {opt.icon}
                                      <span>{opt.label}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Bold */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('bold')}
                            className={cn(
                              "p-2 rounded cursor-pointer transition",
                              activeStyles.bold
                                ? "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400 font-bold"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                            title="Bold"
                          >
                            <Bold size={16} />
                          </button>

                          {/* Italic */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('italic')}
                            className={cn(
                              "p-2 rounded cursor-pointer transition",
                              activeStyles.italic
                                ? "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                            title="Italic"
                          >
                            <Italic size={16} />
                          </button>

                          {/* Underline */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('underline')}
                            className={cn(
                              "p-2 rounded cursor-pointer transition",
                              activeStyles.underline
                                ? "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                            title="Underline"
                          >
                            <Underline size={16} />
                          </button>

                          {/* Strikethrough */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('strikeThrough')}
                            className={cn(
                              "p-2 rounded cursor-pointer transition",
                              activeStyles.strikeThrough
                                ? "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                            title="Strikethrough"
                          >
                            <Strikethrough size={16} />
                          </button>

                          {/* Bullet List */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('insertUnorderedList')}
                            className={cn(
                              "p-2 rounded cursor-pointer transition",
                              activeStyles.insertUnorderedList
                                ? "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                            title="Bullet List"
                          >
                            <List size={16} />
                          </button>

                          {/* Ordered List */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('insertOrderedList')}
                            className={cn(
                              "p-2 rounded cursor-pointer transition",
                              activeStyles.insertOrderedList
                                ? "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                            title="Ordered List"
                          >
                            <ListOrdered size={16} />
                          </button>

                          {/* Blockquote */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('formatBlock', 'blockquote')}
                            className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            title="Blockquote"
                          >
                            <Quote size={16} />
                          </button>

                          {/* Code Block */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('formatBlock', 'pre')}
                            className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            title="Code Block"
                          >
                            <Code size={16} />
                          </button>

                          {/* Text Color dropdown */}
                          <div className="relative">
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'color' ? null : 'color'); }}
                              className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              title="Text Color"
                            >
                              <Baseline size={16} />
                            </button>
                            {activeDropdown === 'color' && (
                              <div className="absolute left-0 mt-1 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50 grid grid-cols-4 gap-1.5 w-36">
                                {['#000000', '#4B5563', '#EF4444', '#F97316', '#EAB308', '#16A34A', '#2563EB', '#8B5CF6'].map((color) => (
                                  <button
                                    key={color}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                      executeCommand('foreColor', color);
                                      setActiveDropdown(null);
                                    }}
                                    className="w-6 h-6 rounded-full border border-neutral-200 dark:border-neutral-700 cursor-pointer shadow-sm"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Highlight Color dropdown */}
                          <div className="relative">
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === 'highlight' ? null : 'highlight'); }}
                              className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              title="Highlight Color"
                            >
                              <Highlighter size={16} />
                            </button>
                            {activeDropdown === 'highlight' && (
                              <div className="absolute left-0 mt-1 p-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50 grid grid-cols-3 gap-1.5 w-36">
                                {[
                                  { color: 'transparent', label: 'None' },
                                  { color: '#FEF08A', label: 'Yellow' },
                                  { color: '#BBF7D0', label: 'Green' },
                                  { color: '#BFDBFE', label: 'Blue' },
                                  { color: '#FBCFE8', label: 'Pink' },
                                  { color: '#E9D5FF', label: 'Purple' }
                                ].map((item) => (
                                  <button
                                    key={item.color}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                      executeCommand('hiliteColor', item.color);
                                      setActiveDropdown(null);
                                    }}
                                    className="w-full h-6 rounded border border-neutral-200 dark:border-neutral-700 cursor-pointer text-[10px] font-medium"
                                    style={{ backgroundColor: item.color === 'transparent' ? '#FFFFFF' : item.color, color: '#000000' }}
                                  >
                                    {item.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Horizontal Rule */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('insertHorizontalRule')}
                            className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            title="Horizontal Rule"
                          >
                            <Minus size={16} />
                          </button>

                          {/* Hard Break */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => executeCommand('insertHTML', '<br>')}
                            className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            title="Hard Break"
                          >
                            <CornerDownLeft size={16} />
                          </button>

                          {/* Link */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleLink}
                            className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            title="Link"
                          >
                            <Link2 size={16} />
                          </button>

                          {/* Table */}
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={insertTable}
                            className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            title="Table"
                          >
                            <Table size={16} />
                          </button>

                          {/* Undo & Redo */}
                          <div className="ml-auto flex gap-1">
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => executeCommand('undo')}
                              className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              title="Undo"
                            >
                              <Undo size={16} />
                            </button>
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => executeCommand('redo')}
                              className="p-2 rounded cursor-pointer transition text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              title="Redo"
                            >
                              <Redo size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Editor Workspace */}
                        <div className="ProseMirror whitespace-pre-wrap px-2 py-1 h-50 overflow-y-auto focus:outline-none" style={{ minHeight: '200px' }}>
                          <div
                            ref={editorRef}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={handleInput}
                            onKeyUp={updateActiveStyles}
                            onMouseUp={updateActiveStyles}
                            className="tiptap ProseMirror prose focus:outline-none text-neutral-900 dark:text-white"
                            tabIndex={0}
                          />
                        </div>

                        {/* Counts footer */}
                        <div className="text-right text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800 pt-2 pr-2">
                          Words: {getWordCount()} | Characters: {getCharCount()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit / Discard buttons */}
                <div className="flex items-center gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => navigate('/configurations/static-pages')}
                    className="px-5 py-2 text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-white bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-all hover:bg-neutral-50 cursor-pointer outline-none"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !content.trim() || content === '<br>' || !pageName.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-all shadow-sm shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer outline-none"
                  >
                    {isSaving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaticPageEdit;
