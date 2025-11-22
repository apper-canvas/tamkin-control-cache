import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-blue-50 px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Error Graphic */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-error/10 to-error/5 rounded-3xl flex items-center justify-center">
            <span className="text-6xl font-display font-bold text-error">404</span>
          </div>
          <div className="absolute -top-4 -end-4 w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertTriangle" className="h-6 w-6 text-accent" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-3xl font-display font-bold text-gray-900">الصفحة غير موجودة</h1>
          <p className="text-gray-600 leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')} 
            className="w-full"
          >
            <ApperIcon name="Home" className="h-4 w-4 me-2" />
            العودة إلى الصفحة الرئيسية
          </Button>
          
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="w-full"
          >
            <ApperIcon name="ArrowRight" className="h-4 w-4 me-2 mirror-rtl" />
            العودة إلى الصفحة السابقة
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع فريق الدعم الفني
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;