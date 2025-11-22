import React from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const ErrorView = ({ 
  error = "Une erreur s'est produite", 
  onRetry, 
  className,
  showRetry = true,
  ...props 
}) => {
  return (
    <div className={cn("min-h-[400px] flex items-center justify-center p-8", className)} {...props}>
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-error/10 to-error/5 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertCircle" className="h-10 w-10 text-error" />
          </div>
          <div className="absolute inset-0 rounded-full bg-error/10 animate-ping" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-display font-semibold text-gray-900">خطأ في النظام</h3>
          <p className="text-gray-600 leading-relaxed">{error}</p>
        </div>

        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            إعادة المحاولة
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorView;