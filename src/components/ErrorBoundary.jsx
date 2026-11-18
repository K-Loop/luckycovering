import React from 'react';
import { ShieldAlert, RotateCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lucky Covering UI Fallback caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#08090F] text-[#F8F5EE] p-6">
          <div className="max-w-md w-full rounded-3xl bg-[#131521] border border-[#D4AF37]/45 p-8 text-center shadow-[0_25px_70px_rgba(0,0,0,0.85)] space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/40 text-red-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h1 className="font-serif-luxury text-3xl font-bold text-[#F8F5EE]">
              Something Unexpected Occurred
            </h1>

            <p className="text-xs sm:text-sm text-[#C4BCAC] leading-relaxed">
              Our royal showcase encountered a temporary display interruption. Your cart, wishlist, and catalogue settings remain safely preserved.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] py-3 text-xs sm:text-sm font-bold text-[#090A0F] shadow cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload View</span>
              </button>

              <a
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/40 py-3 text-xs sm:text-sm font-semibold text-[#F8F5EE] hover:border-[#D4AF37]"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
