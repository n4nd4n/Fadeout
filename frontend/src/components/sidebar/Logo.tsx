import React, { useState, useEffect } from 'react';
import { LayoutDashboard } from 'lucide-react';
import api from '../../utils/api';

const Logo: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const [companyName, setCompanyName] = useState('Fadeout Admin Platform');

  const getFullUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBaseUrl}${cleanPath}`;
  };

  const fetchSettings = async () => {
    try {
      const response = await api.get('/api/system-setting');
      if (response.data && response.data.success) {
        const s = response.data.data;
        if (s.logoPath) {
          setLogoUrl(getFullUrl(s.logoPath));
        }
        if (s.companyName) {
          setCompanyName(s.companyName);
        }
        if (s.faviconPath) {
          const favUrl = getFullUrl(s.faviconPath);
          let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          link.href = favUrl;
        }
      }
    } catch (error) {
      console.error('Error fetching settings for logo:', error);
    }
  };

  useEffect(() => {
    fetchSettings();
    window.addEventListener('system-settings-updated', fetchSettings);
    return () => {
      window.removeEventListener('system-settings-updated', fetchSettings);
    };
  }, []);

  return (
    <a className="flex items-center gap-2" href="/dashboard">
      {logoUrl ? (
        <img 
          alt={companyName} 
          className="h-8 w-auto object-contain" 
          src={logoUrl} 
        />
      ) : (
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-brand-600)] dark:border-[var(--color-brand-400)] flex items-center justify-center">
          <LayoutDashboard size={16} className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" />
        </div>
      )}
      <span className="text-lg font-bold text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
        FadeOut
      </span>
    </a>
  );
};

export default Logo;
