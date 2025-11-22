import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import SiteList from '@/components/organisms/SiteList';
import { usePermissions } from '@/hooks/usePermissions';
import ErrorView from '@/components/ui/ErrorView';

const Sites = () => {
  const { canView, canCreate } = usePermissions();

  const handleEdit = (site) => {
    // Placeholder for edit functionality
    console.log('Edit site:', site);
  };

  const handleView = (site) => {
    // Placeholder for view functionality
    console.log('View site:', site);
  };

  const handleCreate = () => {
    // Placeholder for create functionality
    console.log('Create new site');
  };

  if (!canView('sites')) {
    return (
      <ErrorView 
        error="غير مخول لك الوصول إلى معلومات المواقع"
        showRetry={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">إدارة المواقع</h1>
          <p className="text-gray-600 mt-1">عرض وإدارة جميع المواقع والفروع</p>
        </div>
        {canCreate('sites') && (
          <Button onClick={handleCreate}>
            <ApperIcon name="Plus" className="h-4 w-4 me-2" />
            إضافة موقع جديد
          </Button>
        )}
      </div>

      {/* Sites List */}
      <SiteList onEdit={handleEdit} onView={handleView} />
    </div>
  );
};

export default Sites;