import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingBag,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Crown,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BRAND_LOGOS } from '../data/jewelleryData';

const Navbar = () => {
  const { theme, toggleTheme, cartCount, wishlist, categories, products } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCatDropdownOpen(false);
    setCollectionsDropdownOpen(false);
    setSearchFocused(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  return (
    <>
      {/* Top Heritage Announcement Strip */}
      <div className="w-full bg-gradient-to-r from-[#120D09] via-[#21150C] to-[#120D09] text-[#F3E5AB] border-b border-[#D4AF37]/20 text-[10px] sm:text-xs py-1.5 px-3 text-center tracking-widest uppercase font-medium overflow-hidden">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 mx-auto">
            <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span className="truncate">
              Complimentary Insured Express Shipping Above ₹999 • 24K Micro-Gold Heritage Craftsmanship
            </span>
          </span>
          <Link
            to="/admin"
            className="hidden md:inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#090A0F] transition-colors shrink-0"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>

      {/* Main Sticky Header — Strictly bounded within 100vw with whitespace-nowrap links */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#FAF6F0]/90 dark:bg-[#0B0D15]/90 backdrop-blur-xl border-b border-[#C59B3E]/25 dark:border-[#D4AF37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.22)] py-2'
            : 'bg-[#FAF6F0]/95 dark:bg-[#08090F]/95 backdrop-blur-md border-b border-[#C59B3E]/20 dark:border-[#D4AF37]/15 py-3'
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-2 lg:gap-4 min-w-0">
            {/* Brand Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2 shrink-0 focus:outline-none"
              aria-label="Lucky Covering Home"
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl overflow-hidden bg-[#0B0E17] border border-[#D4AF37]/35 p-1 shadow-md group-hover:border-[#D4AF37] transition-all duration-300">
                <img
                  src={BRAND_LOGOS.transparent}
                  alt="Lucky Covering Logo"
                  className="h-full w-full object-contain scale-125 transition-transform duration-500 group-hover:scale-135"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide leading-none bg-gradient-to-r from-[#F6E299] via-[#D4AF37] to-[#B38728] bg-clip-text text-transparent">
                  Lucky
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#5C5248] dark:text-[#C4BCAC] font-medium mt-0.5">
                  Covering
                </span>
              </div>
            </Link>

            {/* Desktop Primary Navigation Links — whitespace-nowrap so "Track Order" never wraps */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium whitespace-nowrap shrink-0">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `relative py-1.5 transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-[#B58927] dark:text-[#D4AF37] font-semibold'
                      : 'text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Home</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                      />
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `relative py-1.5 transition-colors duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-[#B58927] dark:text-[#D4AF37] font-semibold'
                      : 'text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37]'
                  }`
                }
              >
                Shop
              </NavLink>

              {/* Categories Mega Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setCatDropdownOpen(true)}
                onMouseLeave={() => setCatDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => navigate('/category/neckpieces')}
                  className="flex items-center gap-1 py-1.5 text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      catDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {catDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[580px] max-w-[92vw] z-50"
                    >
                      <div className="rounded-2xl bg-[#FFFDF9] dark:bg-[#191C2B] border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 shadow-2xl p-4 grid grid-cols-2 gap-2.5 backdrop-blur-2xl max-h-[75vh] overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            className="group flex items-center gap-3 rounded-xl p-2 hover:bg-[#D4AF37]/10 border border-transparent hover:border-[#D4AF37]/30 transition-all"
                          >
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="h-11 w-11 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              <p className="font-serif-luxury text-base font-semibold text-[#1A1615] dark:text-[#F8F5EE] group-hover:text-[#B58927] dark:group-hover:text-[#D4AF37] truncate">
                                {cat.name}
                              </p>
                              <p className="text-[11px] text-[#8C7E70] dark:text-[#857D6F] truncate">
                                {cat.tagline}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collections Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsDropdownOpen(true)}
                onMouseLeave={() => setCollectionsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="flex items-center gap-1 py-1.5 text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      collectionsDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {collectionsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-3 w-64 z-50"
                    >
                      <div className="rounded-2xl bg-[#FFFDF9] dark:bg-[#191C2B] border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 shadow-2xl p-2.5 space-y-1">
                        <Link
                          to="/shop?collection=bridal"
                          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/12 hover:text-[#D4AF37] transition-colors"
                        >
                          <span>2026 Muhurtham Bridal Edit</span>
                          <Crown className="w-4 h-4 text-[#D4AF37]" />
                        </Link>
                        <Link
                          to="/shop?collection=temple"
                          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/12 hover:text-[#D4AF37] transition-colors"
                        >
                          <span>Kanchipuram Temple Gold</span>
                          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        </Link>
                        <Link
                          to="/shop?collection=new"
                          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/12 hover:text-[#D4AF37] transition-colors"
                        >
                          <span>Royal New Arrivals</span>
                          <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                        </Link>
                        <Link
                          to="/shop"
                          className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#B58927] dark:text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-colors"
                        >
                          <span>Explore All Jewellery</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-1.5 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#B58927] dark:text-[#D4AF37] font-semibold'
                      : 'text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37]'
                  }`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/track-order"
                className={({ isActive }) =>
                  `py-1.5 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#B58927] dark:text-[#D4AF37] font-semibold'
                      : 'text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37]'
                  }`
                }
              >
                Track Order
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-1.5 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#B58927] dark:text-[#D4AF37] font-semibold'
                      : 'text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37]'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Right Controls — Flexible width so nothing ever overflows out of bounds */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Interactive Search Input */}
              <div ref={searchContainerRef} className="relative hidden md:block w-36 lg:w-44 xl:w-56">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 text-[#8C7E70] dark:text-[#857D6F] absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onFocus={() => setSearchFocused(true)}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jewelry..."
                      className="w-full rounded-full bg-[#F3ECE1] dark:bg-[#10121C] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 focus:border-[#D4AF37] pl-8 pr-3 py-1.5 text-xs text-[#1A1615] dark:text-[#F8F5EE] placeholder:text-[#8C7E70] dark:placeholder:text-[#857D6F] focus:outline-none transition-all"
                    />
                  </div>
                </form>

                {/* Live Instant Search Dropdown */}
                <AnimatePresence>
                  {searchFocused && searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#FFFDF9] dark:bg-[#191C2B] border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 shadow-2xl overflow-hidden z-50"
                    >
                      {searchResults.length > 0 ? (
                        <div className="p-2 divide-y divide-[#C59B3E]/15 dark:divide-[#D4AF37]/15">
                          {searchResults.map((item) => (
                            <Link
                              key={item.id}
                              to={`/product/${item.id}`}
                              onClick={() => setSearchFocused(false)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#D4AF37]/10 transition-colors"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#D4AF37]/30"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-[#1A1615] dark:text-[#F8F5EE] truncate">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-[#B58927] dark:text-[#D4AF37] font-medium">
                                  ₹{item.price.toLocaleString('en-IN')}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <button
                            type="button"
                            onClick={handleSearchSubmit}
                            className="w-full pt-2 pb-1 text-center text-xs font-semibold text-[#B58927] dark:text-[#D4AF37] hover:underline cursor-pointer"
                          >
                            View all results for "{searchQuery}"
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-[#8C7E70] dark:text-[#857D6F]">
                          No matching jewellery found for "{searchQuery}".
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark / Light Mode Toggle Switch */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                className="relative inline-flex h-7.5 w-13 shrink-0 cursor-pointer items-center rounded-full border border-[#D4AF37]/45 bg-[#161822] dark:bg-[#191C28] p-1 transition-colors duration-300"
              >
                <Sun className="h-3.5 w-3.5 text-amber-400 ml-0.5" />
                <Moon className="h-3.5 w-3.5 text-[#D4AF37] ml-auto mr-0.5" />
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  className={`absolute h-5.5 w-5.5 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] shadow-md ${
                    theme === 'dark' ? 'right-1' : 'left-1'
                  }`}
                />
              </button>

              {/* Wishlist Icon with Counter */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-[#F3ECE1]/70 dark:bg-[#10121C]/70 text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shrink-0"
              >
                <Heart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-1 text-[9px] font-bold text-[#090A0F] shadow">
                  {wishlist.length}
                </span>
              </Link>

              {/* Shopping Cart Icon with Counter */}
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-[#F3ECE1]/70 dark:bg-[#10121C]/70 text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shrink-0"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-1 text-[9px] font-bold text-[#090A0F] shadow">
                  {cartCount}
                </span>
              </Link>

              {/* Google Login Pill Button — Responsive text so it never clips off right screen edge */}
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-[#1A1615] hover:bg-[#FAF6F0] border border-[#D4AF37]/40 px-3 py-1.5 text-xs font-semibold shadow-sm hover:shadow-md transition-all shrink-0 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
                <span className="hidden 2xl:inline">Login with Google</span>
                <span className="2xl:hidden">Login</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] shrink-0"
              >
                {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#C59B3E]/20 dark:border-[#D4AF37]/20 bg-[#FFFDF9] dark:bg-[#191C2B] overflow-hidden"
            >
              <div className="px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="w-4 h-4 text-[#8C7E70] dark:text-[#857D6F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search temple necklaces, jhumkas, bangles..."
                    className="w-full rounded-full bg-[#F3ECE1] dark:bg-[#10121C] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 pl-10 pr-4 py-2.5 text-sm text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                  />
                </form>

                <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                  <Link
                    to="/"
                    className="rounded-xl px-3.5 py-2.5 bg-[#F3ECE1] dark:bg-[#10121C] text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37]"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    className="rounded-xl px-3.5 py-2.5 bg-[#F3ECE1] dark:bg-[#10121C] text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37]"
                  >
                    All Jewellery
                  </Link>
                  <Link
                    to="/about"
                    className="rounded-xl px-3.5 py-2.5 bg-[#F3ECE1] dark:bg-[#10121C] text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37]"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/track-order"
                    className="rounded-xl px-3.5 py-2.5 bg-[#F3ECE1] dark:bg-[#10121C] text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37]"
                  >
                    Track Order
                  </Link>
                  <Link
                    to="/wishlist"
                    className="rounded-xl px-3.5 py-2.5 bg-[#F3ECE1] dark:bg-[#10121C] text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37]"
                  >
                    Wishlist ({wishlist.length})
                  </Link>
                  <Link
                    to="/cart"
                    className="rounded-xl px-3.5 py-2.5 bg-[#F3ECE1] dark:bg-[#10121C] text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37]"
                  >
                    My Cart ({cartCount})
                  </Link>
                  <Link
                    to="/contact"
                    className="col-span-2 rounded-xl px-3.5 py-2.5 bg-[#F3ECE1] dark:bg-[#10121C] text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37] text-center"
                  >
                    Contact Support
                  </Link>
                  <Link
                    to="/admin"
                    className="col-span-2 flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#B58927] dark:text-[#D4AF37] font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Management Dashboard (/admin)</span>
                  </Link>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#B58927] dark:text-[#D4AF37] font-semibold mb-2.5">
                    Browse Categories
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-2.5 rounded-xl p-2 bg-white dark:bg-[#131521] border border-[#C59B3E]/20 dark:border-[#D4AF37]/20"
                      >
                        <img src={cat.image} alt={cat.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
                        <span className="text-xs font-medium text-[#1A1615] dark:text-[#F8F5EE] truncate">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/login"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white text-[#1A1615] border border-[#D4AF37]/40 py-2.5 text-xs font-semibold shadow"
                >
                  <span>Login with Google</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
