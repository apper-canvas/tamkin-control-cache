import React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(({ 
  children, 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200";
  
  const variants = {
    default: "hover:shadow-md",
    elevated: "shadow-md hover:shadow-lg",
    interactive: "hover:shadow-lg hover:border-gray-300 cursor-pointer transform hover:scale-[1.02]"
  };

  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;