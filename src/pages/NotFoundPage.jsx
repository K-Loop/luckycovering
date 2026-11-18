import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND_LOGOS } from '../data/jewelleryData';

const NotFoundPage = () => {
  const [countdown, setCountdown] = useState(8);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-xl w-full rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 p-8 sm:p-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.45)] space-y-5"
      >
        <div className="mx-auto h-16 w-16 rounded-2xl overflow-hidden bg-[#0B0E17] border border-[#D4AF37]/45 p-1.5 shadow-lg">
          <img
            src={BRAND_LOGOS.transparent}
            alt="Lucky Covering"
            className="h-full w-full object-contain scale-125"
          />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#B58927] dark:text-[#D4AF37]">
          <Compass className="w-3.5 h-3.5" />
          <span>404 • Page Not Found</span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
          This Royal Path Does Not Exist
        </h1>

        <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
          The address <code className="px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#B58927] dark:text-[#F3E5AB]">{location.pathname}</code> could not be found in our showroom. Redirecting you automatically to the Lucky Covering Homepage in{' '}
          <span className="font-bold text-[#B58927] dark:text-[#D4AF37]">{countdown}s</span>.
        </p>

        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-7 py-3 text-xs sm:text-sm font-bold text-[#090A0F] shadow-lg hover:scale-105 transition-transform"
          >
            <Home className="w-4 h-4" />
            <span>Return Home Now</span>
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-[#C59B3E]/40 dark:border-[#D4AF37]/40 px-6 py-3 text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Catalogue</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
