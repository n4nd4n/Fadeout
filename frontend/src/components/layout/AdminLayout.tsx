import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ChangePasswordModal from '../common/ChangePasswordModal';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-theme-bg text-theme-primary font-inter">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Container */}
      <div className="flex flex-1 min-h-0 flex-col min-w-0">
        {/* Fixed Header */}
        <Header />
        
        <main data-scroll-lock="true" className="flex-1 overflow-y-auto bg-theme-bg custom-scroll">
          <section className="w-full bg-theme-bg">
            <div className="flex flex-col [--page-padding-x:24px] [--page-padding-top:12px] [--page-padding-bottom:16px] px-[var(--page-padding-x)] pt-[var(--page-padding-top)] pb-[var(--page-padding-bottom)]">
              {children}
            </div>
          </section>
        </main>
        
        {/* Fixed Footer */}
        <Footer />
      </div>

      {/* Change Password Dialog Popup */}
      <ChangePasswordModal />
    </div>
  );
};

export default AdminLayout;