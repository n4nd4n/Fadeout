import React from 'react';
import { cn } from '../../lib/utils';

interface InfoNoteProps {
  children: React.ReactNode;
  className?: string;
}

const InfoNote: React.FC<InfoNoteProps> = ({ children, className }) => {
  return (
    <div className={cn("px-6 pb-4", className)}>
      <div className="bg-theme-bg border border-theme-border rounded-lg p-4 text-sm text-theme-secondary shadow-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default InfoNote;
