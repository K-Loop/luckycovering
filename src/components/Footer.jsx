import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Facebook, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { BRAND_LOGOS, CATEGORIES } from '../data/jewelleryData';
import { useStore } from '../context/StoreContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Welcome to the Lucky Covering Royal Circle ✨');
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#F3ECE1] dark:bg-[#10121C] border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20 text-[#5C5248] dark:text-[#C4BCAC] overflow-hidden transition-colors duration-300">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="h-16 w-16 rounded-2xl overflow-hidden bg-[#0B0E17] border border-[#D4AF37]/40 p-1.5 shadow-lg">
                <img
                  src={BRAND_LOGOS.transparent}
                  alt="Lucky Covering Logo"
                  className="h-full w-full object-contain scale-125"
                />
              </div>
              <div>
                <span className="block font-serif-luxury text-3xl font-bold bg-gradient-to-r from-[#F6E299] via-[#D4AF37] to-[#B38728] bg-clip-text text-transparent leading-none">
                  Lucky
                </span>
                <span className="block text-xs uppercase tracking-[0.3em] text-[#5C5248] dark:text-[#C4BCAC] mt-1">
                  Covering
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#5C5248] dark:text-[#C4BCAC] max-w-sm">
              Celebrating South India’s sacred heritage through handcrafted 24K micro-gold covering temple necklaces, bridal harams, Kemp jhumkas, and daily luxury chains.
            </p>

            <div className="space-y-2 text-xs text-[#8C7E70] dark:text-[#857D6F]">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#B58927] dark:text-[#D4AF37] shrink-0" />
                <span>No. 42, Usman Road, T. Nagar, Chennai – 600017, Tamil Nadu</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B58927] dark:text-[#D4AF37] shrink-0" />
                <span>+91 98400 77889 • Mon–Sat (10 AM – 8 PM IST)</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B58927] dark:text-[#D4AF37] shrink-0" />
                <span>concierge@luckycovering.com</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-luxury text-lg font-semibold text-[#1A1615] dark:text-[#F8F5EE] tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                  Shop All Jewellery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                  Our Heritage Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                  Member Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Royal Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-lg font-semibold text-[#1A1615] dark:text-[#F8F5EE] tracking-wide">
              Royal Categories
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors block truncate"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Care & Stay Connected (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="font-serif-luxury text-lg font-semibold text-[#1A1615] dark:text-[#F8F5EE] tracking-wide mb-3">
                Customer Care
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/track-order" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                    My Saved Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                    Shopping Bag
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors">
                    1-Year Polish Guarantee
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif-luxury text-lg font-semibold text-[#1A1615] dark:text-[#F8F5EE] tracking-wide mb-2">
                Stay Connected
              </h4>
              <div className="flex items-center gap-2.5 mb-3">
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Following @LuckyCoveringOfficial on Instagram');
                  }}
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-white dark:bg-[#131521] text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Following Lucky Covering on Facebook');
                  }}
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-white dark:bg-[#131521] text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Subscribed to Lucky Covering Bridal Channel');
                  }}
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-white dark:bg-[#131521] text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 rounded-lg bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 focus:border-[#D4AF37] px-3.5 py-2 text-xs text-[#1A1615] dark:text-[#F8F5EE] placeholder:text-[#8C7E70] dark:placeholder:text-[#857D6F] focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] shadow hover:opacity-95 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#C59B3E]/20 dark:border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7E70] dark:text-[#857D6F]">
          <p>© 2026 Lucky Covering. All rights reserved. Heritage Gold Covering Craftsmanship.</p>
          <p className="inline-flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline" />
            <span>for timeless Indian traditions</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
