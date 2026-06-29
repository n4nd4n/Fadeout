import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import SelectFilter from './SelectFilter';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
  className,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const from = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(totalItems, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between border-t border-theme-border bg-theme-card px-6 py-4 sm:h-[var(--listing-footer-height,56px)] shrink-0 gap-4", className)}>
      {/* Left side: showing text */}
      <div className="text-sm text-theme-secondary font-medium order-2 sm:order-1">
        Showing {from} to {to} of {totalItems}
      </div>

      {/* Right side: controls */}
      <div className="flex flex-wrap items-center gap-4 order-1 sm:order-2">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-theme-secondary tracking-wider whitespace-nowrap">
            Rows per page:
          </span>
          <div className="w-20">
            <SelectFilter
              value={String(itemsPerPage)}
              options={itemsPerPageOptions.map((opt) => ({
                value: String(opt),
                label: String(opt),
              }))}
              onChange={(val) => onItemsPerPageChange(Number(val))}
            />
          </div>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          {/* Previous Page Button */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center rounded border border-theme-border text-theme-secondary hover:bg-theme-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, idx) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-theme-secondary select-none"
                  >
                    ...
                  </span>
                );
              }
              const isCurrent = page === currentPage;
              return (
                <button
                  key={`page-${page}`}
                  type="button"
                  onClick={() => onPageChange(page as number)}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-all focus:outline-none",
                    isCurrent
                      ? "bg-brand-600 text-white border border-brand-600 shadow-sm"
                      : "border border-theme-border text-theme-secondary hover:bg-theme-hover hover:text-theme-primary"
                  )}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center rounded border border-theme-border text-theme-secondary hover:bg-theme-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
