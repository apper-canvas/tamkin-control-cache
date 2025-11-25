import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import StatusBadge from '@/components/molecules/StatusBadge';
import Loading from '@/components/ui/Loading';
import ErrorView from '@/components/ui/ErrorView';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import siteService from '@/services/api/siteService';
import { setSites, setLoading, setError } from '@/store/slices/siteSlice';
import { usePermissions } from '@/hooks/usePermissions';

const SiteList = ({ onEdit, onView }) => {
  const dispatch = useDispatch();
  const { canEdit, canDelete } = usePermissions();
  const { sites, loading, error } = useSelector(state => state.sites);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      let data;
      if (user?.role === 'ceo') {
        data = await siteService.getByCompanyId(user.companyId);
      } else {
        data = await siteService.getAll();
      }
      
      dispatch(setSites(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (siteId) => {
if (!window.confirm('Are you sure you want to delete this site?')) return;
    
    try {
      await siteService.delete(siteId);
      await loadSites();
toast.success('Site deleted successfully');
    } catch (err) {
toast.error('Failed to delete site');
    }
  };

  const getSiteTypeIcon = (type) => {
    const icons = {
      hotel: 'Building',
      restaurant: 'UtensilsCrossed',
      cafe: 'Coffee',
      resort: 'Palmtree',
      other: 'MapPin'
    };
    return icons[type] || icons.other;
  };

  const getSiteTypeName = (type) => {
const names = {
      hotel: 'Hotel',
      restaurant: 'Restaurant',
      cafe: 'Cafe',
      resort: 'Resort',
      other: 'Other'
    };
    return names[type] || names.other;
  };

  if (loading) return <Loading variant="skeleton" />;
  if (error) return <ErrorView error={error} onRetry={loadSites} />;
  if (!sites.length) return (
    <Empty 
title="No Sites"
      description="No sites have been created yet"
      icon="MapPin"
      action={
        <Button onClick={() => onEdit?.()} className="mt-4">
          <ApperIcon name="Plus" className="h-4 w-4 me-2" />
Add New Site
        </Button>
      }
    />
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <Card 
          key={site.id} 
          variant="interactive"
          className="hierarchy-border-site p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-info/10 rounded-lg flex items-center justify-center">
                <ApperIcon name={getSiteTypeIcon(site.type)} className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
                  {site.nameAr}
                </h3>
                <p className="text-sm text-gray-600">{site.nameFr}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="info" className="text-xs">
                    {getSiteTypeName(site.type)}
                  </Badge>
                  <span className="text-xs text-gray-500">{site.siteCode}</span>
                </div>
              </div>
            </div>
            <StatusBadge status={site.status} />
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="MapPin" className="h-4 w-4" />
              <span>{site.city}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="Users" className="h-4 w-4" />
<span>Capacity: {site.capacity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="Phone" className="h-4 w-4" />
              <span className="text-start">{site.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => onView?.(site)}
              className="flex-1"
            >
              <ApperIcon name="Eye" className="h-4 w-4 me-1" />
View
            </Button>
            
            {canEdit('sites') && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEdit?.(site)}
              >
                <ApperIcon name="Edit" className="h-4 w-4 me-1" />
Edit
              </Button>
            )}
            
            {canDelete('sites') && (
              <Button 
                size="sm" 
                variant="danger"
                onClick={() => handleDelete(site.id)}
              >
                <ApperIcon name="Trash" className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SiteList;