import React from 'react';
import { cn } from '@/lib/utils';

// Themed Button
export const ThemedButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost';
  }
>(({ className, variant = 'primary', ...props }, ref) => {
  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-200',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200',
    ghost: 'hover:bg-gray-50 text-gray-700'
  };

  return (
    <button
      ref={ref}
      className={cn(
        'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
ThemedButton.displayName = 'ThemedButton';

// Themed Card
export const ThemedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    focused?: boolean;
  }
>(({ className, focused, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-2xl p-6 transition-all cursor-pointer',
        focused
          ? 'ring-2 ring-amber-400 shadow-xl shadow-amber-100'
          : 'hover:shadow-lg hover:shadow-gray-100 border border-gray-100',
        className
      )}
      {...props}
    />
  );
});
ThemedCard.displayName = 'ThemedCard';

// Themed Input
export const ThemedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm',
        'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent',
        'transition-all duration-200',
        'placeholder:text-gray-400',
        className
      )}
      {...props}
    />
  );
});
ThemedInput.displayName = 'ThemedInput';

// Themed Header with gradient brand text
export const BrandText: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn(
        'font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Themed Container
export const ThemedContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('min-h-screen bg-white', className)} {...props}>
      {children}
    </div>
  );
};

// Themed Header
export const ThemedHeader: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-amber-100',
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
};
