import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export type StatCardVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: StatCardVariant;
  className?: string;
  layout?: 'default' | 'value-top';
}

const getVariantClasses = (variant: StatCardVariant = 'primary') => {
  switch (variant) {
    case 'success':
      return {
        bg: 'bg-[#DCFCE7] dark:bg-green-950/40',
        text: 'text-[#16A34A] dark:text-green-400',
        subtitle: 'text-[#16A34A] dark:text-green-400',
      };
    case 'warning':
      return {
        bg: 'bg-[#FEF3C7] dark:bg-yellow-950/40',
        text: 'text-[#EAB308] dark:text-yellow-400',
        subtitle: 'text-[#EAB308] dark:text-yellow-400',
      };
    case 'danger':
      return {
        bg: 'bg-[#FDECEC] dark:bg-red-950/40',
        text: 'text-[#EF4444] dark:text-red-400',
        subtitle: 'text-[#EF4444] dark:text-red-400',
      };
    case 'neutral':
      return {
        bg: 'bg-[#F3F4F6] dark:bg-gray-800/40',
        text: 'text-[#6B7280] dark:text-gray-400',
        subtitle: 'text-[#6B7280] dark:text-gray-400',
      };
    case 'primary':
    default:
      return {
        bg: 'bg-brand-50 dark:bg-brand-950/20',
        text: 'text-brand-600 dark:text-brand-400',
        subtitle: 'text-brand-600 dark:text-brand-400',
      };
  }
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle = '',
  icon: Icon,
  variant = 'primary',
  className,
  layout = 'default',
}) => {
  const classes = getVariantClasses(variant);

  if (layout === 'value-top') {
    return (
      <div
        className={cn(
          'bg-theme-card border border-theme-border p-6 rounded-xl shadow-sm relative overflow-hidden group flex flex-col justify-between h-full',
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-theme-primary select-all">{value}</span>
          <div className={cn('p-2 rounded-lg flex items-center justify-center', classes.bg, classes.text)}>
            <Icon size={20} className="w-5 h-5 text-current" />
          </div>
        </div>
        <p className="text-sm font-medium text-theme-secondary">{title}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-theme-card border border-theme-border rounded-xl p-4 flex items-start justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-150 h-full',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-theme-secondary mb-1">{title}</p>
        <p className="text-2xl font-bold text-theme-primary select-all">{value}</p>
        {subtitle && <p className={cn('text-xs mt-1 truncate', classes.subtitle)}>{subtitle}</p>}
      </div>
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', classes.bg, classes.text)}>
        <Icon size={20} className="w-5 h-5 text-current" />
      </div>
    </div>
  );
};

export default StatCard;