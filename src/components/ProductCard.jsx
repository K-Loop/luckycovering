import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const navigate = useNavigate();
  const wishlisted = isInWishlist(product.id);

  const secondaryImage =
    product.gallery && product.gallery.length > 1 ? product.gallery[1] : product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 hover:border-[#C59B3E]/60 dark:hover:border-[#D4AF37]/55 bg-white dark:bg-[#131521] shadow-[0_14px_35px_-12px_rgba(26,22,21,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] hover:-translate-y-1.5"
    >
      {/* Square 1:1 Image Container */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative aspect-square w-full overflow-hidden bg-[#221209] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0"
        />
        <img
          src={secondaryImage}
          alt={`${product.name} alternate view`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-0 scale-105 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {product.badge && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#090A0F] shadow-md">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>{product.badge}</span>
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
            wishlisted
              ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30 scale-105'
              : 'bg-black/45 text-white/90 hover:bg-[#D4AF37] hover:text-[#090A0F] border border-white/15'
          }`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute inset-x-4 bottom-3 z-10 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 px-3.5 py-1.5 text-xs font-medium text-[#F3E5AB]">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            Inspect Piece
          </span>
        </div>
      </div>

      {/* Product Details Body */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#8C7E70] dark:text-[#857D6F] mb-1">
            <span className="uppercase tracking-widest font-semibold text-[#B58927] dark:text-[#D4AF37]">
              {product.categoryName}
            </span>
            <span className="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block font-serif-luxury text-lg sm:text-xl font-semibold leading-snug text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#B58927] dark:hover:text-[#D4AF37] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          <div className="mt-2 flex items-baseline gap-2.5">
            <span className="text-lg sm:text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs sm:text-sm text-[#8C7E70] dark:text-[#857D6F] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] hover:from-[#F3D782] hover:to-[#C69831] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#090A0F] shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-[0.98] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle Wishlist"
            className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 cursor-pointer ${
              wishlisted
                ? 'border-red-500/50 bg-red-500/10 text-red-500'
                : 'border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-transparent text-[#5C5248] dark:text-[#C4BCAC] hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
