import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'light' | 'dark' | 'gradient' | 'white';
}

export function SectionWrapper({ 
  children, 
  className, 
  id, 
  background = 'default',
  ...props 
}: SectionWrapperProps) {
  const backgrounds = {
    default: "bg-white",
    white: "bg-white",
    light: "bg-orange-50/35 border-y border-orange-100",
    dark: "bg-slate-900 text-white",
    gradient: "bg-gradient-to-b from-orange-50/60 to-white"
  };

  return (
    <section 
      id={id}
      className={cn(
        "py-14 sm:py-16 md:py-24 relative overflow-hidden",
        backgrounds[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div 
      className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
