import React from 'react';
import Badge from '@/components/atoms/Badge';
import { useTranslation } from '@/hooks/useTranslation';

const RoleBadge = ({ role, className, ...props }) => {
  const { t } = useTranslation();
  
  const roleLabels = {
    ceo: t('role.ceo.label', 'PDG'),
    manager: t('role.manager.label', 'Gestionnaire'),
    user: t('role.user.label', 'Utilisateur')
  };

  return (
    <Badge role={role} className={className} {...props}>
      {roleLabels[role] || role}
    </Badge>
  );
};

export default RoleBadge;