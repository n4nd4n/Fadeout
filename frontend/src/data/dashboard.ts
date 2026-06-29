import {
  Users,
  UserCheck,
  UserMinus,
  UserX,
  CalendarDays,
  BadgeCheck,
  CalendarX,
  Percent,
} from 'lucide-react';
import { StatCardVariant } from '../components/cards/StatCard';

export interface DashboardStat {
  id: number;
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  variant: StatCardVariant;
}

export const dashboardStats: DashboardStat[] = [
  {
    id: 1,
    title: 'Total Users',
    value: 150,
    subtitle: 'Excluding soft-deleted users',
    icon: Users,
    variant: 'primary',
  },
  {
    id: 2,
    title: 'Active Users',
    value: 148,
    subtitle: 'Users with active status',
    icon: UserCheck,
    variant: 'success',
  },
  {
    id: 3,
    title: 'Inactive Users',
    value: 2,
    subtitle: 'Users with inactive status',
    icon: UserMinus,
    variant: 'neutral',
  },
  {
    id: 4,
    title: 'Deleted Users',
    value: 12,
    subtitle: '8.0% / All',
    icon: UserX,
    variant: 'danger',
  },
  {
    id: 5,
    title: 'Total Events',
    value: 166,
    subtitle: 'All events',
    icon: CalendarDays,
    variant: 'primary',
  },
  {
    id: 6,
    title: 'Events Active (Right Now)',
    value: 0,
    subtitle: 'Currently happening',
    icon: BadgeCheck,
    variant: 'success',
  },
  {
    id: 7,
    title: 'Events Faded (Last 7 Days)',
    value: 0,
    subtitle: 'Auto-deleted in last week',
    icon: CalendarX,
    variant: 'warning',
  },
  {
    id: 8,
    title: 'Repeat Event Creators (%)',
    value: '52%',
    subtitle: 'Users with 2+ events in selected range',
    icon: Percent,
    variant: 'primary',
  },
];

export const dateRangeOptions = [
  { value: 'all', label: 'All' },
  { value: 'last-month', label: 'Last Month' },
  { value: 'last-3-months', label: 'Last 3 Months' },
  { value: 'last-6-months', label: 'Last 6 Months' },
];
