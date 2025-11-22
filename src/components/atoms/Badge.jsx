import React from 'react';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const Badge = React.forwardRef(({ 
  children, 
  variant = "default", 
  role,
  icon,
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    error: "bg-error/10 text-error border border-error/20",
    info: "bg-info/10 text-info border border-info/20"
  };

  const roleStyles = {
    ceo: "role-badge-ceo",
    manager: "role-badge-manager", 
    user: "role-badge-user"
  };

  const roleIcons = {
    ceo: "Crown",
    manager: "Star",
    user: "User"
  };

  const finalVariant = role ? roleStyles[role] : variants[variant];
  const finalIcon = role ? roleIcons[role] : icon;

  return (
    <span
      ref={ref}
      className={cn(baseStyles, finalVariant, className)}
      {...props}
    >
      {finalIcon && <ApperIcon name={finalIcon} className="h-3 w-3" />}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;