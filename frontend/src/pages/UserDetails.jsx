import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, TrendingUp, Calendar, MapPin, Tag, Activity } from 'lucide-react';
import StatCard from '../components/cards/StatCard';
import UserInformation from '../components/common/UserInformation';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import api from '../utils/api';
import { cn } from '../lib/utils';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'created' | 'joined'
  
  // Events state
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  
  // Pagination & Sorting for Events lists
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(`/api/user/detail/${id}`);
      if (response.data && response.data.success) {
        const data = response.data.data;
        setUser(data.profile);
        setCreatedEvents(data.createdEventsList || []);
        setJoinedEvents(data.joinedEventsList || []);
      } else {
        toast.error('User not found.');
        navigate('/users/list');
      }
    } catch (error) {
      console.error(error);
      toast.error('User not found or failed to load.');
      navigate('/users/list');
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleToggleStatus = async () => {
    if (!user) return;
    try {
      const response = await api.patch(`/api/user/status/${user.id}`);
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Status updated successfully.');
        fetchUserDetails();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update status.');
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

  // Helper to format date with time
  const formatDateTime = (dateString) => {
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

    return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${ampm}`;
  };

  // Stats calculation
  const currentEvents = activeTab === 'created' ? createdEvents : joinedEvents;
  
  const totalCreated = createdEvents.length;
  const totalJoined = joinedEvents.length;
  
  const activeCreated = createdEvents.filter((e) => e.status === 'active').length;
  const activeJoined = joinedEvents.filter((e) => e.status === 'active').length;
  const activeCount = activeCreated + activeJoined;
  
  const expiredCreated = createdEvents.filter((e) => e.status === 'completed' || e.status === 'cancelled').length;
  const expiredJoined = joinedEvents.filter((e) => e.status === 'completed' || e.status === 'cancelled').length;
  const expiredCount = expiredCreated + expiredJoined;

  // Filter / Sort / Paginate logic for active tab's events
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedEvents = [...currentEvents].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;
    let valA = a[sortKey];
    let valB = b[sortKey];
    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Created Events Columns Definition
  const createdColumns = [
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
        <span className="font-semibold text-brand-600 dark:text-brand-400">{item.title}</span>
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
      sortable: true,
      render: (item) => {
        if (item.status === 'active') {
          return (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border border-success-200 dark:border-success-900/60 bg-success-100 dark:bg-success-950/60 text-success-700 dark:text-success-400">
              Active
            </span>
          );
        }
        if (item.status === 'cancelled') {
          return (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border border-danger-200 dark:border-danger-900/60 bg-danger-100 dark:bg-danger-950/60 text-danger-700 dark:text-danger-400">
              Cancelled
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400">
            Completed
          </span>
        );
      },
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

  const createdGridTemplateColumns = "120px minmax(220px, 1.8fr) 140px 140px 120px 140px";

  // Joined Events Columns Definition
  const joinedColumns = [
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
        <span className="font-semibold text-brand-600 dark:text-brand-400">{item.title}</span>
      ),
    },
    {
      key: 'hostName',
      label: 'HOST NAME',
      sortable: true,
      render: (item) => (
        <span className="text-sm text-theme-secondary">{item.hostName || '—'}</span>
      ),
    },
    {
      key: 'rsvpStatus',
      label: 'RSVP STATUS',
      sortable: true,
      render: (item) => {
        if (item.rsvpStatus === 'going') {
          return (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-success-50 dark:bg-success-950/20 border border-success-100 dark:border-success-900/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500"></span>
              <span className="text-xs text-success-700 dark:text-success-400 capitalize">Going</span>
            </span>
          );
        }
        if (item.rsvpStatus === 'maybe') {
          return (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-warning-50 dark:bg-warning-950/20 border border-warning-100 dark:border-warning-900/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-warning-500"></span>
              <span className="text-xs text-warning-700 dark:text-warning-400 capitalize">Maybe</span>
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">Not Going</span>
          </span>
        );
      },
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
      key: 'status',
      label: 'STATUS',
      sortable: true,
      render: (item) => {
        if (item.status === 'active') {
          return (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border border-success-200 dark:border-success-900/60 bg-success-100 dark:bg-success-950/60 text-success-700 dark:text-success-400">
              Active
            </span>
          );
        }
        if (item.status === 'cancelled') {
          return (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border border-danger-200 dark:border-danger-900/60 bg-danger-100 dark:bg-danger-950/60 text-danger-700 dark:text-danger-400">
              Cancelled
            </span>
          );
        }
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400">
            Completed
          </span>
        );
      },
    },
  ];

  const joinedGridTemplateColumns = "120px minmax(220px, 1.8fr) minmax(160px, 1.2fr) 140px 140px 120px";

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full text-theme-secondary">
        Loading user information...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full select-none">
      
      {/* Custom Module Header */}
      <div className="mb-3 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-theme-primary truncate">
              {user.isDeleted ? 'Deleted User Details' : 'User Details'}
            </h1>
            <div className="mt-2.5 flex items-center gap-2 text-sm text-theme-secondary truncate">
              {user.isDeleted
                ? 'View complete information about this deleted user (read-only)'
                : 'View complete user information and activity'}
            </div>
            
            <nav className="flex items-center gap-1.5 text-xs mt-1">
              <Link
                className="text-theme-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                to="/users/list"
              >
                User Management
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right w-4 h-4 text-theme-secondary opacity-60"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              {user.isDeleted ? (
                <>
                  <Link
                    className="text-theme-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    to="/users/deleted"
                  >
                    Deleted Users
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right w-4 h-4 text-theme-secondary opacity-60"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="text-theme-primary font-medium">Deleted User Details</span>
                </>
              ) : (
                <span className="text-theme-primary font-medium">{user.fullName}</span>
              )}
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end shrink-0 self-end">
            <button
              onClick={() => navigate(user.isDeleted ? '/users/deleted' : '/users/list')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-theme-primary bg-theme-card border border-theme-border rounded-lg hover:bg-theme-hover transition-colors shadow-sm cursor-pointer outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Users
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="flex flex-col w-full">
        {/* StatCards Row */}
        <div className={cn(
          "grid grid-cols-1 gap-4 mb-8 shrink-0",
          user.isDeleted ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"
        )}>
          <StatCard
            title="Total Events Created"
            value={totalCreated}
            icon={TrendingUp}
            layout="value-top"
          />
          <StatCard
            title="Total Events Joined"
            value={totalJoined}
            icon={TrendingUp}
            layout="value-top"
          />
          {!user.isDeleted && (
            <>
              <StatCard
                title="Current Active Events"
                value={activeCount}
                icon={TrendingUp}
                layout="value-top"
              />
              <StatCard
                title="Expired Events"
                value={expiredCount}
                icon={TrendingUp}
                layout="value-top"
              />
            </>
          )}
        </div>

        {/* Tab Buttons Row */}
        <div className="bg-theme-bg border border-theme-border p-1 rounded-xl flex gap-1 mb-6 shrink-0">
          <button
            onClick={() => setActiveTab('basic')}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 outline-none cursor-pointer",
              activeTab === 'basic'
                ? "bg-theme-card text-brand-600 dark:text-theme-primary shadow-sm ring-1 ring-black/5"
                : "text-theme-secondary hover:text-theme-primary"
            )}
          >
            Basic Information
          </button>
          <button
            onClick={() => setActiveTab('created')}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 outline-none cursor-pointer",
              activeTab === 'created'
                ? "bg-theme-card text-brand-600 dark:text-theme-primary shadow-sm ring-1 ring-black/5"
                : "text-theme-secondary hover:text-theme-primary"
            )}
          >
            Created Events
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 outline-none cursor-pointer",
              activeTab === 'joined'
                ? "bg-theme-card text-brand-600 dark:text-theme-primary shadow-sm ring-1 ring-black/5"
                : "text-theme-secondary hover:text-theme-primary"
            )}
          >
            Joined Events
          </button>
        </div>

        {/* Tab contents */}
        <div className="w-full flex flex-col animate-in fade-in duration-200">
          {activeTab === 'basic' ? (
            <div className="w-full pb-8">
              <UserInformation type={user.isDeleted ? 'deleted' : 'user'} user={user} onToggleStatus={handleToggleStatus} />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <Table
                columns={activeTab === 'created' ? createdColumns : joinedColumns}
                data={paginatedEvents}
                gridTemplateColumns={activeTab === 'created' ? createdGridTemplateColumns : joinedGridTemplateColumns}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
                rowKey={(e) => e.id}
                className="w-full"
              />
              <Pagination
                totalItems={sortedEvents.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={setItemsPerPage}
                className="mt-2 w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
