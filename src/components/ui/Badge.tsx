import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'glass' | 'secondary';
  className?: string;
  icon?: ReactNode;
}

export function Badge({ children, variant = 'default', className, icon, ...props }: BadgeProps) {
  const variants = {
    default: "bg-orange-100 text-orange-800",
    outline: "border border-orange-200 bg-orange-50 text-orange-800",
    glass: "bg-white/80 border border-slate-200 text-slate-700 backdrop-blur-md",
    secondary: "bg-amber-100 text-amber-900"
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
