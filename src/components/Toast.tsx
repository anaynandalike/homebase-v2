import { useToastStore } from "@/store/toastStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-lg border border-sand/60 min-w-[260px]"
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-4 h-4 text-red shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-warmgray shrink-0" />
            )}
            <span className="text-sm text-charcoal flex-1">
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-warmgray-light hover:text-charcoal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
