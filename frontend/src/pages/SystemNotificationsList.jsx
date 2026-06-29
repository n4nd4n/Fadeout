import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Power, Edit, Search, RefreshCw } from 'lucide-react';
import ModuleHeader from '../components/common/ModuleHeader';
import RefreshButton from '../components/common/RefreshButton';
import SearchButton from '../components/common/SearchButton';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import InfoNote from '../components/common/InfoNote';
import api from '../utils/api';

const SystemNotificationsList = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('templateId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchQuery || undefined,
        sortBy: sortKey || undefined,
        sortOrder: sortDirection || undefined,
      };

      const response = await api.get('/api/system-notification', { params });
      if (response.data && response.data.success) {
        setTemplates(response.data.data);
        if (response.data.meta) {
          setTotalRecords(response.data.meta.total);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load system notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [currentPage, itemsPerPage, debouncedSearchQuery, sortKey, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, itemsPerPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTemplates();
    setIsRefreshing(false);
    toast.success('System notifications refreshed successfully.');
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleToggleStatus = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await api.post(`/api/system-notification/toggle/${id}`);
      if (response.data && response.data.success) {
        toast.success('Status updated successfully.');
        fetchTemplates();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to toggle status.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const columns = [
    {
      key: 'templateId',
      label: 'TEMPLATE ID',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-neutral-700 dark:text-neutral-300 font-normal">
          {item.templateId}
        </span>
      ),
    },
    {
      key: 'templateCode',
      label: 'TEMPLATE CODE',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-neutral-700 dark:text-neutral-300 font-mono text-xs">
          {item.templateCode}
        </span>
      ),
    },
    {
      key: 'templateTitle',
      label: 'TEMPLATE TITLE',
      sortable: true,
      render: (item) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/configurations/system-notifications/edit/${item.id}`);
          }}
          className="font-medium text-brand-600 dark:text-brand-400 truncate text-left hover:underline outline-none focus:ring-1 focus:ring-brand-500 rounded cursor-pointer"
        >
          {item.templateTitle}
        </button>
      ),
    },
    {
      key: 'lastUpdated',
      label: 'LAST UPDATED',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
          {formatDate(item.lastUpdated)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'STATUS',
      sortable: true,
      render: (item) => (
        <span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-full">
            <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-success-500' : 'bg-error-500'}`}></span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">
              {item.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </span>
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'ACTION',
      align: 'right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            title={item.status === 'active' ? 'Inactivate system template' : 'Activate system template'}
            onClick={(e) => handleToggleStatus(item.id, e)}
            className="w-10 h-10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg transition-all cursor-pointer outline-none"
          >
            <Power className="w-5 h-5 text-current" />
          </button>
          <button
            type="button"
            title="Edit system template"
            onClick={() => navigate(`/configurations/system-notifications/edit/${item.id}`)}
            className="w-10 h-10 flex items-center justify-center text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-brand-300 dark:hover:border-brand-700 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg transition-all cursor-pointer outline-none"
          >
            <Edit className="w-5 h-5 text-current" />
          </button>
        </div>
      ),
    },
  ];

  // Adjust column sizing
  const gridTemplateColumns = "minmax(120px, 0.8fr) minmax(200px, 1.3fr) minmax(200px, 1.2fr) minmax(140px, 1fr) minmax(110px, 0.8fr) minmax(120px, 120px)";

  return (
    <div className="flex flex-col w-full select-none">
      <div className="mb-3 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <ModuleHeader title="System Notifications" breadcrumb="Configurations / System Notifications" />
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end shrink-0 self-end">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search id, code or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-10 px-3 text-sm border border-theme-border rounded-lg bg-theme-card text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-brand-500 transition-all"
                />
              )}
              <SearchButton onClick={() => setShowSearch(!showSearch)} />
              <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 hidden sm:block"></div>
              <RefreshButton onClick={handleRefresh} isSpinning={isRefreshing} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 border border-theme-border rounded-xl bg-theme-card">
            <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="mt-4 text-sm text-theme-secondary font-medium">Loading templates...</span>
          </div>
        ) : (
          <Table
            columns={columns}
            data={templates}
            gridTemplateColumns={gridTemplateColumns}
            minWidth="56rem"
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
            rowKey={(item) => item.id}
            maxRows={10}
          />
        )}

        <Pagination
          totalItems={totalRecords}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        <InfoNote>
          <strong>Note:</strong> Predefined templates are used by the system to show automated in-app alerts. Toggling status disables showing specific alerts. Click on template title or edit button to edit title and content.
        </InfoNote>
      </div>
    </div>
  );
};

export default SystemNotificationsList;
