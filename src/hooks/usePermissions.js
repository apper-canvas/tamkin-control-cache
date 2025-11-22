import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import permissionService from '@/services/api/permissionService';

export const usePermissions = () => {
  const { user } = useSelector(state => state.auth);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPermissions = async () => {
      if (!user?.role) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userPermissions = await permissionService.getByRole(user.role);
        setPermissions(userPermissions);
      } catch (error) {
        console.error('Failed to load permissions:', error);
        setPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [user?.role]);

  const hasPermission = (resource, action, scope = null) => {
    if (!user?.role || !permissions.length) return false;

    const permission = permissions.find(p => 
      p.resource === resource &&
      (scope ? p.scope === scope : true)
    );
    
    return permission ? permission.actions.includes(action) : false;
  };

  const canView = (resource, scope = null) => hasPermission(resource, 'view', scope);
  const canCreate = (resource, scope = null) => hasPermission(resource, 'create', scope);
  const canEdit = (resource, scope = null) => hasPermission(resource, 'edit', scope);
  const canDelete = (resource, scope = null) => hasPermission(resource, 'delete', scope);

  return {
    permissions,
    loading,
    hasPermission,
    canView,
    canCreate,
    canEdit,
    canDelete
  };
};