import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircleCheck, CircleX, Send } from 'lucide-react';
import ModuleHeader from '../components/common/ModuleHeader';
import SearchButton from '../components/common/SearchButton';
import RefreshButton from '../components/common/RefreshButton';
import SelectFilter from '../components/common/SelectFilter';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import InfoNote from '../components/common/InfoNote';
import api from '../utils/api';

const UsersList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDeletedView = location.pathname === '/users/deleted';

  // State
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('email');
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

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: debouncedSearchQuery || undefined,
        sortBy: sortKey || undefined,
        sortOrder: sortDirection || undefined,
      };

      if (!isDeletedView) {
        if (statusFilter === 'verified') params.is_verified = 'true';
        if (statusFilter === 'unverified') params.is_verified = 'false';
        if (statusFilter === 'active') params.is_active = 'true';
        if (statusFilter === 'inactive') params.is_active = 'false';
      }

      const url = isDeletedView ? '/api/user/deleted' : '/api/user';
      const response = await api.get(url, { params });

      if (response.data && response.data.success) {
        setUsers(response.data.data);
        if (response.data.pagination) {
          setTotalRecords(response.data.pagination.totalRecords);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load users from backend.');
    }
  };

  // Fetch when dependency changes
  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage, debouncedSearchQuery, statusFilter, sortKey, sortDirection, isDeletedView]);

  // Handle page reset on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter, itemsPerPage, isDeletedView]);

  // Actions
  const handleToggleStatus = async (userId, e) => {
    e.stopPropagation(); // Avoid triggering row click navigation
    try {
      const response = await api.patch(`/api/user/status/${userId}`);
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'User status updated successfully.');
        fetchUsers();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update user status.');
    }
  };

  const handleResendLink = async (userId, e) => {
    e.stopPropagation(); // Avoid triggering row click navigation
    try {
      const response = await api.post(`/api/user/resend-verification/${userId}`);
      if (response.data && response.data.success) {
        toast.success('Verification link resent successfully.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to resend verification link.');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchUsers();
    setIsRefreshing(false);
    toast.success('User list refreshed successfully.');
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
  const columns = isDeletedView ? [
    {
      key: 'fullName',
      label: 'NAME',
      sortable: true,
      render: (item) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/users/view/${item.id}`);
          }}
          className="font-medium text-brand-600 dark:text-brand-400 truncate text-left hover:underline outline-none focus:ring-1 focus:ring-brand-500 rounded cursor-pointer"
        >
          {item.fullName}
        </button>
      ),
    },
    {
      key: 'email',
      label: 'EMAIL',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-theme-secondary truncate">{item.email}</span>
      ),
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      render: (item) => (
        <span className="text-sm text-theme-secondary truncate" title={item.description}>
          {item.description || 'No description available'}
        </span>
      ),
    },
    {
      key: 'deletedDate',
      label: 'DELETED DATE',
      sortable: true,
      align: 'center',
      render: (item) => <span className="text-sm text-theme-secondary">{item.deletedDate ? formatDate(item.deletedDate) : '—'}</span>,
    },
  ] : [
    {
      key: 'fullName',
      label: 'NAME',
      sortable: true,
      render: (item) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/users/view/${item.id}`);
          }}
          className="font-medium text-brand-600 dark:text-brand-400 truncate text-left hover:underline outline-none focus:ring-1 focus:ring-brand-500 rounded cursor-pointer"
        >
          {item.fullName}
        </button>
      ),
    },
    {
      key: 'email',
      label: 'EMAIL',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-theme-secondary truncate">{item.email}</span>
      ),
    },
    {
      key: 'isVerified',
      label: 'VERIFICATION STATUS',
      render: (item) =>
        item.isVerified ? (
          <span 
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border"
            style={{ backgroundColor: '#b3e6b3', color: '#004d00', borderColor: '#b3e6b3' }}
          >
            <CircleCheck className="h-2.5 w-2.5" />
            Verified
          </span>
        ) : (
          <span 
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border"
            style={{ backgroundColor: '#ffefb3', color: '#806600', borderColor: '#ffefb3' }}
          >
            <CircleX className="h-2.5 w-2.5" />
            Not Verified
          </span>
        ),
    },
    {
      key: 'status',
      label: 'STATUS',
      render: (item) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={item.status === 'active'}
            onClick={(e) => handleToggleStatus(item.id, e)}
            className={`
              relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              ${item.status === 'active' ? 'bg-success-500' : 'bg-neutral-200 dark:bg-neutral-800'}
            `}
          >
            <span className="sr-only">Toggle status</span>
            <span
              aria-hidden="true"
              className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                transition duration-200 ease-in-out
                ${item.status === 'active' ? 'translate-x-5' : 'translate-x-0'}
              `}
            />
          </button>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-theme-card border border-theme-border rounded-full">
            <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-success-500' : 'bg-neutral-400'}`} />
            <span className="text-xs text-theme-secondary">
              {item.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </span>
        </div>
      ),
    },
    {
      key: 'eventsCreated',
      label: 'EVENTS CREATED',
      sortable: true,
      align: 'center',
      render: (item) => <span className="text-sm text-center block">{item.eventsCreated}</span>,
    },
    {
      key: 'eventsJoined',
      label: 'EVENTS JOINED',
      sortable: true,
      align: 'center',
      render: (item) => <span className="text-sm text-center block">{item.eventsJoined}</span>,
    },
    {
      key: 'createdDate',
      label: 'CREATED DATE',
      sortable: true,
      align: 'center',
      render: (item) => <span className="text-sm text-theme-secondary">{formatDate(item.createdDate)}</span>,
    },
    {
      key: 'id',
      label: 'ACTION',
      render: (item) =>
        !item.isVerified ? (
          <button
            type="button"
            onClick={(e) => handleResendLink(item.id, e)}
            className="inline-flex items-center gap-1.5 rounded-md border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-950 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-400 transition-colors hover:bg-brand-100 dark:hover:bg-brand-900 cursor-pointer focus:outline-none"
          >
            <Send className="h-3.5 w-3.5" />
            Resend Link
          </button>
        ) : (
          <span className="text-sm text-neutral-400 dark:text-neutral-500">—</span>
        ),
    },
  ];

  const gridTemplateColumns = isDeletedView
    ? "minmax(160px, 1fr) minmax(220px, 1.2fr) 280px 180px"
    : "minmax(160px, 1fr) minmax(220px, 1.2fr) 170px 120px 140px 130px 140px 180px";

  return (
    <div className="flex flex-col w-full select-none">
      {/* Module Header with breadcrumbs and filters */}
      <div className="mb-3 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <ModuleHeader
              title={isDeletedView ? "Deleted Users" : "Users"}
              breadcrumb={isDeletedView ? "Deleted Users" : "Users"}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end shrink-0 self-end">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {/* Search Toggle */}
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-10 px-3 text-sm border border-theme-border rounded-lg bg-theme-card text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-brand-500 transition-all"
                />
              )}
              <SearchButton onClick={() => setShowSearch(!showSearch)} />

              {!isDeletedView && (
                <>
                  <div className="w-px h-6 bg-theme-border mx-1 hidden sm:block"></div>
                  <div className="w-48">
                    <SelectFilter
                      value={statusFilter}
                      options={[
                        { value: 'all', label: 'All Status' },
                        { value: 'verified', label: 'Verified' },
                        { value: 'unverified', label: 'Not Verified' },
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
                      onChange={setStatusFilter}
                    />
                  </div>
                </>
              )}

              <RefreshButton onClick={handleRefresh} isSpinning={isRefreshing} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Listing Section */}
      <div className="flex flex-col w-full gap-4">
        <Table
          columns={columns}
          data={users}
          gridTemplateColumns={gridTemplateColumns}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
          rowKey={(u) => u.id}
          onRowClick={(u) => navigate(`/users/view/${u.id}`)}
        />

        {/* Pagination bar */}
        <Pagination
          totalItems={totalRecords}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          className="mt-2 w-full"
        />

        {/* Note info box */}
        <div className="mt-4 w-full">
          <InfoNote>
            {isDeletedView ? (
              <>
                <strong>Note:</strong> This is a read-only view. Deleted user accounts cannot be restored, edited, or have their status changed. Data is retained for compliance and audit purposes.
              </>
            ) : (
              <>
                <strong>Note:</strong> Toggle user status between Active and Inactive. Inactive users will be blocked from logging in with the message: <em>"Your account has been locked by admin."</em> Click on any row to view detailed user information.
              </>
            )}
          </InfoNote>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
