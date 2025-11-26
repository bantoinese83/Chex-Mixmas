import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseStyles = 'bg-slate-200';
  
  const variantStyles = {
    text: 'rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-sm',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export const RecipeCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-sm p-6 animate-fade-in-up">
      <Skeleton variant="rectangular" height={32} className="mb-4 w-3/4" />
      <Skeleton variant="text" height={20} className="mb-2 w-full" />
      <Skeleton variant="text" height={20} className="mb-4 w-5/6" />
      <div className="flex gap-2 mb-4">
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </div>
      <Skeleton variant="rectangular" height={200} className="w-full" />
    </div>
  );
};

export const RecipeListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
};

