import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  ChevronRight,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  Gem,
  Minus,
  Plus,
  ZoomIn,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    recordRecentlyViewed,
    recentlyViewedProducts,
  } = useStore();

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(product ? product.image : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      recordRecentlyViewed(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (product.inStock) {
      navigate('/cart');
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const fallbackRelated =
    relatedProducts.length >= 4
      ? relatedProducts
      : [
          ...relatedProducts,
          ...products.filter((p) => p.id !== product.id && p.category !== product.category),
        ].slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#8C7E70] dark:text-[#857D6F] mb-8">
        <Link to="/" className="hover:text-[#D4AF37] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          to={`/category/${product.category}`}
          className="hover:text-[#D4AF37] transition-colors"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#B58927] dark:text-[#D4AF37] font-medium truncate">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-6 space-y-4">
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 bg-[#221209] shadow-2xl cursor-zoom-in"
          >
            <img
              src={selectedImage}
              alt={product.name}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: 'scale(1.85)',
                    }
                  : { transform: 'scale(1)' }
              }
              className="h-full w-full object-cover object-center transition-transform duration-200 ease-out"
            />

            <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-md border border-[#D4AF37]/40 px-3 py-1.5 text-[11px] text-[#F3E5AB]">
              <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Hover to Zoom</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {(product.gallery || [product.image]).map((imgUrl, index) => {
              const active = selectedImage === imgUrl;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    active
                      ? 'border-[#D4AF37] scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Product Information & Purchase Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              {product.badge && (
                <span className="inline-block rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#B58927] dark:text-[#D4AF37]">
                  {product.badge}
                </span>
              )}
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  product.inStock
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/15 text-red-500 border border-red-500/30'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC]">
                ({product.rating}) • {product.reviewsCount} Verified Patron Reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3.5 pt-1">
              <span className="text-3xl sm:text-4xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-[#8C7E70] dark:text-[#857D6F] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
                <span>Pure 24K Micro-Gold Plated Heritage Finish</span>
              </div>
              <div className="flex items-center gap-3">
                <Gem className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
                <span>Premium Handset Kemp & Cultured Pearl Craftsmanship</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
                <span>Free Insured Express Shipping Above ₹999</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center rounded-xl border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 bg-white dark:bg-[#131521] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/15 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/15 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-3.5 text-sm font-bold text-[#090A0F] shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Notify / Check Stock'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37] bg-[#D4AF37]/15 px-6 py-3.5 text-sm font-bold text-[#B58927] dark:text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-[#090A0F] transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`w-full flex items-center justify-center gap-2.5 rounded-xl border py-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  wishlisted
                    ? 'border-red-500/50 bg-red-500/10 text-red-500'
                    : 'border-[#C59B3E]/35 dark:border-[#D4AF37]/30 bg-white/50 dark:bg-[#131521]/60 text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                <span>{wishlisted ? 'Saved in Your Royal Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
            <div className="flex flex-wrap gap-6 border-b border-[#C59B3E]/20 dark:border-[#D4AF37]/15 pb-3">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'shipping', label: 'Shipping & Returns' },
                { id: 'reviews', label: `Reviews (${product.reviewsCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-3 -mb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-[#B58927] dark:text-[#D4AF37] border-b-2 border-[#D4AF37]'
                      : 'text-[#8C7E70] dark:text-[#857D6F] hover:text-[#1A1615] dark:hover:text-[#F8F5EE]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pt-5 text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-[#1A1615] dark:text-[#F8F5EE]">
                    <li>Material: {product.specifications.material}</li>
                    <li>Length / Fit: {product.specifications.length}</li>
                    <li>Weight: {product.specifications.weight}</li>
                  </ul>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="rounded-xl bg-[#F3ECE1] dark:bg-[#10121C] p-3 border border-[#C59B3E]/20 dark:border-[#D4AF37]/15"
                    >
                      <span className="block text-[11px] uppercase tracking-wider text-[#8C7E70] dark:text-[#857D6F]">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p>
                    • <strong>Complimentary Insured Delivery:</strong> Dispatched within 24 hours in a tamper-evident Lucky Covering velvet heirloom box.
                  </p>
                  <p>
                    • <strong>7-Day Hassle-Free Exchange:</strong> Unused jewellery with original tags intact qualifies for an instant exchange or store credit.
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="rounded-xl bg-[#F3ECE1] dark:bg-[#10121C] p-4 border border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                        Meenakshi Iyer • Verified Buyer
                      </span>
                      <span className="text-amber-400 text-xs">★★★★★</span>
                    </div>
                    <p className="text-xs">
                      “Looks indistinguishable from real solid 22K temple jewellery. The Kemp stones and gold finish exceeded every expectation!”
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="mt-20 pt-12 border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-6">
          Related Royal Creations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fallbackRelated.map((item, idx) => (
            <ProductCard key={item.id} product={item} index={idx} />
          ))}
        </div>
      </section>

      {/* Recently Viewed Products Section */}
      {recentlyViewedProducts.length > 1 && (
        <section className="mt-16 pt-12 border-t border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-6">
            Recently Viewed Pieces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((item, idx) => (
                <ProductCard key={item.id} product={item} index={idx} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
