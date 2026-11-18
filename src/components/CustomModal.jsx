import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  X,
  Sparkles,
} from 'lucide-react';

const CustomModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info', // 'info' | 'error' | 'warning' | 'success' | 'confirm'
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  children,
}) => {
  if (!isOpen) return null;

  const iconMap = {
    error: <ShieldAlert className="w-7 h-7 text-red-400" />,
    warning: <AlertTriangle className="w-7 h-7 text-amber-400" />,
    success: <CheckCircle2 className="w-7 h-7 text-emerald-400" />,
    confirm: <AlertTriangle className="w-7 h-7 text-[#D4AF37]" />,
    info: <Sparkles className="w-7 h-7 text-[#D4AF37]" />,
  };

  const badgeBgMap = {
    error: 'bg-red-500/15 border-red-500/40',
    warning: 'bg-amber-500/15 border-amber-500/40',
    success: 'bg-emerald-500/15 border-emerald-500/40',
    confirm: 'bg-[#D4AF37]/15 border-[#D4AF37]/45',
    info: 'bg-[#D4AF37]/15 border-[#D4AF37]/45',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-[#FFFDF9] dark:bg-[#131521] border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/50 [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#C59B3E]/25 dark:border-[#D4AF37]/25 text-[#8C7E70] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Icon + Title */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border ${
                  badgeBgMap[type] || badgeBgMap.info
                }`}
              >
                {iconMap[type] || iconMap.info}
              </div>

              {title && (
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                  {title}
                </h3>
              )}

              {message && (
                <p className="mt-2 text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
                  {message}
                </p>
              )}
            </div>

            {/* Optional Custom Children Body (e.g. Edit Forms) */}
            {children && <div className="mt-5 text-left">{children}</div>}

            {/* Action Buttons */}
            {!children && (
              <div className="mt-7 flex items-center justify-center gap-3">
                {onConfirm ? (
                  <>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-xl border border-[#C59B3E]/35 dark:border-[#D4AF37]/30 py-3 text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {cancelText}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onConfirm();
                        onClose();
                      }}
                      className={`flex-1 rounded-xl py-3 text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer ${
                        type === 'error'
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F]'
                      }`}
                    >
                      {confirmText}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] py-3 text-xs sm:text-sm font-bold text-[#090A0F] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    {confirmText || 'Understood'}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
