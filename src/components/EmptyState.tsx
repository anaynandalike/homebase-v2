import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center mb-4 text-warmgray-light">
        {icon}
      </div>
      <h3 className="font-heading text-base font-semibold text-charcoal mb-1">
        {title}
      </h3>
      <p className="text-warmgray text-sm max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}
