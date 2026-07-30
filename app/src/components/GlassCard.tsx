import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className, hover = true, onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        'glass-card rounded-2xl p-6 transition-all duration-300',
        hover && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
