import React from 'react';
import { cn } from '@/utils/cn';

const Input = React.forwardRef(({ 
  type = "text", 
  className, 
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
        "transition-all duration-200 text-base",
        error && "border-error focus:ring-error",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;