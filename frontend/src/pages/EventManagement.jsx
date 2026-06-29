import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModuleHeader from '../components/common/ModuleHeader';
import SearchButton from '../components/common/SearchButton';
import RefreshButton from '../components/common/RefreshButton';
import SelectFilter from '../components/common/SelectFilter';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import InfoNote from '../components/common/InfoNote';
import api from '../utils/api';

const EventManagement = () => {
  const navigate = useNavigate();

  // State
  const [events, setEvents] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('startDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch events from backend API
  const fetchEvents = async () => {
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        sortBy: sortKey || undefined,
        sortOrder: sortDirection || undefined,
      };

      const response = await api.get('/api/events/list', { params });
      if (response.data && response.data.success) {
        setEvents(response.data.data);
        if (response.data.pagination) {
          setTotalRecords(response.data.pagination.totalRecords);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load events from backend.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [currentPage, itemsPerPage, debouncedSearchQuery, statusFilter, sortKey, sortDirection]);

  // Handle page reset on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter, itemsPerPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchEvents();
    setIsRefreshing(false);
    toast.success('Event list refreshed successfully.');
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
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

  // Table columns definition
  const columns = [
    {
      key: 'eventId',
      label: 'EVENT ID',
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-theme-primary">{item.eventId}</span>
      ),
    },
    {
      key: 'title',
      label: 'EVENT NAME',
      sortable: true,
      render: (item) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/events/view/${item.id}`);
          }}
          className="font-medium text-brand-600 dark:text-brand-400 truncate text-left hover:underline outline-none focus:ring-1 focus:ring-brand-500 rounded cursor-pointer"
        >
          {item.title}
        </button>
      ),
    },
    {
      key: 'hostName',
      label: 'HOST NAME',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-theme-secondary truncate">{item.hostName || '—'}</span>
      ),
    },
    {
      key: 'startDate',
      label: 'START DATE',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-theme-secondary">{formatDate(item.startDate)}</span>
      ),
    },
    {
      key: 'expiryDate',
      label: 'EXPIRY DATE',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-theme-secondary">{formatDate(item.expiryDate)}</span>
      ),
    },
    {
      key: 'status',
      label: 'STATUS',
      render: (item) =>
        item.status === 'active' ? (
          <span 
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border"
            style={{ backgroundColor: '#b3e6b3', color: '#004d00', borderColor: '#b3e6b3' }}
          >
            Active
          </span>
        ) : (
          <span 
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border"
            style={{ backgroundColor: '#ffefb3', color: '#806600', borderColor: '#ffefb3' }}
          >
            Expired
          </span>
        ),
    },
    {
      key: 'createdDate',
      label: 'CREATED DATE',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-theme-secondary">{formatDate(item.createdDate)}</span>
      ),
    },
  ];

  const gridTemplateColumns = "100px minmax(220px, 1.5fr) minmax(160px, 1fr) 150px 150px 120px 150px";

  return (
    <div className="flex flex-col w-full select-none">
      {/* Module Header with breadcrumbs and filters */}
      <div className="mb-3 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <ModuleHeader
              title="Event Management"
              breadcrumb="Event Management"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end shrink-0 self-end">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {/* Search Toggle */}
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search name, host, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-10 px-3 text-sm border border-theme-border rounded-lg bg-theme-card text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-brand-500 transition-all"
                />
              )}
              <SearchButton onClick={() => setShowSearch(!showSearch)} />
              
              <div className="w-px h-6 bg-theme-border mx-1 hidden sm:block"></div>
              
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-48">
                    <SelectFilter
                      value={statusFilter}
                      options={[
                        { value: 'all', label: 'All Status' },
                        { value: 'active', label: 'Active' },
                        { value: 'expired', label: 'Expired' },
                      ]}
                      onChange={setStatusFilter}
                    />
                  </div>
                  <RefreshButton onClick={handleRefresh} isSpinning={isRefreshing} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Listing Section */}
      <div className="flex flex-col w-full gap-4">
        <Table
          columns={columns}
          data={events}
          gridTemplateColumns={gridTemplateColumns}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          rowKey={(e) => e.id}
          onRowClick={(e) => navigate(`/events/view/${e.id}`)}
        />

        {/* Pagination bar */}
        <Pagination
          totalItems={totalRecords}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        {/* Informative Note */}
        <InfoNote>
          <strong>Note:</strong> This is a read-only view. Events cannot be edited or ended by administrators. Click on any event row to view detailed information and RSVP statistics.
        </InfoNote>
      </div>
    </div>
  );
};

export default EventManagement;
