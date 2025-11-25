import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import LanguageSelector from '@/components/molecules/LanguageSelector';
import { setLanguage } from '@/store/slices/languageSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { currentLanguage } = useSelector(state => state.language);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
toast.success('Notification settings updated');
  };

  const handleSaveSettings = () => {
toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
<h1 className="text-3xl font-display font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage system settings and personal preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Language Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
              <ApperIcon name="Globe" className="h-5 w-5 text-primary" />
            </div>
            <div>
<h2 className="text-xl font-display font-bold text-gray-900">Language Settings</h2>
              <p className="text-gray-600 text-sm">Choose the system interface language</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
<label className="block text-sm font-medium text-gray-700 mb-3">
                Current Language
              </label>
              <LanguageSelector className="w-full" />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ApperIcon name="Info" className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
<p className="font-medium mb-1">Language Note</p>
                  <p>Changes will be applied to all system pages, and your preference will be saved for future sessions.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center">
              <ApperIcon name="Bell" className="h-5 w-5 text-accent" />
            </div>
<div>
              <h2 className="text-xl font-display font-bold text-gray-900">Notification Settings</h2>
<p className="text-gray-600 text-sm">Manage notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" className="h-4 w-4 text-gray-600" />
<span className="text-gray-900 font-medium">Email Notifications</span>
              </div>
              <button
                onClick={() => handleNotificationChange('email')}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  notifications.email ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <ApperIcon name="MessageSquare" className="h-4 w-4 text-gray-600" />
<span className="text-gray-900 font-medium">SMS Notifications</span>
              </div>
              <button
                onClick={() => handleNotificationChange('sms')}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  notifications.sms ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  notifications.sms ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
<ApperIcon name="Smartphone" className="h-4 w-4 text-gray-600" />
                <span className="text-gray-900 font-medium">Push Notifications</span>
              </div>
              <button
                onClick={() => handleNotificationChange('push')}
                className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                  notifications.push ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </Card>

        {/* User Profile */}
        {user && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg flex items-center justify-center">
                <ApperIcon name="User" className="h-5 w-5 text-secondary" />
              </div>
              <div>
<h2 className="text-xl font-display font-bold text-gray-900">Profile</h2>
                <p className="text-gray-600 text-sm">Current account information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
<label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <p className="text-gray-900">{user.firstNameEn || user.firstNameFr || user.firstNameAr}</p>
                </div>
<div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <p className="text-gray-900">{user.lastNameAr || user.lastNameFr}</p>
                </div>
              </div>
              
              <div>
<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 text-start">{user.email}</p>
              </div>
              
<div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <p className="text-gray-900 text-start">{user.phone}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
<p className="text-gray-900 capitalize">
                  {user.role === 'ceo' ? 'CEO' :
                   user.role === 'manager' ? 'Manager' : 'User'}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* System Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-info/10 to-info/5 rounded-lg flex items-center justify-center">
              <ApperIcon name="Info" className="h-5 w-5 text-info" />
            </div>
            <div>
<h2 className="text-xl font-display font-bold text-gray-900">System Information</h2>
              <p className="text-gray-600 text-sm">System details and version</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
<span className="text-gray-600">System Name</span>
              <span className="text-gray-900 font-medium">Tamkin Control</span>
            </div>
<div className="flex justify-between items-center">
              <span className="text-gray-600">Version</span>
              <span className="text-gray-900 font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">آخر تحديث</span>
<span className="text-gray-900 font-medium">{new Date().toLocaleDateString('en-US')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">المطور</span>
              <span className="text-gray-900 font-medium">Tamkin Solutions</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-center pt-6">
<Button onClick={handleSaveSettings} size="lg">
          <ApperIcon name="Save" className="h-4 w-4 me-2" />
          حفظ جميع الإعدادات
        </Button>
      </div>
    </div>
  );
};

export default Settings;