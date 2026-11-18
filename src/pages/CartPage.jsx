import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const CartPage = () => {
  const {
    cart,
    products,
    removeFromCart,
    updateCartQuantity,
    cartCount,
    cartSubtotal,
    shippingCost,
    cartTotal,
    openModal,
  } = useStore();

  const navigate = useNavigate();

  const youMayAlsoLike = products.filter((p) => !cart.some((c) => c.id === p.id)).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
          Your Cart ({cartCount})
        </h1>

        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B58927] dark:text-[#D4AF37] hover:underline"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Cart Product Cards List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-4 sm:p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#221209]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="min-w-0">
                    <span className="text-[11px] uppercase tracking-widest text-[#B58927] dark:text-[#D4AF37] font-semibold">
                      {item.categoryName}
                    </span>
                    <Link
                      to={`/product/${item.id}`}
                      className="block font-serif-luxury text-lg sm:text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE] hover:text-[#D4AF37] transition-colors truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm font-semibold text-[#5C5248] dark:text-[#C4BCAC]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#C59B3E]/15 dark:border-[#D4AF37]/15">
                  <div className="inline-flex items-center rounded-xl border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 bg-[#FAF6F0] dark:bg-[#191C2B] p-1">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/20 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs sm:text-sm font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/20 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[85px]">
                    <p className="text-base sm:text-lg font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove product"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#8C7E70] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 p-6 sm:p-7 shadow-xl space-y-5 sticky top-28">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE] pb-3 border-b border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-[#5C5248] dark:text-[#C4BCAC]">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#5C5248] dark:text-[#C4BCAC]">
                <span>Insured Express Shipping</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                </span>
              </div>

              <div className="pt-4 border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20 flex items-baseline justify-between">
                <span className="text-base font-bold text-[#1A1615] dark:text-[#F8F5EE]">Total</span>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#B58927] dark:text-[#D4AF37]">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  openModal({
                    type: 'success',
                    title: 'Royal Checkout Summary Ready',
                    message: `Your order of ${cartCount} piece(s) totalling ₹${cartTotal.toLocaleString(
                      'en-IN'
                    )} is ready for dispatch. Since this is a frontend-first showcase, click below to inspect live shipment progress in our Order Tracker.`,
                    confirmText: 'Open Order Tracker',
                    cancelText: 'Stay in Cart',
                    onConfirm: () => navigate('/track-order'),
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-3.5 text-sm font-bold text-[#090A0F] shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/shop"
                className="w-full flex items-center justify-center rounded-xl border border-[#C59B3E]/35 dark:border-[#D4AF37]/30 py-3 text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-12 text-center max-w-xl mx-auto my-6 space-y-4 shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/35">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-sm text-[#5C5248] dark:text-[#C4BCAC]">
            Explore our Kanchipuram temple necklaces, antique jhumkas, and bridal haram sets to begin your royal shopping experience.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-7 py-3 text-sm font-semibold text-[#090A0F] shadow-md hover:scale-105 transition-transform"
            >
              <span>Browse Jewellery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      <section className="mt-16 pt-12 border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {youMayAlsoLike.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      <div className="mt-12 rounded-2xl bg-[#F3ECE1] dark:bg-[#10121C] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          <div className="text-left">
            <p className="text-xs font-bold text-[#1A1615] dark:text-[#F8F5EE]">Secure Payments</p>
            <p className="text-[11px] text-[#8C7E70]">100% Protected Checkout</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Truck className="w-5 h-5 text-[#D4AF37]" />
          <div className="text-left">
            <p className="text-xs font-bold text-[#1A1615] dark:text-[#F8F5EE]">Free Shipping</p>
            <p className="text-[11px] text-[#8C7E70]">On Orders Above ₹999</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <RotateCcw className="w-5 h-5 text-[#D4AF37]" />
          <div className="text-left">
            <p className="text-xs font-bold text-[#1A1615] dark:text-[#F8F5EE]">7 Days Return</p>
            <p className="text-[11px] text-[#8C7E70]">Easy Exchange Assurance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
