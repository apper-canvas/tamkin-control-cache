import React from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';
import LanguageSelector from '@/components/molecules/LanguageSelector';
import RoleBadge from '@/components/molecules/RoleBadge';

const Header = ({ onMenuToggle }) => {
  const { user } = useSelector(state => state.auth);
  const { direction } = useSelector(state => state.language);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="Menu" className="h-6 w-6" />
            </button>
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Shield" className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-display font-bold text-gray-900">Tamkin Control</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-end">
                  <p className="text-sm font-medium text-gray-900">
                    {user.firstNameAr || user.firstNameFr || user.firstNameEn} {user.lastNameAr || user.lastNameFr || user.lastNameEn}
                  </p>
                  <div className="flex justify-end">
                    <RoleBadge role={user.role} />
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="h-4 w-4 text-primary" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;