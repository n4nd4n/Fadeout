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
  Minus, 
  Link2, 
  Undo, 
  Redo,
  ChevronRight,
  Bell,
  Copy
} from 'lucide-react';
import SelectFilter from '../components/common/SelectFilter';
import api from '../utils/api';
import { cn } from '../lib/utils';

const SystemNotificationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [templateId, setTemplateId] = useState('');
  const [templateCode, setTemplateCode] = useState('');
  const [templateTitle, setTemplateTitle] = useState('');
  const [body, setBody] = useState('');
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
  ];

  const fontOptions = [
    { font: 'Inter', label: 'Default' },
    { font: 'Georgia', label: 'Serif' },
    { font: 'Courier New', label: 'Monospace' },
  ];

  const alignOptions = [
    { align: 'justifyLeft', label: 'Left', icon: <AlignLeft size={14} className="mr-1" /> },
    { align: 'justifyCenter', label: 'Center', icon: <AlignCenter size={14} className="mr-1" /> },
    { align: 'justifyRight', label: 'Right', icon: <AlignRight size={14} className="mr-1" /> },
    { align: 'justifyFull', label: 'Justify', icon: <AlignJustify size={14} className="mr-1" /> },
  ];

  const variables = [
    { tag: '{{user_name}}', desc: 'Recipient name' },
    { tag: '{{host_name}}', desc: 'Event host name' },
    { tag: '{{event_name}}', desc: 'Name of the event' },
    { tag: '{{participant_name}}', desc: 'Event participant name' },
    { tag: '{{verification_link}}', desc: 'Sign up verification link' },
    { tag: '{{otp}}', desc: 'One-time password code' },
    { tag: '{{cohost_name}}', desc: 'Name of the co-host' }
  ];

  useEffect(() => {
    const fetchTemplateDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/system-notification/detail/${id}`);
        if (response.data && response.data.success) {
          const t = response.data.data;
          setTemplateId(t.templateId);
          setTemplateCode(t.templateCode);
          setTemplateTitle(t.templateTitle);
          setBody(t.body || '');
          setStatus(t.status);
          setLastUpdated(t.lastUpdated);
          setUpdatedBy(t.updatedBy);
        } else {
          toast.error('System notification template not found.');
          navigate('/configurations/system-notifications');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to load system notification details.');
        navigate('/configurations/system-notifications');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTemplateDetail();
    }
  }, [id, navigate]);

  // Set initial editor content once loaded
  useEffect(() => {
    if (!loading && editorRef.current && !editorInitialized && body) {
      editorRef.current.innerHTML = body;
      setEditorInitialized(true);
    }
  }, [loading, body, editorInitialized]);

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
      setBody(editorRef.current.innerHTML);
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

  const insertVariable = (variable) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertText', false, variable);
      handleInput();
    }
  };

  const copyVariableToClipboard = (variable, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(variable);
    toast.success(`Copied ${variable} to clipboard!`);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!templateTitle.trim()) {
      toast.error('Template Title is required');
      return;
    }
    if (!body.trim() || body === '<br>') {
      toast.error('Template Body is required');
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.post('/api/system-notification/edit', {
        id,
        templateTitle,
        body,
        status,
      });

      if (response.data && response.data.success) {
        toast.success(response.data.message || 'System notification updated successfully.');
        navigate('/configurations/system-notifications');
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to update system notification.';
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
    if (!body) return 0;
    const text = body.replace(/<[^>]*>/g, ' ');
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = () => {
    if (!body) return 0;
    const text = body.replace(/<[^>]*>/g, '');
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
    <form onSubmit={handleSave} className="flex flex-col w-full min-w-0 select-none pb-8">
      {/* breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-1">
        <span>Configurations</span>
        <ChevronRight size={12} className="text-neutral-400" />
        <button 
          type="button" 
          onClick={() => navigate('/configurations/system-notifications')}
          className="hover:text-brand-600 dark:hover:text-brand-400 outline-none"
        >
          System Notifications
        </button>
        <ChevronRight size={12} className="text-neutral-400" />
        <span className="text-neutral-900 dark:text-white truncate max-w-[200px]">
          Edit Template
        </span>
      </div>

      {/* Module Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center text-brand-600 dark:text-brand-400 border border-brand-100 dark:border-brand-900/50">
          <Bell size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Edit System Notification</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Modify automated in-app alert system templates
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Main Editor Form */}
        <div className="flex-1 w-full flex flex-col gap-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-normal">
            {/* Template ID (Read-only) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                TEMPLATE ID (READ-ONLY)
              </label>
              <input
                type="text"
                value={templateId}
                disabled
                className="w-full h-11 px-3.5 text-sm bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-lg cursor-not-allowed font-mono"
              />
            </div>

            {/* Template Code (Read-only) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                TEMPLATE CODE (READ-ONLY)
              </label>
              <input
                type="text"
                value={templateCode}
                disabled
                className="w-full h-11 px-3.5 text-sm bg-neutral-50 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-lg cursor-not-allowed font-mono"
              />
            </div>
          </div>

          {/* Template Title */}
          <div className="flex flex-col gap-1.5 font-normal">
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              TEMPLATE TITLE
            </label>
            <input
              type="text"
              value={templateTitle}
              onChange={(e) => setTemplateTitle(e.target.value)}
              placeholder="Enter template title..."
              required
              className="w-full h-11 px-3.5 text-sm bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-medium"
            />
          </div>

          {/* Body Rich Text Editor */}
          <div className="flex flex-col gap-1.5 font-normal">
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              TEMPLATE BODY (HTML RICH TEXT)
            </label>
            
            <div className="flex flex-col w-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
              {/* Rich Text Editor Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-2 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                {/* Format Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === 'format' ? null : 'format');
                    }}
                    className="h-8 px-2 flex items-center justify-between gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition-colors animate-none"
                  >
                    <span>{currentFormat}</span>
                    <ChevronDown size={12} />
                  </button>
                  {activeDropdown === 'format' && (
                    <div className="absolute left-0 mt-1 w-36 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded shadow-lg z-50 py-1">
                      {formatOptions.map((opt) => (
                        <button
                          key={opt.tag}
                          type="button"
                          onClick={() => applyFormat(opt.tag, opt.label)}
                          className="w-full px-3 py-1.5 text-left text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

                {/* Font Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === 'font' ? null : 'font');
                    }}
                    className="h-8 px-2 flex items-center justify-between gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition-colors"
                  >
                    <span>{currentFont}</span>
                    <ChevronDown size={12} />
                  </button>
                  {activeDropdown === 'font' && (
                    <div className="absolute left-0 mt-1 w-32 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded shadow-lg z-50 py-1">
                      {fontOptions.map((opt) => (
                        <button
                          key={opt.font}
                          type="button"
                          onClick={() => applyFont(opt.font, opt.label)}
                          className="w-full px-3 py-1.5 text-left text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                          style={{ fontFamily: opt.font }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

                {/* Inline Styles */}
                <button
                  type="button"
                  title="Bold"
                  onClick={() => executeCommand('bold')}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                    activeStyles.bold && "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                  )}
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  title="Italic"
                  onClick={() => executeCommand('italic')}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                    activeStyles.italic && "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                  )}
                >
                  <Italic size={16} />
                </button>
                <button
                  type="button"
                  title="Underline"
                  onClick={() => executeCommand('underline')}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                    activeStyles.underline && "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                  )}
                >
                  <Underline size={16} />
                </button>
                <button
                  type="button"
                  title="Strikethrough"
                  onClick={() => executeCommand('strikeThrough')}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                    activeStyles.strikeThrough && "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                  )}
                >
                  <Strikethrough size={16} />
                </button>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

                {/* Lists & Quote */}
                <button
                  type="button"
                  title="Bullet List"
                  onClick={() => executeCommand('insertUnorderedList')}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                    activeStyles.insertUnorderedList && "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                  )}
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  title="Numbered List"
                  onClick={() => executeCommand('insertOrderedList')}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                    activeStyles.insertOrderedList && "bg-neutral-200 dark:bg-neutral-800 text-brand-600 dark:text-brand-400"
                  )}
                >
                  <ListOrdered size={16} />
                </button>
                <button
                  type="button"
                  title="Blockquote"
                  onClick={() => executeCommand('formatBlock', 'blockquote')}
                  className="w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Quote size={16} />
                </button>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

                {/* Align Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === 'align' ? null : 'align');
                    }}
                    className="h-8 px-2 flex items-center justify-between gap-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition-colors"
                  >
                    <span>Align: {currentAlign}</span>
                    <ChevronDown size={12} />
                  </button>
                  {activeDropdown === 'align' && (
                    <div className="absolute left-0 mt-1 w-32 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded shadow-lg z-50 py-1">
                      {alignOptions.map((opt) => (
                        <button
                          key={opt.align}
                          type="button"
                          onClick={() => applyAlign(opt.align, opt.label)}
                          className="w-full px-3 py-1.5 flex items-center text-left text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                        >
                          {opt.icon}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

                {/* Link & Line */}
                <button
                  type="button"
                  title="Link"
                  onClick={handleLink}
                  className="w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Link2 size={16} />
                </button>
                <button
                  type="button"
                  title="Horizontal Line"
                  onClick={() => executeCommand('insertHorizontalRule')}
                  className="w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Minus size={16} />
                </button>

                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1"></div>

                {/* Undo / Redo */}
                <button
                  type="button"
                  title="Undo"
                  onClick={() => executeCommand('undo')}
                  className="w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Undo size={16} />
                </button>
                <button
                  type="button"
                  title="Redo"
                  onClick={() => executeCommand('redo')}
                  className="w-8 h-8 flex items-center justify-center rounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Redo size={16} />
                </button>
              </div>

              {/* Editable Area */}
              <div 
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onKeyUp={updateActiveStyles}
                onMouseUp={updateActiveStyles}
                className="w-full min-h-[22rem] p-4 text-sm bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none overflow-y-auto cursor-text prose prose-sm dark:prose-invert max-w-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            
            {/* Word & Char Count */}
            <div className="flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 font-medium px-1">
              <span>Words: {getWordCount()}</span>
              <span>Characters: {getCharCount()}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Info/Actions Card */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0 font-normal">
          {/* Settings & Info */}
          <div className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              Template Settings
            </h2>

            {/* Status Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                ACTIVE STATUS
              </label>
              <SelectFilter
                value={status}
                options={[
                  { value: 'active', label: 'Active (Sending)' },
                  { value: 'inactive', label: 'Inactive (Disabled)' },
                ]}
                onChange={setStatus}
              />
            </div>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1"></div>

            {/* Meta statistics */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Last Updated:</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-right max-w-[150px] break-words">
                  {formatDateTime(lastUpdated)}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Updated By:</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-right max-w-[150px] break-words">
                  {updatedBy || 'System'}
                </span>
              </div>
            </div>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1"></div>

            {/* Actions buttons */}
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full h-11 flex items-center justify-center bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Save Template'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/configurations/system-notifications')}
                className="w-full h-11 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-semibold transition-colors cursor-pointer outline-none"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Merge Tags / Variables Box */}
          <div className="w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Merge Tags Helper
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Click a tag to insert it into the body at the cursor position.
              </p>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-72 custom-scroll pr-1">
              {variables.map((v) => (
                <div 
                  key={v.tag}
                  onClick={() => insertVariable(v.tag)}
                  className="group flex flex-col p-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-brand-300 dark:hover:border-brand-700 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 select-all">
                      {v.tag}
                    </code>
                    <button
                      type="button"
                      title="Copy to clipboard"
                      onClick={(e) => copyVariableToClipboard(v.tag, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded transition-all outline-none"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                    {v.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SystemNotificationEdit;
