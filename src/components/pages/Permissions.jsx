import React from 'react';
import PermissionMatrix from '@/components/organisms/PermissionMatrix';
import { usePermissions } from '@/hooks/usePermissions';
import ErrorView from '@/components/ui/ErrorView';

const Permissions = () => {
  const { canView } = usePermissions();

  if (!canView('permissions')) {
    return (
      <ErrorView 
error="You are not authorized to access permission information"
        showRetry={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
<h1 className="text-3xl font-display font-bold text-gray-900">Permissions and Roles</h1>
<p className="text-gray-600 mt-1">Detailed view of permissions for each role in the system</p>
      </div>

      {/* Permission Matrix */}
      <PermissionMatrix />
    </div>
  );
};

export default Permissions;