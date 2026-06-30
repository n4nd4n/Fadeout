import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const Footer: React.FC = () => {
  const [copyrightText, setCopyrightText] = useState('© 2026 Fadeout Admin. All rights reserved.');

  const fetchSettings = async () => {
    try {
      const response = await api.get('/api/system-setting');
      if (response.data && response.data.success) {
        const s = response.data.data;
        if (s.copyrightText) {
          setCopyrightText(s.copyrightText);
        }
      }
    } catch (error) {
      console.error('Error fetching settings for footer:', error);
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
    <footer className="px-6 py-2 min-h-[var(--listing-footer-height)] min-h-(--listing-footer-height) border-t border-theme-border bg-theme-footer flex flex-col sm:flex-row items-center justify-between text-xs text-theme-secondary gap-2 shrink-0 select-none">
      <div>{copyrightText}</div>
      <div>
        Designed and Developed by{' '}
        <a
          href="https://www.hiddenbrains.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-theme-primary decoration-2 underline-offset-2 hover:underline"
        >
          Hidden Brains
        </a>
      </div>
    </footer>
  );
};

export default Footer;
