import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { useTranslation } from '@/hooks/useTranslation';
import { usePermissions } from '@/hooks/usePermissions';
import ApperIcon from '@/components/ApperIcon';
import RoleBadge from '@/components/molecules/RoleBadge';

const SidebarContent = ({ isMobile = false, onClose }) => {
  const { t } = useTranslation();
  const { user } = useSelector(state => state.auth);
  const { canView } = usePermissions();

  const navigationItems = [
    {
      name: t('nav.dashboard.title', 'Tableau de Bord'),
      href: '',
      icon: 'Layout',
      exact: true
    },
    {
      name: t('nav.company.title', 'Entreprise'),
      href: 'company',
      icon: 'Building2',
      permission: { resource: 'companies', action: 'view' }
    },
    {
      name: t('nav.sites.title', 'Sites'),
      href: 'sites',
      icon: 'MapPin',
      permission: { resource: 'sites', action: 'view' }
    },
    {
      name: t('nav.users.title', 'Utilisateurs'),
      href: 'users',
      icon: 'Users',
      permission: { resource: 'users', action: 'view' }
    },
    {
      name: t('nav.permissions.title', 'Permissions'),
      href: 'permissions',
      icon: 'Shield',
      permission: { resource: 'permissions', action: 'view' }
    },
    {
      name: t('nav.settings.title', 'Paramètres'),
      href: 'settings',
      icon: 'Settings',
      exact: false
    }
  ];

  const filteredItems = navigationItems.filter(item => {
    if (!item.permission) return true;
    return canView(item.permission.resource, item.permission.scope);
  });

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary to-secondary text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <ApperIcon name="Shield" className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-white">Tamkin Control</h1>
            <p className="text-white/70 text-sm">نظام إدارة الامتثال</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.firstNameAr || user.firstNameFr || user.firstNameEn}
              </p>
              <div className="mt-1">
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredItems.map((item) => (
          <NavLink
            key={item.href}
            to={`/${item.href}`}
            onClick={handleNavClick}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
              "hover:bg-white/10 text-white/90 hover:text-white",
              isActive && "bg-white/10 text-white border-s-4 border-accent"
            )}
          >
            <ApperIcon name={item.icon} className="h-5 w-5 shrink-0" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <p className="text-white/50 text-xs text-center">
          © 2024 Tamkin Control
        </p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
export { SidebarContent };