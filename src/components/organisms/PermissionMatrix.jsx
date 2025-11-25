import React, { useState, useEffect } from 'react';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import ErrorView from '@/components/ui/ErrorView';
import ApperIcon from '@/components/ApperIcon';
import permissionService from '@/services/api/permissionService';
import { useTranslation } from '@/hooks/useTranslation';

const PermissionMatrix = () => {
  const { t } = useTranslation();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await permissionService.getAll();
      setPermissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roles = ['ceo', 'manager', 'user'];
  const resources = ['companies', 'sites', 'users', 'permissions'];
  const actions = ['view', 'create', 'edit', 'delete'];

  const hasPermission = (role, resource, action) => {
    return permissions.some(p => 
      p.role === role && 
      p.resource === resource && 
      p.actions.includes(action)
    );
  };

  const getActionIcon = (action) => {
    const icons = {
      view: 'Eye',
      create: 'Plus',
      edit: 'Edit',
      delete: 'Trash'
    };
    return icons[action] || 'Circle';
  };

  const getRoleLabel = (role) => {
const labels = {
      ceo: 'CEO',
      manager: 'Manager',
      user: 'User'
    };
    return labels[role] || role;
  };

const getResourceLabel = (resource) => {
    const labels = {
      companies: 'Companies',
      sites: 'Sites',
      users: 'Users',
      permissions: 'Permissions'
    };
    return labels[resource] || resource;
  };

const getActionLabel = (action) => {
    const labels = {
      view: 'View',
      create: 'Create',
      edit: 'تعديل',
      delete: 'حذف'
    };
    return labels[action] || action;
  };

  if (loading) return <Loading variant="skeleton" />;
  if (error) return <ErrorView error={error} onRetry={loadPermissions} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
<h2 className="text-2xl font-display font-bold text-gray-900">Permission Matrix</h2>
        <p className="text-gray-600">Comprehensive view of permissions for each role in the system</p>
      </div>

      {/* Permission Matrix */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
<th className="text-start py-4 px-3 font-display font-semibold text-gray-900">
                  المورد / العملية
                </th>
                {roles.map(role => (
                  <th key={role} className="text-center py-4 px-3 min-w-[150px]">
                    <Badge role={role} className="font-display">
                      {getRoleLabel(role)}
                    </Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resources.map(resource => (
                <React.Fragment key={resource}>
                  {/* Resource Header */}
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <td colSpan={roles.length + 1} className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <ApperIcon 
                          name={resource === 'companies' ? 'Building2' : 
                                resource === 'sites' ? 'MapPin' :
                                resource === 'users' ? 'Users' : 'Shield'} 
                          className="h-4 w-4 text-primary" 
                        />
                        <span className="font-display font-semibold text-gray-900">
                          {getResourceLabel(resource)}
                        </span>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Actions for this resource */}
                  {actions.map(action => (
                    <tr key={`${resource}-${action}`} className="border-b border-gray-50 hover:bg-gray-50/30">
                      <td className="py-3 px-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <ApperIcon name={getActionIcon(action)} className="h-4 w-4 text-gray-500" />
                          {getActionLabel(action)}
                        </div>
                      </td>
                      {roles.map(role => (
                        <td key={`${resource}-${action}-${role}`} className="py-3 px-3 text-center">
                          {hasPermission(role, resource, action) ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-success/10 rounded-full">
                              <ApperIcon name="Check" className="h-4 w-4 text-success" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                              <ApperIcon name="X" className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4">
<h3 className="font-display font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
              <ApperIcon name="Check" className="h-4 w-4 text-success" />
            </div>
<span className="text-gray-700">Allowed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ApperIcon name="X" className="h-4 w-4 text-gray-400" />
            </div>
<span className="text-gray-700">Not Allowed</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PermissionMatrix;