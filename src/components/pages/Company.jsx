import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Loading from '@/components/ui/Loading';
import ErrorView from '@/components/ui/ErrorView';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import CompanyList from '@/components/organisms/CompanyList';
import { usePermissions } from '@/hooks/usePermissions';
import companyService from '@/services/api/companyService';

const Company = () => {
  const { user } = useSelector(state => state.auth);
  const { canView, canEdit } = usePermissions();
  const [currentCompany, setCurrentCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCompany();
  }, [user]);

  const loadCompany = async () => {
    if (!user?.companyId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const company = await companyService.getById(user.companyId);
      setCurrentCompany(company);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (company) => {
    // Placeholder for edit functionality
    console.log('Edit company:', company);
  };

  const handleView = (company) => {
    setCurrentCompany(company);
  };

  if (!canView('companies')) {
    return (
      <ErrorView 
        error="غير مخول لك الوصول إلى معلومات الشركة"
        showRetry={false}
      />
    );
  }

  if (loading) return <Loading />;
  if (error) return <ErrorView error={error} onRetry={loadCompany} />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">إدارة الشركة</h1>
          <p className="text-gray-600 mt-1">عرض وإدارة معلومات الشركة</p>
        </div>
        {canEdit('companies') && (
          <Button onClick={() => handleEdit(currentCompany)}>
            <ApperIcon name="Edit" className="h-4 w-4 me-2" />
            تعديل الشركة
          </Button>
        )}
      </div>

      {/* Company Details or List */}
      {user?.role === 'ceo' && currentCompany ? (
        <Card className="hierarchy-border-company p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4">معلومات أساسية</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (عربي)</label>
                  <p className="text-lg font-semibold text-gray-900">{currentCompany.nameAr}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (فرنسي)</label>
                  <p className="text-lg font-semibold text-gray-900">{currentCompany.nameFr}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (إنجليزي)</label>
                  <p className="text-lg font-semibold text-gray-900">{currentCompany.nameEn}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رقم التسجيل</label>
                    <p className="text-gray-900">{currentCompany.registrationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الرقم الضريبي</label>
                    <p className="text-gray-900">{currentCompany.taxId}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القطاع</label>
                  <p className="text-gray-900 capitalize">{currentCompany.industry}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-4">معلومات الاتصال</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (عربي)</label>
                  <p className="text-gray-900">{currentCompany.addressAr}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (فرنسي)</label>
                  <p className="text-gray-900">{currentCompany.addressFr}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                  <p className="text-gray-900">{currentCompany.city}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Phone" className="h-5 w-5 text-gray-500" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                      <p className="text-gray-900 text-start">{currentCompany.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Mail" className="h-5 w-5 text-gray-500" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                      <p className="text-gray-900 text-start">{currentCompany.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Dates */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">الحالة: </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  currentCompany.status === 'active' ? 'bg-success/10 text-success' :
                  currentCompany.status === 'suspended' ? 'bg-error/10 text-error' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {currentCompany.status === 'active' ? 'نشط' : 
                   currentCompany.status === 'suspended' ? 'معلق' : 'مؤرشف'}
                </span>
              </div>
              <div>
                <span className="font-medium">تاريخ الإنشاء: </span>
                {new Date(currentCompany.createdAt).toLocaleDateString('ar-MA')}
              </div>
              <div>
                <span className="font-medium">آخر تحديث: </span>
                {new Date(currentCompany.updatedAt).toLocaleDateString('ar-MA')}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <CompanyList onEdit={handleEdit} onView={handleView} />
      )}
    </div>
  );
};

export default Company;