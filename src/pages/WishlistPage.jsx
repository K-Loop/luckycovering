import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { wishlistProducts, products, toggleWishlist, addToCart, clearWishlist, openModal } =
    useStore();

  const suggestedProducts = products.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC]">
            Your curated collection of treasured Lucky Covering temple and bridal jewellery
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            type="button"
            onClick={() =>
              openModal({
                type: 'confirm',
                title: 'Clear Your Entire Wishlist?',
                message: `Are you sure you want to remove all ${wishlistProducts.length} saved jewellery pieces from your Wishlist?`,
                confirmText: 'Clear Wishlist',
                onConfirm: clearWishlist,
              })
            }
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B58927] dark:text-[#D4AF37] hover:text-red-500 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#C59B3E]/25 dark:border-[#D4AF37]/25 bg-white dark:bg-[#131521] shadow-[0_14px_35px_-12px_rgba(26,22,21,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]"
            >
              <Link
                to={`/product/${product.id}`}
                className="relative aspect-square overflow-hidden bg-[#221209]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                  }}
                  aria-label="Remove from Wishlist"
                  className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-transform hover:scale-105 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </Link>

              <div className="p-5 flex flex-1 flex-col justify-between space-y-4">
                <div>
                  <Link
                    to={`/product/${product.id}`}
                    className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37] transition-colors line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-lg font-bold text-[#B58927] dark:text-[#D4AF37]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F3ECE1] dark:bg-[#191C2B] hover:bg-gradient-to-r hover:from-[#E8C76A] hover:via-[#D4AF37] hover:to-[#B58927] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#090A0F] transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label="Remove item"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 text-[#8C7E70] hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-12 text-center max-w-xl mx-auto my-6 space-y-4 shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35">
            <Heart className="w-7 h-7" />
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
            Your Royal Wishlist is Empty
          </h2>
          <p className="text-sm text-[#5C5248] dark:text-[#C4BCAC]">
            Tap the heart icon on any temple necklace, jhumka, or bridal set to save your favorite designs here for later.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-7 py-3 text-sm font-semibold text-[#090A0F] shadow-md hover:scale-105 transition-transform"
            >
              <span>Explore Jewellery Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      <section className="mt-20 pt-12 border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-6">
          Curated Pieces You May Love
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestedProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WishlistPage;
