import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { Sparkles, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomModal from '../components/CustomModal';
import { useStore } from '../context/StoreContext';

const MainLayout = () => {
  const location = useLocation();
  const { toast, modalConfig, closeModal, openModal } = useStore();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF6F0] dark:bg-[#08090F] text-[#1A1615] dark:text-[#F8F5EE] overflow-x-hidden transition-colors duration-300 selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Custom Modal for Errors, Confirmations & Fallbacks */}
      <CustomModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        onConfirm={modalConfig.onConfirm}
      />

      {/* Luxury Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full bg-[#12131F]/95 border border-[#D4AF37] px-5 py-3 text-xs sm:text-sm font-medium text-[#F8F5EE] shadow-[0_12px_40px_rgba(212,175,55,0.35)] backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Concierge Button */}
      <button
        type="button"
        onClick={() =>
          openModal({
            type: 'info',
            title: 'Lucky Covering Bridal Concierge',
            message:
              'Our T. Nagar Chennai bridal stylists are available Monday–Sunday (10 AM – 8:30 PM IST) at +91 98400 77889 or via the Contact Concierge desk.',
            confirmText: 'Close',
          })
        }
        aria-label="Bridal Concierge Chat"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] shadow-[0_8px_25px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
      </button>
    </div>
  );
};

export default MainLayout;
