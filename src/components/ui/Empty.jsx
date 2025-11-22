import React from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "لا توجد بيانات", 
  description = "لم يتم العثور على أي عناصر",
  action,
  icon = "Inbox",
  className,
  ...props 
}) => {
  return (
    <div className={cn("min-h-[400px] flex items-center justify-center p-8", className)} {...props}>
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl flex items-center justify-center shadow-sm">
            <ApperIcon name={icon} className="h-12 w-12 text-gray-400" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-display font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {action && (
          <div className="pt-2">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default Empty;