import React from 'react';
import Badge from '@/components/atoms/Badge';

const StatusBadge = ({ status, className, ...props }) => {
  const statusConfig = {
    active: { variant: 'success', label: 'نشط', icon: 'CheckCircle' },
    inactive: { variant: 'warning', label: 'غير نشط', icon: 'Clock' },
    suspended: { variant: 'error', label: 'معلق', icon: 'XCircle' },
    archived: { variant: 'default', label: 'مؤرشف', icon: 'Archive' },
    underMaintenance: { variant: 'warning', label: 'تحت الصيانة', icon: 'Tool' }
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <Badge 
      variant={config.variant} 
      icon={config.icon}
      className={className} 
      {...props}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;