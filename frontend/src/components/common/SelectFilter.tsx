import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface SelectFilterProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedLabel = options.find((opt) => opt.value === value)?.label || 'All';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('react-select-container css-b62m3t-container w-full relative', className)}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="react-select__control css-j97imc-control flex items-center justify-between border border-theme-border rounded-lg px-3 py-1 bg-theme-card cursor-pointer h-9 select-none"
      >
        <div className="react-select__value-container react-select__value-container--has-value css-hlgwow flex-1">
          <div className="react-select__single-value css-se8pu2-singleValue text-sm text-theme-primary">
            {selectedLabel}
          </div>
        </div>
        <div className="react-select__indicators css-1wy0on6 flex items-center">
          <span className="react-select__indicator-separator css-1u9des2-indicatorSeparator w-[1px] h-4 bg-theme-border mx-2"></span>
          <div className="react-select__indicator react-select__dropdown-indicator css-ionxey-indicatorContainer text-theme-secondary">
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-8mmkcg fill-current"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0 l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-theme-sidebar border border-theme-border rounded-lg shadow-lg z-50 py-1">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "px-3 py-2 text-sm text-theme-primary hover:bg-theme-hover cursor-pointer font-medium font-inter",
                option.value === value && "bg-theme-active text-brand-600 dark:text-theme-primary"
              )}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectFilter;
