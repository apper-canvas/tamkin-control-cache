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
error="You are not authorized to access site information"
        showRetry={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
<h1 className="text-3xl font-display font-bold text-gray-900">Site Management</h1>
<p className="text-gray-600 mt-1">View and manage all sites and branches</p>
        </div>
        {canCreate('sites') && (
          <Button onClick={handleCreate}>
            <ApperIcon name="Plus" className="h-4 w-4 me-2" />
Add New Site
          </Button>
        )}
      </div>

      {/* Sites List */}
      <SiteList onEdit={handleEdit} onView={handleView} />
    </div>
  );
};

export default Sites;