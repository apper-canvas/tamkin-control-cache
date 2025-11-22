import React from 'react';
import { cn } from '@/utils/cn';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  placeholder = "البحث...", 
  value, 
  onChange, 
  className,
  ...props 
}) => {
  return (
    <div className={cn("relative max-w-md", className)}>
      <ApperIcon 
        name="Search" 
        className="absolute start-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="ps-10"
        {...props}
      />
    </div>
  );
};

export default SearchBar;