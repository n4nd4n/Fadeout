import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 px-4 pt-5 pb-4">
      <div className="w-8 h-8 rounded-full border-2 border-brand-600 flex items-center justify-center">
        <LayoutDashboard size={16} className="text-brand-600" />
      </div>
      <span className="text-xl font-bold text-theme-primary">FadeOut</span>
    </div>
  );
};

export default Logo;
