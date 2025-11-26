import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-[#D31212] hover:bg-red-800 text-white shadow-lg shadow-red-200 focus:ring-[#D31212] border border-transparent uppercase tracking-wide font-bold',
    secondary:
      'bg-slate-700 hover:bg-slate-800 text-white shadow-lg shadow-slate-200 focus:ring-slate-600 border border-transparent uppercase tracking-wide font-bold',
    outline:
      'bg-transparent border-2 border-[#D31212] text-[#D31212] hover:bg-red-50 focus:ring-[#D31212] uppercase tracking-wide font-bold',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
