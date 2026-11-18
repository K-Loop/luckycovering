import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { BRAND_LOGOS, PRODUCTS } from '../data/jewelleryData';
import { useStore } from '../context/StoreContext';

const LoginPage = () => {
  const { openModal } = useStore();

  const handleGoogleSignIn = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      openModal({
        type: 'warning',
        title: 'Google OAuth Credentials Pending',
        message:
          'Per project specifications, fake authentication success is disabled until live Google OAuth credentials (VITE_GOOGLE_CLIENT_ID) are configured. For instant store administration with autofilled credentials, visit the /admin portal.',
        confirmText: 'Understood',
      });
      return;
    }
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
      clientId
    )}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=email%20profile`;
  };

  return (
    <div className="relative min-h-[82vh] w-full flex items-center justify-center px-4 py-16 overflow-hidden bg-[#0D0806]">
      <div className="absolute inset-0">
        <img
          src={PRODUCTS[0].image}
          alt="Luxury Temple Jewellery Background"
          className="h-full w-full object-cover object-left scale-105 opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110906]/55 via-[#090B12]/85 to-[#08090F]/95" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-[#0D101B]/95 border border-[#D4AF37]/35 p-8 sm:p-11 text-center shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
      >
        <div className="mx-auto mb-6 h-24 w-24 rounded-2xl overflow-hidden bg-[#080A12] border border-[#D4AF37]/40 p-2 shadow-lg">
          <img
            src={BRAND_LOGOS.transparent}
            alt="Lucky Covering Logo"
            className="h-full w-full object-contain scale-125"
          />
        </div>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F8F5EE]">
          Welcome Back!
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#C4BCAC]">
          Sign in to continue your royal jewellery journey with us.
        </p>

        {/* ONLY Google Sign-In Button Displayed per Patron Login Spec */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#1A1615] font-semibold text-sm py-3.5 px-6 shadow-lg hover:shadow-xl transition-all active:scale-[0.99] cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.4 7.4 24 12 24z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-widest text-[#857D6F]">
          <span className="h-[1px] flex-1 bg-[#D4AF37]/20" />
          <span>OR</span>
          <span className="h-[1px] flex-1 bg-[#D4AF37]/20" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing as Guest</span>
          </Link>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3.5 py-1.5 text-xs font-semibold text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#090A0F] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Console (/admin)</span>
          </Link>
        </div>

        <p className="mt-7 text-[11px] text-[#857D6F] leading-relaxed">
          By continuing, you agree to our{' '}
          <Link to="/about" className="text-[#D4AF37] hover:underline">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link to="/about" className="text-[#D4AF37] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
