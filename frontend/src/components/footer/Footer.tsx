import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-2 min-h-[var(--listing-footer-height)] min-h-(--listing-footer-height) border-t border-theme-border bg-theme-footer flex flex-col sm:flex-row items-center justify-between text-xs text-theme-secondary gap-2 shrink-0 select-none">
      <div>© 2026 Fadeout Admin. All rights reserved.</div>
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
