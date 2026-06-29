import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FileText } from 'lucide-react';
import ModuleHeader from '../components/common/ModuleHeader';
import RefreshButton from '../components/common/RefreshButton';
import SearchButton from '../components/common/SearchButton';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import InfoNote from '../components/common/InfoNote';
import api from '../utils/api';

const StaticPagesList = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('pageName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchQuery || undefined,
        sortBy: sortKey || undefined,
        sortOrder: sortDirection || undefined,
      };

      const response = await api.get('/api/static-page', { params });
      if (response.data && response.data.success) {
        setPages(response.data.data);
        if (response.data.meta) {
          setTotalRecords(response.data.meta.total);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load static pages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [currentPage, itemsPerPage, debouncedSearchQuery, sortKey, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, itemsPerPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchPages();
    setIsRefreshing(false);
    toast.success('Static pages refreshed successfully.');
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
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

  const columns = [
    {
      key: 'pageName',
      label: 'PAGE NAME',
      sortable: true,
      render: (item) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/static-pages/edit/${item.pageId}`);
          }}
          className="font-medium text-brand-600 dark:text-brand-400 truncate text-left hover:underline outline-none focus:ring-1 focus:ring-brand-500 rounded cursor-pointer"
        >
          {item.pageName}
        </button>
      ),
    },
    {
      key: 'lastUpdated',
      label: 'LAST UPDATED',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDateTime(item.lastUpdated)}
        </span>
      ),
    },
    {
      key: 'updatedBy',
      label: 'UPDATED BY',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          {item.updatedBy}
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
            <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-success-500' : 'bg-neutral-400'}`}></span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">
              {item.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </span>
        </span>
      ),
    },
  ];

  const gridTemplateColumns = "minmax(220px, 1fr) 180px 160px 100px";

  return (
    <div className="flex flex-col w-full select-none">
      <div className="mb-3 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <ModuleHeader title="Static Pages" breadcrumb="Configurations / Static Pages" />
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end shrink-0 self-end">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search name or slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-10 px-3 text-sm border border-theme-border rounded-lg bg-theme-card text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-brand-500 transition-all"
                />
              )}
              <SearchButton onClick={() => setShowSearch(!showSearch)} />
              <RefreshButton onClick={handleRefresh} isSpinning={isRefreshing} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 border border-theme-border rounded-xl bg-theme-card">
            <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="mt-4 text-sm text-theme-secondary font-medium">Loading pages...</span>
          </div>
        ) : (
          <Table
            columns={columns}
            data={pages}
            gridTemplateColumns={gridTemplateColumns}
            minWidth="41.25rem"
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
            rowKey={(item) => item.pageId}
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
          <strong>Note:</strong> All predefined pages always exist. Pages cannot be deleted. Click any row to edit content.
        </InfoNote>
      </div>
    </div>
  );
};

export default StaticPagesList;
