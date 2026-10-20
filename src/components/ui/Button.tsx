import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[36px] gap-2 font-semibold',
    md: 'text-sm px-4.5 py-2.5 min-h-[42px] gap-2 font-semibold',
    lg: 'text-base px-6 py-3.5 min-h-[48px] gap-2.5 font-bold'
  };

  const variantStyles = {
    primary: 'bg-[#FF5A60] hover:bg-[#E0484E] text-white shadow-xs focus-visible:outline-[#FF5A60]',
    secondary: 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs focus-visible:outline-neutral-900',
    outline: 'border border-neutral-300 hover:bg-neutral-100 text-neutral-800 bg-white focus-visible:outline-neutral-400',
    ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-neutral-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-xs focus-visible:outline-red-600'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
