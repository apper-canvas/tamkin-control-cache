import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import RoleBadge from '@/components/molecules/RoleBadge';
import Loading from '@/components/ui/Loading';
import ApperIcon from '@/components/ApperIcon';
import { useTranslation } from '@/hooks/useTranslation';
import { usePermissions } from '@/hooks/usePermissions';
import companyService from '@/services/api/companyService';
import siteService from '@/services/api/siteService';
import userService from '@/services/api/userService';

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { canView } = usePermissions();
  
  const [stats, setStats] = useState({
    companies: 0,
    sites: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [companiesData, sitesData, usersData] = await Promise.all([
        canView('companies') ? companyService.getAll() : Promise.resolve([]),
        canView('sites') ? (user?.role === 'ceo' ? siteService.getByCompanyId(user.companyId) : siteService.getAll()) : Promise.resolve([]),
        canView('users') ? (user?.role === 'ceo' ? userService.getByCompanyId(user.companyId) : userService.getAll()) : Promise.resolve([])
      ]);

      setStats({
        companies: companiesData.length,
        sites: sitesData.length,
        users: usersData.length
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDashboardTitle = () => {
const titles = {
      ceo: 'CEO Dashboard',
      manager: 'Manager Dashboard',
      user: 'Personal Dashboard'
    };
    return titles[user?.role] || 'Dashboard';
  };

const getWelcomeMessage = () => {
    const time = new Date().getHours();
    let greeting;
    
    if (time < 12) {
      greeting = 'Good Morning';
    } else if (time < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }
    
    return `${greeting}, ${user?.firstNameEn || user?.firstNameFr || user?.firstNameAr}`;
  };

const quickActions = [
    {
      title: 'Company Management',
      description: 'View and update company information',
      icon: 'Building2',
      color: 'from-primary to-secondary',
      href: 'company',
      permission: { resource: 'companies', action: 'view' }
    },
    {
      title: 'Sites Management',
      description: 'View and manage all sites',
      icon: 'MapPin',
      color: 'from-secondary to-info',
      href: 'sites',
      permission: { resource: 'sites', action: 'view' }
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and roles',
      icon: 'Users',
      color: 'from-accent to-yellow-500',
      href: 'users',
      permission: { resource: 'users', action: 'view' }
    },
    {
      title: 'Permission Matrix',
      description: 'View permissions for different roles',
      icon: 'Shield',
      color: 'from-success to-green-500',
      href: 'permissions',
      permission: { resource: 'permissions', action: 'view' }
    }
  ];

  const filteredActions = quickActions.filter(action => 
    !action.permission || canView(action.permission.resource, action.permission.scope)
  );

  const statsCards = [
{
      title: 'Companies',
      value: stats.companies,
      icon: 'Building2',
      color: 'text-primary',
      bgColor: 'from-primary/10 to-primary/5',
      show: canView('companies')
    },
    {
      title: 'Sites',
      value: stats.sites,
      icon: 'MapPin',
      color: 'text-secondary',
      bgColor: 'from-secondary/10 to-secondary/5',
      show: canView('sites')
    },
    {
      title: 'Users',
      value: stats.users,
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'from-accent/10 to-accent/5',
      show: canView('users')
    }
  ].filter(stat => stat.show);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-secondary to-info rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
<h1 className="text-3xl font-display font-bold">{getDashboardTitle()}</h1>
            <p className="text-white/90 text-lg">{getWelcomeMessage()}</p>
            {user && (
              <div className="pt-2">
                <RoleBadge role={user.role} className="bg-white/20 text-white border border-white/30" />
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name="LayoutDashboard" className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {statsCards.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {statsCards.map((stat, index) => (
            <Card key={index} variant="elevated" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-display font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className={`h-7 w-7 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-4">
<h2 className="text-2xl font-display font-bold text-gray-900">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredActions.map((action, index) => (
            <Card key={index} variant="interactive" className="p-6 group">
              <div className="space-y-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <ApperIcon name={action.icon} className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
<h3 className="text-lg font-display font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{action.description}</p>
                </div>
                <Button 
                  onClick={() => navigate(`/${action.href}`)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
Go to
                  <ApperIcon name="ArrowRight" className="h-4 w-4 ms-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* System Info */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
<h3 className="text-lg font-display font-semibold text-gray-900">System Information</h3>
            <p className="text-gray-600">Tamkin system for compliance and safety in the hospitality sector</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" className="h-4 w-4" />
<span>{new Date().toLocaleDateString('en-US')}</span>
            </div>
            <div className="flex items-center gap-1">
<ApperIcon name="Clock" className="h-4 w-4" />
              <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;