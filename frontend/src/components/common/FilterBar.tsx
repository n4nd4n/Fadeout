import React from 'react';
import { Calendar } from 'lucide-react';
import SelectFilter from './SelectFilter';
import { cn } from '../../lib/utils';

interface FilterBarProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  dateRangeOptions: { value: string; label: string }[];
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  dateRange,
  onDateRangeChange,
  dateRangeOptions,
  className,
}) => {
  return (
    <SelectFilter
      value={dateRange}
      options={dateRangeOptions}
      onChange={onDateRangeChange}
      className={className}
    />
  );
};

export default FilterBar;