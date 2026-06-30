import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Settings,
} from 'lucide-react';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import SidebarSubMenu from './SidebarSubMenu';
import SidebarFooter from './SidebarFooter';
import { useSidebar } from '../../context/SidebarContext';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'user-management': location.pathname.startsWith('/users'),
    'configurations': location.pathname.startsWith('/configurations'),
  });

  // Keep expanded state in sync with route changes
  useEffect(() => {
    if (location.pathname.startsWith('/users')) {
      setExpandedMenus((prev) => ({ ...prev, 'user-management': true }));
    }
    if (location.pathname.startsWith('/configurations')) {
      setExpandedMenus((prev) => ({ ...prev, 'configurations': true }));
    }
  }, [location.pathname]);

  const menuItems = [
    { id: 'sitemap', icon: FileText, label: 'Sitemap', path: '/sitemap' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    {
      id: 'user-management',
      icon: Users,
      label: 'User Management',
      hasSubmenu: true,
      submenu: [
        { id: 'users', label: 'Users', path: '/users/list' },
        { id: 'deleted-users', label: 'Deleted Users', path: '/users/deleted' },
      ],
    },
    { id: 'event-management', icon: Calendar, label: 'Event Management', path: '/events' },
    {
      id: 'configurations',
      icon: Settings,
      label: 'Configurations',
      hasSubmenu: true,
      submenu: [
        { id: 'static-pages', label: 'Static Pages', path: '/configurations/static-pages' },
        { id: 'email-notifications', label: 'Email Notifications', path: '/configurations/email-notifications' },
        { id: 'system-notifications', label: 'System Notifications', path: '/configurations/system-notifications' },
        { id: 'push-notifications', label: 'Push Notifications', path: '/configurations/push-notifications' },
        { id: 'system-settings', label: 'System Settings', path: '/configurations/system-settings' },
      ],
    },
  ];

  // Determine active menu item
  const getActiveMenuId = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/sitemap')) return 'sitemap';
    if (path.startsWith('/users')) return 'user-management';
    if (path.startsWith('/events')) return 'event-management';
    if (path.startsWith('/configurations')) return 'configurations';
    return '';
  };

  const activeMenu = getActiveMenuId();

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  return (
    <aside
      className={`flex flex-col shrink-0 bg-theme-sidebar border-r border-theme-border transition-all duration-300 md:relative md:translate-x-0 fixed top-0 left-0 h-full -translate-x-full z-50 md:z-auto select-none ${
        isCollapsed ? 'w-[72px]' : 'w-[256px]'
      }`}
      style={{ '--sidebar-current-width': isCollapsed ? '72px' : '256px' } as React.CSSProperties}
    >
      {/* Sidebar Header containing Logo and Menu Toggle */}
      {isCollapsed ? (
        <div className="shrink-0 flex items-center flex-col px-2 py-2 gap-1">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex items-center justify-center rounded-lg text-theme-secondary hover:bg-theme-hover transition-colors w-full py-2.5 cursor-pointer"
            aria-label="Expand sidebar"
            title="Expand menu"
          >
            <Menu size={20} className="w-5 h-5 text-current" />
          </button>
        </div>
      ) : (
        <div className="shrink-0 flex items-center h-[var(--header-height)] px-4 justify-between">
          <Logo />
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex items-center justify-center rounded-lg text-theme-secondary hover:bg-theme-hover transition-colors w-8 h-8 cursor-pointer"
            aria-label="Collapse sidebar"
            title="Collapse menu"
          >
            <Menu size={20} className="w-5 h-5 text-current" />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 custom-scroll">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                isActive={activeMenu === item.id}
                hasSubmenu={item.hasSubmenu}
                isExpanded={expandedMenus[item.id]}
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleMenu(item.id);
                  } else if (item.path) {
                    navigate(item.path);
                  }
                }}
              />
              {item.hasSubmenu && expandedMenus[item.id] && !isCollapsed && (
                <SidebarSubMenu items={item.submenu || []} />
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
