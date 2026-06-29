import React from 'react';
import { cn } from '../../lib/utils';

interface IconContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
  iconColor: string;
  className?: string;
}

const IconContainer: React.FC<IconContainerProps> = ({
  children,
  backgroundColor,
  iconColor,
  className,
}) => {
  // If it starts with #, use inline styles; otherwise fall back to tailwind class
  const isBgHex = backgroundColor.startsWith('#');
  const isColorHex = iconColor.startsWith('#');

  return (
    <div
      className={cn(
        'w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0',
        !isBgHex && backgroundColor,
        className
      )}
      style={isBgHex ? { backgroundColor } : undefined}
    >
      <span 
        className={cn('flex items-center justify-center', !isColorHex && iconColor)}
        style={isColorHex ? { color: iconColor } : undefined}
      >
        {children}
      </span>
    </div>
  );
};

export default IconContainer;
