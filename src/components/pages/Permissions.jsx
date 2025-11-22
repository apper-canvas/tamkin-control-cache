import React from 'react';
import PermissionMatrix from '@/components/organisms/PermissionMatrix';
import { usePermissions } from '@/hooks/usePermissions';
import ErrorView from '@/components/ui/ErrorView';

const Permissions = () => {
  const { canView } = usePermissions();

  if (!canView('permissions')) {
    return (
      <ErrorView 
        error="غير مخول لك الوصول إلى معلومات الصلاحيات"
        showRetry={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">الصلاحيات والأدوار</h1>
        <p className="text-gray-600 mt-1">عرض تفصيلي لصلاحيات كل دور في النظام</p>
      </div>

      {/* Permission Matrix */}
      <PermissionMatrix />
    </div>
  );
};

export default Permissions;