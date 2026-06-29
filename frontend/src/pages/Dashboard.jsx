import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import ModuleHeader from '../components/common/ModuleHeader';
import FilterBar from '../components/common/FilterBar';
import StatCard from '../components/cards/StatCard';
import { dashboardStats, dateRangeOptions } from '../data/dashboard';
import api from '../utils/api';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('all');
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/dashboard/stats', {
          params: { dateRange },
        });
        if (response.data && response.data.success) {
          setStatsData(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [dateRange]);

  const mappedStats = dashboardStats.map(stat => {
    if (loading || !statsData) {
      return { ...stat, value: '—' };
    }
    switch (stat.id) {
      case 1:
        return { ...stat, value: statsData.totalUsers };
      case 2:
        return { ...stat, value: statsData.activeUsers };
      case 3:
        return { ...stat, value: statsData.inactiveUsers };
      case 4:
        return { 
          ...stat, 
          value: statsData.deletedUsers,
          subtitle: `${statsData.deletedPercentage} / All`
        };
      case 5:
        return { ...stat, value: statsData.totalEvents };
      case 6:
        return { ...stat, value: statsData.activeEvents };
      case 7:
        return { ...stat, value: statsData.fadedEvents };
      case 8:
        return { ...stat, value: statsData.repeatPercentage };
      default:
        return stat;
    }
  });

  const userStats = mappedStats.slice(0, 4);
  const eventStats = mappedStats.slice(4, 8);

  return (
    <div>
      <ModuleHeader title="Dashboard" breadcrumb="Dashboard" />
      
      <div className="flex-1 min-h-0 min-w-0">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-current" />
              Date Range:
            </span>
            <div className="w-44">
              <FilterBar
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                dateRangeOptions={dateRangeOptions}
              />
            </div>
          </div>

          {/* User Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1440px] w-full">
            {userStats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
                variant={stat.variant}
              />
            ))}
          </div>

          {/* Event Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1440px] w-full">
            {eventStats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
                variant={stat.variant}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
