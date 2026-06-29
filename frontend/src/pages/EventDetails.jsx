import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, TrendingUp, Calendar, Mail, User, ShieldAlert } from 'lucide-react';
import StatCard from '../components/cards/StatCard';
import UserInformation from '../components/common/UserInformation';
import Table from '../components/common/Table';
import Pagination from '../components/common/Pagination';
import SearchButton from '../components/common/SearchButton';
import SelectFilter from '../components/common/SelectFilter';
import api from '../utils/api';
import { cn } from '../lib/utils';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'participants'
  
  // Pagination & Sorting for Participants
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Search & Filter for Participants
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [rsvpFilter, setRsvpFilter] = useState('all');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/api/events/detail/${id}`);
        if (response.data && response.data.success) {
          const data = response.data.data;
          setEvent(data.eventInformation);
          
          const mappedParticipants = (data.participantList || []).map((p) => ({
            ...p,
            name: p.userName,
            joinedDate: p.rsvpDate,
            role: 'Member',
          }));
          setParticipants(mappedParticipants);
        } else {
          toast.error('Event not found.');
          navigate('/events');
        }
      } catch (error) {
        console.error(error);
        toast.error('Event not found.');
        navigate('/events');
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id, navigate]);

  // Reset page when tab, search query, or rsvp filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, rsvpFilter]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

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

    return `${month} ${day}, ${year} ${formattedHours}:${minutes}${ampm}`;
  };

  // Stats calculation
  const totalInvited = participants.length;
  const totalGoing = participants.filter((p) => p.rsvpStatus === 'going').length;
  const totalMaybe = participants.filter((p) => p.rsvpStatus === 'maybe').length;

  // Sorting logic for participants
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Filter logic for participants
  const filteredParticipants = participants.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchEmail = p.email.toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }
    if (rsvpFilter !== 'all') {
      const targetStatus = rsvpFilter === 'invited' ? 'not going' : rsvpFilter;
      if (p.rsvpStatus !== targetStatus) return false;
    }
    return true;
  });

  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    if (!sortKey || !sortDirection) return 0;
    let valA = a[sortKey] || '';
    let valB = b[sortKey] || '';
    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedParticipants = sortedParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Table Columns Definition
  const columns = [
    {
      key: 'name',
      label: 'NAME',
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-theme-primary flex items-center gap-2">
          <User className="w-4 h-4 text-brand-500 shrink-0" />
          {item.name}
        </span>
      ),
    },
    {
      key: 'email',
      label: 'EMAIL',
      sortable: true,
      render: (item) => (
        <span className="text-theme-secondary flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 opacity-60" />
          {item.email}
        </span>
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
      key: 'joinedDate',
      label: 'JOINED DATE',
      sortable: true,
      render: (item) => (
        <span className="text-theme-secondary">{formatDateTime(item.joinedDate)}</span>
      ),
    },
    {
      key: 'role',
      label: 'ROLE',
      sortable: true,
      render: (item) => (
        <span className="text-theme-secondary font-medium">{item.role}</span>
      ),
    },
  ];

  const gridTemplateColumns = "minmax(150px, 1fr) minmax(200px, 1fr) minmax(140px, 1fr) minmax(150px, 1fr) minmax(130px, 1fr)";

  if (!event) {
    return (
      <div className="flex items-center justify-center h-full text-theme-secondary">
        Loading event information...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full select-none">
      
      {/* Custom Module Header */}
      <div className="mb-3 shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-theme-primary truncate">Event Details</h1>
            <div className="mt-2.5 flex items-center gap-2 text-sm text-theme-secondary truncate">
              View event information and RSVP summary (read-only)
            </div>
            
            <nav className="flex items-center gap-1.5 text-xs mt-1">
              <Link
                className="text-theme-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                to="/events"
              >
                Event Management
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-right w-4 h-4 text-theme-secondary opacity-60"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="text-theme-primary font-medium">Event Details</span>
            </nav>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-start md:justify-end shrink-0 self-end">
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-theme-primary bg-theme-card border border-theme-border rounded-lg hover:bg-theme-hover transition-colors shadow-sm cursor-pointer outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="flex flex-col w-full">
        {/* StatCards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 shrink-0">
          <StatCard
            title="Total Invited"
            value={totalInvited}
            icon={TrendingUp}
            layout="value-top"
          />
          <StatCard
            title="Going"
            value={totalGoing}
            icon={TrendingUp}
            layout="value-top"
          />
          <StatCard
            title="Maybe"
            value={totalMaybe}
            icon={TrendingUp}
            layout="value-top"
          />
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
            Event Information
          </button>
          <button
            onClick={() => setActiveTab('participants')}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 outline-none cursor-pointer",
              activeTab === 'participants'
                ? "bg-theme-card text-brand-600 dark:text-theme-primary shadow-sm ring-1 ring-black/5"
                : "text-theme-secondary hover:text-theme-primary"
            )}
          >
            Participants
          </button>
        </div>

        {/* Tab contents */}
        <div className="w-full flex flex-col animate-in fade-in duration-200">
          {activeTab === 'basic' ? (
            <div className="w-full pb-8">
              <UserInformation type="event" event={event} />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              {/* Toolbar: Search & Filter */}
              <div className="flex flex-wrap items-center justify-end gap-2 mb-1 shrink-0">
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
                <div className="w-px h-6 bg-theme-border mx-1 hidden sm:block"></div>
                <div className="w-48">
                  <SelectFilter
                    value={rsvpFilter}
                    options={[
                      { value: 'all', label: 'All Status' },
                      { value: 'going', label: 'Going' },
                      { value: 'maybe', label: 'Maybe' },
                      { value: 'invited', label: 'Not Going' },
                    ]}
                    onChange={setRsvpFilter}
                  />
                </div>
              </div>

              <Table
                columns={columns}
                data={paginatedParticipants}
                gridTemplateColumns={gridTemplateColumns}
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={handleSort}
                rowKey={(p) => p.email}
                className="w-full"
              />
              <Pagination
                totalItems={sortedParticipants.length}
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

export default EventDetails;
