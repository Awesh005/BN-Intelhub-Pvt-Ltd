import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function PrimaryButton({ children, className, icon, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-slate-950 rounded-lg font-semibold text-base overflow-hidden transition-all shadow-md shadow-orange-950/10 hover:shadow-lg hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:text-white disabled:shadow-none",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2 relative z-10">
        {children}
        {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
      </span>
    </motion.button>
  );
}

export function SecondaryButton({ children, className, icon, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 bg-white text-slate-800 border border-slate-200 rounded-lg font-semibold text-base hover:bg-orange-50 hover:border-orange-200 transition-all shadow-sm disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {children}
        {icon}
      </span>
    </motion.button>
  );
}
