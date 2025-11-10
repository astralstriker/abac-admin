import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-secondary text-secondary-foreground border-secondary',
      success: 'abac-badge-success',
      error: 'abac-badge-error',
      warning: 'abac-badge-warning',
      info: 'abac-badge-info',
    };

    return (
      <div
        ref={ref}
        className={cn('abac-badge', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
