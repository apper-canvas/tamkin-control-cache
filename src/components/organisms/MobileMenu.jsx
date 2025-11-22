import React from 'react';
import { cn } from '@/utils/cn';
import { SidebarContent } from './Sidebar';
import ApperIcon from '@/components/ApperIcon';

const MobileMenu = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 start-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="relative h-full">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 end-4 z-10 p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </button>
          
          <SidebarContent isMobile onClose={onClose} />
        </div>
      </div>
    </>
  );
};

export default MobileMenu;