import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/molecules/StatusBadge';
import Loading from '@/components/ui/Loading';
import ErrorView from '@/components/ui/ErrorView';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import companyService from '@/services/api/companyService';
import { setCompanies, setLoading, setError } from '@/store/slices/companySlice';
import { useTranslation } from '@/hooks/useTranslation';
import { usePermissions } from '@/hooks/usePermissions';

const CompanyList = ({ onEdit, onView }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { canEdit, canDelete } = usePermissions();
  const { companies, loading, error } = useSelector(state => state.companies);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const data = await companyService.getAll();
      dispatch(setCompanies(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (companyId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الشركة؟')) return;
    
    try {
      await companyService.delete(companyId);
      await loadCompanies();
      toast.success('تم حذف الشركة بنجاح');
    } catch (err) {
      toast.error('فشل في حذف الشركة');
    }
  };

  if (loading) return <Loading variant="skeleton" />;
  if (error) return <ErrorView error={error} onRetry={loadCompanies} />;
  if (!companies.length) return (
    <Empty 
      title="لا توجد شركات"
      description="لم يتم إنشاء أي شركات بعد"
      icon="Building2"
      action={
        <Button onClick={() => onEdit?.()} className="mt-4">
          <ApperIcon name="Plus" className="h-4 w-4 me-2" />
          إضافة شركة جديدة
        </Button>
      }
    />
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <Card 
          key={company.id} 
          variant="interactive"
          className="hierarchy-border-company p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-1">
                {company.nameAr}
              </h3>
              <p className="text-sm text-gray-600">{company.nameFr}</p>
              <p className="text-xs text-gray-500 mt-1">{company.registrationNumber}</p>
            </div>
            <StatusBadge status={company.status} />
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="MapPin" className="h-4 w-4" />
              <span>{company.city}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="Phone" className="h-4 w-4" />
              <span className="text-start">{company.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="Mail" className="h-4 w-4" />
              <span className="text-start">{company.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => onView?.(company)}
              className="flex-1"
            >
              <ApperIcon name="Eye" className="h-4 w-4 me-1" />
              عرض
            </Button>
            
            {canEdit('companies') && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEdit?.(company)}
              >
                <ApperIcon name="Edit" className="h-4 w-4 me-1" />
                تعديل
              </Button>
            )}
            
            {canDelete('companies') && (
              <Button 
                size="sm" 
                variant="danger"
                onClick={() => handleDelete(company.id)}
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

export default CompanyList;