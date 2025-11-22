import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import RoleBadge from '@/components/molecules/RoleBadge';
import StatusBadge from '@/components/molecules/StatusBadge';
import SearchBar from '@/components/molecules/SearchBar';
import Loading from '@/components/ui/Loading';
import ErrorView from '@/components/ui/ErrorView';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import userService from '@/services/api/userService';
import { setUsers, setLoading, setError } from '@/store/slices/userSlice';
import { usePermissions } from '@/hooks/usePermissions';
import { format } from 'date-fns';

const UserList = ({ onEdit, onView }) => {
  const dispatch = useDispatch();
  const { canEdit, canDelete } = usePermissions();
  const { users, loading, error } = useSelector(state => state.users);
  const { user: currentUser } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      let data;
      if (currentUser?.role === 'ceo') {
        data = await userService.getByCompanyId(currentUser.companyId);
      } else {
        data = await userService.getAll();
      }
      
      dispatch(setUsers(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    
    try {
      await userService.delete(userId);
      await loadUsers();
      toast.success('تم حذف المستخدم بنجاح');
    } catch (err) {
      toast.error('فشل في حذف المستخدم');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (
      user.firstNameAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstNameFr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstNameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) return <Loading variant="skeleton" />;
  if (error) return <ErrorView error={error} onRetry={loadUsers} />;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <SearchBar 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="البحث عن المستخدمين..."
          className="w-full sm:w-auto"
        />
        
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="all">جميع الأدوار</option>
          <option value="ceo">المدير العام</option>
          <option value="manager">مدير</option>
          <option value="user">موظف</option>
        </select>
      </div>

      {/* Users Grid */}
      {!filteredUsers.length ? (
        <Empty 
          title="لا توجد نتائج"
          description="لا توجد مستخدمين مطابقين لمعايير البحث"
          icon="UserX"
          action={
            <Button onClick={() => onEdit?.()} className="mt-4">
              <ApperIcon name="Plus" className="h-4 w-4 me-2" />
              إضافة مستخدم جديد
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <Card 
              key={user.id} 
              variant="interactive"
              className="hierarchy-border-user p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-yellow-200/10 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
                      {user.firstNameAr || user.firstNameFr} {user.lastNameAr || user.lastNameFr}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="mt-2">
                      <RoleBadge role={user.role} />
                    </div>
                  </div>
                </div>
                <StatusBadge status={user.status} />
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <ApperIcon name="Phone" className="h-4 w-4" />
                  <span className="text-start">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ApperIcon name="Globe" className="h-4 w-4" />
                  <span>{user.preferredLanguage?.toUpperCase()}</span>
                </div>
                {user.lastLogin && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <ApperIcon name="Clock" className="h-4 w-4" />
                    <span>آخر دخول: {format(new Date(user.lastLogin), 'yyyy/MM/dd')}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onView?.(user)}
                  className="flex-1"
                >
                  <ApperIcon name="Eye" className="h-4 w-4 me-1" />
                  عرض
                </Button>
                
                {canEdit('users') && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit?.(user)}
                  >
                    <ApperIcon name="Edit" className="h-4 w-4 me-1" />
                    تعديل
                  </Button>
                )}
                
                {canDelete('users') && user.id !== currentUser?.id && (
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    <ApperIcon name="Trash" className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;