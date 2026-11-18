import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Gem,
  Truck,
  ShieldCheck,
  RotateCcw,
  Crown,
  Star,
  Instagram,
  Heart,
} from 'lucide-react';
import { HERO_SLIDES, INSTAGRAM_GALLERY } from '../data/jewelleryData';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { products, categories, promoBanners, testimonials } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('featured');
  const categoryScrollRef = useRef(null);
  const heroHeadingRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (heroHeadingRef.current) {
      gsap.fromTo(
        heroHeadingRef.current,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
      );
    }
  }, [activeSlide]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const scrollCategories = (direction) => {
    if (!categoryScrollRef.current) return;
    const scrollAmount = direction === 'left' ? -440 : 440;
    categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivalProducts = products.filter((p) => p.isNewArrival).slice(0, 8);
  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 8);

  const displayedTabProducts =
    activeTab === 'featured'
      ? featuredProducts
      : activeTab === 'new'
      ? newArrivalProducts
      : bestSellerProducts;

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <div className="overflow-hidden">
      {/* 1. FULL-WIDTH CINEMATIC HERO SLIDER (16:9) */}
      <section className="relative w-full h-[540px] sm:h-[620px] lg:h-[700px] bg-[#090A0F] overflow-hidden select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="h-full w-full object-cover object-center"
            />
            <div
              className={`absolute inset-0 ${
                currentSlide.align === 'right'
                  ? 'bg-gradient-to-r from-black/35 via-black/55 to-black/88'
                  : 'bg-gradient-to-l from-black/25 via-black/60 to-black/90'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090F] via-transparent to-black/25" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto h-full max-w-[1400px] px-6 sm:px-12 lg:px-16 flex items-center">
          <div
            ref={heroHeadingRef}
            className={`w-full max-w-xl lg:max-w-2xl ${
              currentSlide.align === 'right'
                ? 'ml-auto text-center lg:text-center'
                : 'mr-auto text-left'
            }`}
          >
            <div
              className={`inline-flex items-center gap-3 mb-3 ${
                currentSlide.align === 'right' ? 'justify-center' : 'justify-start'
              }`}
            >
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#F3E5AB] font-medium">
                {currentSlide.subtitle}
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#F6E299] via-[#D4AF37] to-[#FBF0B9] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] leading-[1.08]">
              {currentSlide.title}
            </h1>

            <p className="mt-2 font-serif-luxury italic text-2xl sm:text-3xl lg:text-4xl text-[#F8F5EE]/95 font-normal">
              {currentSlide.tagline}
            </p>

            <p className="mt-4 text-sm sm:text-base text-[#D8D0C2] max-w-lg mx-auto lg:mx-auto leading-relaxed">
              {currentSlide.description}
            </p>

            <div
              className={`mt-7 flex flex-wrap items-center gap-4 ${
                currentSlide.align === 'right' ? 'justify-center' : 'justify-start'
              }`}
            >
              <Link
                to={currentSlide.ctaLink}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-8 py-3.5 text-sm sm:text-base font-semibold text-[#090A0F] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_12px_36px_rgba(212,175,55,0.65)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to={currentSlide.secondaryLink}
                className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-black/40 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-[#F3E5AB] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all"
              >
                <span>{currentSlide.secondaryCta}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Left / Right Circular Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Hero Slide"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45 text-[#F3E5AB] backdrop-blur-md hover:bg-[#D4AF37] hover:text-[#090A0F] transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Hero Slide"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/45 text-[#F3E5AB] backdrop-blur-md hover:bg-[#D4AF37] hover:text-[#090A0F] transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeSlide
                  ? 'w-8 bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. PREMIUM SERVICE HIGHLIGHTS BAR */}
      <section className="relative z-20 -mt-8 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl lg:rounded-full bg-[#FFFDF9]/95 dark:bg-[#191C2B]/95 backdrop-blur-xl border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] px-6 py-5"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x divide-[#C59B3E]/25 dark:divide-[#D4AF37]/20">
            <div className="flex items-center justify-center gap-3.5 px-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                  Premium Quality
                </p>
                <p className="text-[11px] text-[#8C7E70] dark:text-[#857D6F]">100% Authentic Micro-Gold</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 px-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                  Fast & Free Delivery
                </p>
                <p className="text-[11px] text-[#8C7E70] dark:text-[#857D6F]">Insured Shipping Above ₹999</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 px-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                  Secure Shopping
                </p>
                <p className="text-[11px] text-[#8C7E70] dark:text-[#857D6F]">1-Year Polish Guarantee</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3.5 px-3">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                    Easy 7-Day Returns
                  </p>
                  <p className="text-[11px] text-[#8C7E70] dark:text-[#857D6F]">24/7 Bridal Concierge</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. HORIZONTAL SCROLLING CATEGORY CARDS ("Top Categories") */}
      <section className="py-16 sm:py-20 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <Crown className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]/20" />
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#B58927] via-[#D4AF37] to-[#B58927] dark:from-[#F6E299] dark:via-[#D4AF37] dark:to-[#FBF0B9] bg-clip-text text-transparent">
            Top Categories
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#5C5248] dark:text-[#C4BCAC]">
            Find your perfect piece across all {categories.length} signature jewellery collections
          </p>
        </div>

        <div className="relative group/cat">
          <button
            type="button"
            onClick={() => scrollCategories('left')}
            aria-label="Scroll Categories Left"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#FFFDF9] dark:bg-[#191C2B] text-[#B58927] dark:text-[#D4AF37] shadow-xl hover:bg-[#D4AF37] hover:text-[#090A0F] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth pb-4 pt-1 px-1"
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.06, 0.35) }}
                className="shrink-0 w-[210px] sm:w-[235px]"
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group/card block rounded-2xl overflow-hidden border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#21120A] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(212,175,55,0.22)]"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160B06] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#1D1009] via-[#27150C] to-[#1D1009] border-t border-[#D4AF37]/25">
                    <div>
                      <h3 className="font-serif-luxury text-lg font-semibold text-[#F8F5EE] group-hover/card:text-[#D4AF37] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-[#C4BCAC]/80">{cat.itemCount} Designs</p>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/50 text-[#D4AF37] group-hover/card:bg-[#D4AF37] group-hover/card:text-[#090A0F] transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCategories('right')}
            aria-label="Scroll Categories Right"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#FFFDF9] dark:bg-[#191C2B] text-[#B58927] dark:text-[#D4AF37] shadow-xl hover:bg-[#D4AF37] hover:text-[#090A0F] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 4. CURATED COLLECTIONS: FEATURED / NEW ARRIVALS / BEST SELLERS */}
      <section className="py-12 sm:py-16 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#B58927] dark:text-[#D4AF37] font-semibold">
              ROYAL SHOWCASE
            </span>
            <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Handcrafted Masterpieces
            </h2>
          </div>

          <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl bg-[#F3ECE1] dark:bg-[#10121C] p-1.5 border border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
            {[
              { key: 'featured', label: 'Featured Jewellery' },
              { key: 'new', label: 'New Arrivals' },
              { key: 'bestsellers', label: 'Best Sellers' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] shadow-md'
                    : 'text-[#5C5248] dark:text-[#C4BCAC] hover:text-[#D4AF37]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTabProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#B58927] dark:text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#E8C76A] hover:via-[#D4AF37] hover:to-[#B58927] hover:text-[#090A0F] transition-all duration-300"
          >
            <span>View Complete {products.length}-Piece Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. WIDE PROMOTIONAL BANNER – NEW ARRIVALS & SEASONAL PRIVILEGE */}
      <section className="py-12 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 min-h-[290px] sm:min-h-[320px] flex items-center p-7 sm:p-10 group"
          >
            <img
              src={promoBanners.newArrivals.image}
              alt={promoBanners.newArrivals.title}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#120A06]/95 via-[#120A06]/75 to-transparent" />

            <div className="relative z-10 max-w-sm space-y-3">
              <span className="inline-block rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F3E5AB]">
                {promoBanners.newArrivals.badge}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#F8F5EE]">
                {promoBanners.newArrivals.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D0C2] leading-relaxed">
                {promoBanners.newArrivals.description}
              </p>
              <div className="pt-2">
                <Link
                  to="/shop?sort=newest"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#090A0F] shadow hover:scale-105 transition-transform"
                >
                  <span>{promoBanners.newArrivals.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 min-h-[290px] sm:min-h-[320px] flex items-center p-7 sm:p-10 group"
          >
            <img
              src={promoBanners.seasonalSale.image}
              alt={promoBanners.seasonalSale.title}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#14080B]/95 via-[#14080B]/75 to-transparent" />

            <div className="relative z-10 max-w-sm space-y-3">
              <span className="inline-block rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#F3E5AB]">
                {promoBanners.seasonalSale.badge}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#F6E299] via-[#D4AF37] to-[#FBF0B9] bg-clip-text text-transparent">
                {promoBanners.seasonalSale.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D0C2] leading-relaxed">
                {promoBanners.seasonalSale.subtitle} — {promoBanners.seasonalSale.description}
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#090A0F] shadow hover:scale-105 transition-transform"
                >
                  <span>{promoBanners.seasonalSale.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. DEDICATED BEST SELLERS SHOWCASE */}
      <section className="py-14 bg-[#F3ECE1]/60 dark:bg-[#10121C]/60 border-y border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#B58927] dark:text-[#D4AF37] font-semibold">
                MOST COVETED
              </span>
              <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                Bridal & Temple Best Sellers
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#B58927] dark:text-[#D4AF37] hover:underline"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellerProducts.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. WEDDING & FESTIVE COLLECTION DUAL EDITORIAL BANNERS */}
      <section className="py-16 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 min-h-[340px] flex items-center p-8 sm:p-12 group">
            <img
              src={promoBanners.wedding.image}
              alt={promoBanners.wedding.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#140709]/95 via-[#140709]/75 to-transparent" />
            <div className="relative z-10 max-w-md space-y-3.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#F3E5AB]">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                {promoBanners.wedding.badge}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5EE] leading-tight">
                {promoBanners.wedding.title}
              </h3>
              <p className="text-sm text-[#D8D0C2] leading-relaxed">
                {promoBanners.wedding.description}
              </p>
              <div className="pt-2">
                <Link
                  to={promoBanners.wedding.ctaLink}
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-7 py-3 text-sm font-semibold text-[#090A0F] shadow-lg hover:scale-105 transition-transform"
                >
                  <span>{promoBanners.wedding.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 min-h-[340px] flex items-center p-8 sm:p-10 group">
            <img
              src={promoBanners.festive.image}
              alt={promoBanners.festive.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#160D06]/95 via-[#160D06]/80 to-black/30" />
            <div className="relative z-10 space-y-3">
              <span className="inline-block rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#F3E5AB]">
                {promoBanners.festive.badge}
              </span>
              <h3 className="font-serif-luxury text-3xl font-bold bg-gradient-to-r from-[#F6E299] via-[#D4AF37] to-[#FBF0B9] bg-clip-text text-transparent">
                {promoBanners.festive.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D8D0C2] leading-relaxed">
                {promoBanners.festive.description}
              </p>
              <div className="pt-2">
                <Link
                  to={promoBanners.festive.ctaLink}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-black/50 px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#F3E5AB] hover:bg-gradient-to-r hover:from-[#E8C76A] hover:via-[#D4AF37] hover:to-[#B58927] hover:text-[#090A0F] transition-all"
                >
                  <span>{promoBanners.festive.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section className="py-16 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B58927] dark:text-[#D4AF37] font-semibold">
            PATRON STORIES
          </span>
          <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
            Loved by Brides & Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50 p-6 sm:p-8 shadow-[0_14px_35px_-12px_rgba(26,22,21,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base italic text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
                  “{item.comment}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C59B3E]/20 dark:border-[#D4AF37]/15 flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] font-serif-luxury text-base font-bold text-[#090A0F]">
                  {item.avatarInitials}
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#1A1615] dark:text-[#F8F5EE] leading-none">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#8C7E70] dark:text-[#857D6F] mt-1">
                    {item.role} • {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. INSTAGRAM-STYLE EDITORIAL GALLERY */}
      <section className="py-16 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.28em] text-[#B58927] dark:text-[#D4AF37] font-semibold">
              <Instagram className="w-3.5 h-3.5" />
              @LUCKYCOVERINGOFFICIAL
            </span>
            <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              The Royal Lookbook Gallery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC]">
            Tag <span className="text-[#B58927] dark:text-[#D4AF37] font-semibold">#ShineInLuckyCovering</span> to be featured in our bridal journal
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_GALLERY.map((post) => (
            <Link
              key={post.id}
              to={post.link}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-[#1A0E08]"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] mb-1">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  {post.likes}
                </span>
                <p className="text-[11px] text-white line-clamp-2">{post.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
