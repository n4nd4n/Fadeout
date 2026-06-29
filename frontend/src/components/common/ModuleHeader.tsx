import React from 'react';
import { cn } from '../../lib/utils';

interface ModuleHeaderProps {
  title: string;
  breadcrumb?: string;
  className?: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  breadcrumb,
  className,
}) => {
  return (
    <div className={cn('mb-3 flex-shrink-0', className)}>
      <div className="">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-theme-primary truncate">{title}</h1>
            {breadcrumb && (
              <nav className="flex items-center gap-1.5 text-xs mt-1">
                <a className="text-theme-secondary hover:text-theme-primary" href="/dashboard">
                  {breadcrumb}
                </a>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleHeader;
