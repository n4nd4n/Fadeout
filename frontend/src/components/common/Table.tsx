import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  gridTemplateColumns: string;
  minWidth?: string;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: (key: string) => void;
  rowKey: (item: T) => string | number;
  className?: string;
  onRowClick?: (item: T) => void;
  maxRows?: number;
}

const Table = <T,>({
  columns,
  data,
  gridTemplateColumns,
  minWidth = "78.75rem",
  sortKey,
  sortDirection,
  onSort,
  rowKey,
  className,
  onRowClick,
  maxRows = 5,
}: TableProps<T>) => {
  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;
    if (sortKey === column.key) {
      if (sortDirection === 'asc') {
        return <ArrowUp className="w-4 h-4 text-brand-600 dark:text-brand-400" />;
      }
      return <ArrowDown className="w-4 h-4 text-brand-600 dark:text-brand-400" />;
    }
    return <ArrowUpDown className="w-4 h-4 text-neutral-400 dark:text-neutral-600" />;
  };

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center justify-center';
    if (align === 'right') return 'text-right justify-end';
    return 'text-left justify-start';
  };

  const hasOverflow = data.length > maxRows;

  return (
    <div className={cn("flex flex-col w-full bg-theme-card border border-theme-border rounded-lg overflow-hidden", className)}>
      <div 
        className={cn("overflow-x-auto custom-scroll", hasOverflow ? "overflow-y-auto" : "overflow-y-hidden")}
        style={{
          maxHeight: hasOverflow ? `${(maxRows + 1) * 56}px` : undefined,
        }}
      >
        <div
          style={{
            minWidth: `max(100%, ${minWidth})`,
            width: `max(100%, ${minWidth})`,
          }}
          className="flex flex-col"
        >
          {/* Sticky Table Header */}
          <div className="sticky top-0 z-30 bg-theme-card shadow-sm border-b border-theme-border shrink-0">
            <div
              className="grid items-center bg-theme-bg"
              style={{ gridTemplateColumns }}
            >
              {columns.map((column) => {
                const alignClass = getAlignClass(column.align);
                if (column.sortable && onSort) {
                  return (
                    <button
                      key={column.key}
                      type="button"
                      title={column.label}
                      onClick={() => onSort(column.key)}
                      className={cn(
                        "px-4 py-3 text-xs font-medium tracking-wider flex items-center gap-2 cursor-pointer min-w-0 overflow-hidden text-ellipsis whitespace-nowrap hover:bg-theme-hover outline-none border-none",
                        alignClass
                      )}
                    >
                      <span className="text-theme-secondary">{column.label}</span>
                      {getSortIcon(column)}
                    </button>
                  );
                }

                return (
                  <div
                    key={column.key}
                    title={column.label}
                    className={cn(
                      "px-4 py-3 text-xs font-medium tracking-wider flex items-center gap-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
                      alignClass
                    )}
                  >
                    <span className="text-theme-secondary">{column.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Table Body Content */}
          <div className="flex flex-col w-full">
            {data.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-12 text-sm text-theme-secondary">
                No results found
              </div>
            ) : (
              data.map((item) => (
                <div
                  key={rowKey(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={cn(
                    "grid items-center border-b border-theme-border bg-theme-card hover:bg-theme-hover transition-colors shrink-0",
                    onRowClick && "cursor-pointer"
                  )}
                  style={{
                    gridTemplateColumns,
                    height: '56px',
                  }}
                >
                  {columns.map((column) => {
                    const alignClass = getAlignClass(column.align);
                    return (
                      <div
                        key={column.key}
                        className={cn(
                          "px-4 py-3 text-sm text-theme-primary min-w-0 overflow-hidden text-ellipsis whitespace-nowrap",
                          alignClass
                        )}
                      >
                        {column.render ? column.render(item) : (item as any)[column.key]}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
