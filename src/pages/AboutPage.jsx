import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, Gem, ShieldCheck, Sparkles, Award, Heart, ArrowRight } from 'lucide-react';
import { BRAND_LOGOS, HERO_SLIDES, PRODUCTS } from '../data/jewelleryData';

const AboutPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-28 bg-[#090A0F] border-b border-[#D4AF37]/25">
        <img
          src={HERO_SLIDES[1].image}
          alt="Lucky Covering Heritage Story"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090F] via-[#08090F]/80 to-black/50" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-5">
          <div className="mx-auto h-20 w-20 rounded-2xl overflow-hidden bg-[#0B0E17] border border-[#D4AF37]/45 p-2 shadow-xl">
            <img
              src={BRAND_LOGOS.transparent}
              alt="Lucky Covering Logo"
              className="h-full w-full object-contain scale-125"
            />
          </div>
          <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#F3E5AB] font-semibold">
            OUR HERITAGE & CRAFTSMANSHIP
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold bg-gradient-to-r from-[#F6E299] via-[#D4AF37] to-[#FBF0B9] bg-clip-text text-transparent">
            The Story of Lucky Covering
          </h1>
          <p className="text-sm sm:text-base text-[#D8D0C2] max-w-2xl mx-auto leading-relaxed">
            Where centuries-old South Indian temple goldsmithing traditions meet modern luxury micro-gold covering artistry.
          </p>
        </div>
      </section>

      {/* Brand Story Split Section */}
      <section className="py-16 sm:py-24 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            <img
              src={PRODUCTS[0].image}
              alt="Kanchipuram Temple Necklace"
              className="rounded-3xl border border-[#D4AF37]/35 shadow-xl aspect-square object-cover"
            />
            <img
              src={PRODUCTS[1].image}
              alt="Mayura Antique Jhumkas"
              className="rounded-3xl border border-[#D4AF37]/35 shadow-xl aspect-square object-cover mt-8"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#B58927] dark:text-[#D4AF37] font-semibold">
              ROYAL ARTISTRY
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE] leading-tight">
              Crafted to Rival Heirloom Solid Gold
            </h2>
            <p className="text-sm sm:text-base text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
              Founded in the heart of Tamil Nadu’s jewellery district, <strong>Lucky Covering</strong> was born from a singular vision: to make the breathtaking grandeur of Kanchipuram temple harams, Chettinad mugappu chains, and Nizam chandbalis accessible without compromising on artisanal authenticity.
            </p>
            <p className="text-sm sm:text-base text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
              Every piece in our collection is sculpted by third-generation karigars using pure copper and high-grade brass cores, layered with thick 24K micro-gold covering, and handset with cabochon Kemp rubies, emeralds, and cultured seed pearls.
            </p>

            <div className="pt-3 grid grid-cols-3 gap-4 border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
              <div>
                <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#B58927] dark:text-[#D4AF37]">
                  50,000+
                </p>
                <p className="text-xs text-[#8C7E70] dark:text-[#857D6F]">Happy Patrons</p>
              </div>
              <div>
                <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#B58927] dark:text-[#D4AF37]">
                  24K
                </p>
                <p className="text-xs text-[#8C7E70] dark:text-[#857D6F]">Micro-Gold Tone</p>
              </div>
              <div>
                <p className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#B58927] dark:text-[#D4AF37]">
                  100%
                </p>
                <p className="text-xs text-[#8C7E70] dark:text-[#857D6F]">Skin-Safe Alloy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Pillars of Lucky Covering Quality */}
      <section className="py-16 bg-[#F3ECE1]/70 dark:bg-[#10121C] border-y border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B58927] dark:text-[#D4AF37] font-semibold">
              THE LUCKY PROMISE
            </span>
            <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Uncompromising Luxury Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Gem,
                title: 'Handset Kemp & Pearls',
                desc: 'Unlike glued imitation stones, our Kemp rubies and emeralds are bezel-set by hand for enduring brilliance.',
              },
              {
                icon: Award,
                title: 'Multi-Micron Gold Plating',
                desc: 'Electroplated with authentic 22K/24K temple gold tones that resist sweat and tarnish across seasons.',
              },
              {
                icon: ShieldCheck,
                title: '1-Year Polish Guarantee',
                desc: 'Every bridal and temple creation includes our signature 1-year re-polishing assurance.',
              },
              {
                icon: Heart,
                title: 'Hypoallergenic Comfort',
                desc: '100% nickel-free and lead-free base metals engineered for comfortable all-day wedding wear.',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-6 space-y-3 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-8 py-3.5 text-sm font-bold text-[#090A0F] shadow-lg hover:scale-105 transition-transform"
            >
              <span>Explore Our Heritage Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
