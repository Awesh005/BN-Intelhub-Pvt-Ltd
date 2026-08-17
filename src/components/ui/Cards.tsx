import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { motion, HTMLMotionProps, useInView, useMotionValue, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  variant?: 'default' | 'glass' | 'gradient';
}

export function Card({ children, className, hoverEffect = false, variant = 'default', ...props }: CardProps) {
  const variants = {
    default: "bg-white border border-slate-200 shadow-sm",
    glass: "bg-white/90 backdrop-blur border border-orange-100 shadow-sm",
    gradient: "bg-white border border-orange-200 shadow-sm"
  };

  return (
    <motion.div
      className={cn(
        "rounded-lg p-6",
        variants[variant],
        hoverEffect && "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface FeatureCardProps extends Omit<CardProps, 'children'> {
  title: string;
  description: string;
  icon: ReactNode;
  action?: ReactNode;
}

export function FeatureCard({ title, description, icon, action, className, ...props }: FeatureCardProps) {
  return (
    <Card 
      className={cn("group relative overflow-hidden", className)} 
      hoverEffect={true}
      {...props}
    >
      <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-500 group-hover:text-slate-950 transition-colors duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">{description}</p>
      
      {action && (
        <div className="mt-auto pt-4 border-t border-slate-100">
          {action}
        </div>
      )}
    </Card>
  );
}

interface StatsCardProps extends Omit<CardProps, 'children'> {
  value: string;
  label: string;
  icon?: ReactNode;
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  
  // Extract number and suffix (e.g., "5,000+" -> 5000 and "+")
  const numericValue = parseInt(value.replace(/,/g, '').replace(/\+/g, ''), 10);
  const suffix = value.includes('+') ? '+' : '';
  const prefix = value.includes('$') ? '$' : '';

  useEffect(() => {
    if (inView) {
      motionValue.set(numericValue);
    }
  }, [inView, motionValue, numericValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix, prefix]);

  return <span ref={ref} className="tabular-nums">{prefix}0{suffix}</span>;
}

export function StatsCard({ value, label, icon, className, ...props }: StatsCardProps) {
  return (
    <motion.div
      className={cn("text-center p-4 sm:p-6 rounded-lg bg-white border border-slate-200 hover:border-orange-100 transition-colors shadow-sm", className)}
      {...props}
    >
      {icon && (
      <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600 shadow-sm">
          {icon}
        </div>
      )}
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 mb-2 tracking-tight">
        <Counter value={value} />
      </h3>
      <p className="text-slate-500 font-medium text-sm sm:text-base md:text-lg">{label}</p>
    </motion.div>
  );
}
