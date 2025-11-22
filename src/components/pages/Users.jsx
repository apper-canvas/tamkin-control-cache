import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import UserList from '@/components/organisms/UserList';
import { usePermissions } from '@/hooks/usePermissions';
import ErrorView from '@/components/ui/ErrorView';

const Users = () => {
  const { canView, canCreate } = usePermissions();

  const handleEdit = (user) => {
    // Placeholder for edit functionality
    console.log('Edit user:', user);
  };

  const handleView = (user) => {
    // Placeholder for view functionality
    console.log('View user:', user);
  };

  const handleCreate = () => {
    // Placeholder for create functionality
    console.log('Create new user');
  };

  if (!canView('users')) {
    return (
      <ErrorView 
        error="غير مخول لك الوصول إلى معلومات المستخدمين"
        showRetry={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600 mt-1">إدارة حسابات المستخدمين والأدوار والصلاحيات</p>
        </div>
        {canCreate('users') && (
          <Button onClick={handleCreate}>
            <ApperIcon name="Plus" className="h-4 w-4 me-2" />
            إضافة مستخدم جديد
          </Button>
        )}
      </div>

      {/* Users List */}
      <UserList onEdit={handleEdit} onView={handleView} />
    </div>
  );
};

export default Users;