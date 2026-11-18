import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  LayoutDashboard,
  Gem,
  Layers,
  Truck,
  Megaphone,
  MessageSquare,
  RotateCcw,
  LogOut,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  Eye,
} from 'lucide-react';
import { useStore, ORDER_STAGES } from '../context/StoreContext';
import { BRAND_LOGOS } from '../data/jewelleryData';
import CustomDropdown from '../components/CustomDropdown';
import CustomModal from '../components/CustomModal';

const STAGE_OPTIONS = ORDER_STAGES.map((label, idx) => ({
  value: idx,
  label: `${idx + 1}. ${label}`,
}));

const BADGE_OPTIONS = [
  { value: 'Best Seller', label: 'Best Seller' },
  { value: 'New Arrival', label: 'New Arrival' },
  { value: 'Bridal Choice', label: 'Bridal Choice' },
  { value: 'Trending', label: 'Trending' },
  { value: 'Most Loved', label: 'Most Loved' },
  { value: 'Featured', label: 'Featured' },
  { value: '', label: 'No Badge' },
];

const AdminDashboardPage = () => {
  const {
    products,
    categories,
    orders,
    promoBanners,
    testimonials,
    enquiries,
    updateProduct,
    deleteProduct,
    updateCategory,
    updateOrderStage,
    updateOrderDetails,
    updatePromoBanner,
    deleteTestimonial,
    toggleEnquiryStatus,
    deleteEnquiry,
    resetAllStoreData,
    openModal,
  } = useStore();

  // Frontend Admin Auth with Autofilled Email & Password
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('lc_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [email, setEmail] = useState('admin@luckycovering.com');
  const [password, setPassword] = useState('LuckyGold@2026');

  // Active Admin Tab: 'overview' | 'products' | 'categories' | 'orders' | 'banners' | 'enquiries'
  const [activeTab, setActiveTab] = useState('products');
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  // Edit Category Modal State
  const [editingCategory, setEditingCategory] = useState(null);
  // Edit Order Modal State
  const [editingOrder, setEditingOrder] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      openModal({
        type: 'error',
        title: 'Credentials Required',
        message: 'Please enter your administrator email and password or click "Autofill Demo Credentials".',
      });
      return;
    }
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('lc_admin_auth', 'true');
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('lc_admin_auth');
    } catch {
      // ignore
    }
  };

  const handleAutofill = () => {
    setEmail('admin@luckycovering.com');
    setPassword('LuckyGold@2026');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, categoryFilter, productSearch]);

  const totalCatalogueValue = useMemo(
    () => products.reduce((sum, p) => sum + p.price, 0),
    [products]
  );
  const inStockCount = useMemo(() => products.filter((p) => p.inStock).length, [products]);
  const totalOrdersRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    [orders]
  );

  // =========================================================================
  // 1. ADMIN LOGIN GATE WITH AUTOFILLED CREDENTIALS
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center px-4 py-14 bg-[#FAF6F0] dark:bg-[#08090F]">
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.55)]"
        >
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-2xl overflow-hidden bg-[#0B0E17] border border-[#D4AF37]/45 p-2 shadow-lg mb-4">
              <img
                src={BRAND_LOGOS.transparent}
                alt="Lucky Covering Admin"
                className="h-full w-full object-contain scale-125"
              />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#B58927] dark:text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Showroom Management Console
            </span>

            <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Admin Sign In
            </h1>
            <p className="mt-1 text-xs text-[#5C5248] dark:text-[#C4BCAC]">
              Credentials are pre-filled for instant frontend showroom management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5248] dark:text-[#C4BCAC] mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 pl-10 pr-4 py-3 text-sm text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5248] dark:text-[#C4BCAC] mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 pl-10 pr-4 py-3 text-sm font-mono text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleAutofill}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B58927] dark:text-[#D4AF37] hover:underline cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autofill Demo Credentials</span>
              </button>
              <span className="text-[11px] text-emerald-500 font-medium">Ready to Sign In</span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] py-3.5 text-sm font-bold text-[#090A0F] shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Enter Admin Dashboard</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD TO MANAGE ALL EXISTING ITEMS
  // =========================================================================
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8C76A] to-[#B58927] text-[#090A0F] shadow-md">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58927] dark:text-[#D4AF37] font-bold">
              LUCKY COVERING • EXECUTIVE PORTAL
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Showroom Operations & Inventory Manager
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 bg-white dark:bg-[#131521] px-4 py-2.5 text-xs font-semibold text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Live Storefront</span>
          </Link>

          <button
            type="button"
            onClick={() =>
              openModal({
                type: 'confirm',
                title: 'Restore Factory Default Data?',
                message:
                  'This will reset all modified prices, stock toggles, categories, promotional banners, and order timelines back to the original 20-piece Lucky Covering catalogue.',
                confirmText: 'Restore Defaults',
                onConfirm: resetAllStoreData,
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-semibold text-amber-600 dark:text-amber-300 hover:bg-amber-500/20 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Factory Data</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-500/20 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Console</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 shadow-sm">
          <span className="text-xs uppercase tracking-wider text-[#8C7E70] dark:text-[#857D6F]">
            Active Jewellery Pieces
          </span>
          <p className="mt-1 font-serif-luxury text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
            {products.length}{' '}
            <span className="text-xs font-sans font-semibold text-emerald-500">
              ({inStockCount} In Stock)
            </span>
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 shadow-sm">
          <span className="text-xs uppercase tracking-wider text-[#8C7E70] dark:text-[#857D6F]">
            Royal Categories
          </span>
          <p className="mt-1 font-serif-luxury text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
            {categories.length}{' '}
            <span className="text-xs font-sans font-normal text-[#8C7E70]">Collections</span>
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 shadow-sm">
          <span className="text-xs uppercase tracking-wider text-[#8C7E70] dark:text-[#857D6F]">
            Tracked Shipments
          </span>
          <p className="mt-1 font-serif-luxury text-3xl font-bold text-[#B58927] dark:text-[#D4AF37]">
            {orders.length}{' '}
            <span className="text-xs font-sans font-normal text-[#8C7E70]">
              (₹{totalOrdersRevenue.toLocaleString('en-IN')})
            </span>
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 shadow-sm">
          <span className="text-xs uppercase tracking-wider text-[#8C7E70] dark:text-[#857D6F]">
            Catalogue Unit Value
          </span>
          <p className="mt-1 font-serif-luxury text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
            ₹{totalCatalogueValue.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Navigation Tabs to Manage All Existing Store Entities */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-[#F3ECE1] dark:bg-[#10121C] p-1.5 border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 mb-8">
        {[
          { id: 'products', label: `Manage Products (${products.length})`, icon: Gem },
          { id: 'categories', label: `Manage Categories (${categories.length})`, icon: Layers },
          { id: 'orders', label: `Manage Orders (${orders.length})`, icon: Truck },
          { id: 'banners', label: 'Manage Promo Banners (4)', icon: Megaphone },
          {
            id: 'enquiries',
            label: `Enquiries & Reviews (${enquiries.length + testimonials.length})`,
            icon: MessageSquare,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] shadow-md'
                : 'text-[#5C5248] dark:text-[#C4BCAC] hover:text-[#D4AF37]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* =====================================================================
          TAB 1: MANAGE EXISTING PRODUCTS (Edit price, discount, stock, badges, details, or delete)
         ===================================================================== */}
      {activeTab === 'products' && (
        <div className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 sm:p-7 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                Manage Existing Jewellery Inventory
              </h2>
              <p className="text-xs text-[#8C7E70] dark:text-[#857D6F]">
                Toggle stock availability,featured/best-seller flags, or click Edit to modify prices, descriptions, and specifications.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8C7E70] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search product name or ID..."
                  className="rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 pl-8 pr-4 py-2 text-xs text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <CustomDropdown
                label="Category"
                options={[
                  { value: 'all', label: 'All Categories' },
                  ...categories.map((c) => ({ value: c.slug, label: c.name })),
                ]}
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
            </div>
          </div>

          <div className="overflow-x-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
            <table className="w-full text-left border-collapse min-w-[920px]">
              <thead>
                <tr className="border-b border-[#C59B3E]/20 dark:border-[#D4AF37]/15 text-[11px] uppercase tracking-wider text-[#8C7E70] dark:text-[#857D6F]">
                  <th className="py-3 px-3">Piece</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price / MRP</th>
                  <th className="py-3 px-3">Stock Status</th>
                  <th className="py-3 px-3">Showcase Flags</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C59B3E]/15 dark:divide-[#D4AF37]/10 text-xs sm:text-sm">
                {filteredProducts.map((prod) => (
                  <tr
                    key={prod.id}
                    className="hover:bg-[#FAF6F0]/60 dark:hover:bg-[#191C2B]/60 transition-colors"
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-serif-luxury text-base font-bold text-[#1A1615] dark:text-[#F8F5EE] truncate max-w-[240px]">
                            {prod.name}
                          </p>
                          <span className="text-[11px] text-[#8C7E70]">
                            ID: {prod.id} {prod.badge ? `• [${prod.badge}]` : ''}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-medium text-[#B58927] dark:text-[#D4AF37]">
                      {prod.categoryName}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[11px] text-[#8C7E70] line-through">
                        ₹{prod.originalPrice.toLocaleString('en-IN')} ({prod.discount}% off)
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                          prod.inStock
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/15 text-red-500 border border-red-500/30'
                        }`}
                      >
                        {prod.inStock ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateProduct(prod.id, { isFeatured: !prod.isFeatured })}
                          className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                            prod.isFeatured
                              ? 'bg-[#D4AF37] text-[#090A0F]'
                              : 'bg-[#FAF6F0] dark:bg-[#191C2B] text-[#8C7E70] border border-[#C59B3E]/25'
                          }`}
                        >
                          Featured
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(prod.id, { isNewArrival: !prod.isNewArrival })
                          }
                          className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                            prod.isNewArrival
                              ? 'bg-[#D4AF37] text-[#090A0F]'
                              : 'bg-[#FAF6F0] dark:bg-[#191C2B] text-[#8C7E70] border border-[#C59B3E]/25'
                          }`}
                        >
                          New
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(prod.id, { isBestSeller: !prod.isBestSeller })
                          }
                          className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                            prod.isBestSeller
                              ? 'bg-[#D4AF37] text-[#090A0F]'
                              : 'bg-[#FAF6F0] dark:bg-[#191C2B] text-[#8C7E70] border border-[#C59B3E]/25'
                          }`}
                        >
                          Best Seller
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/product/${prod.id}`}
                          title="Inspect on Storefront"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 text-[#8C7E70] hover:text-[#D4AF37] hover:border-[#D4AF37]"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ ...prod })}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3 py-1.5 text-xs font-semibold text-[#B58927] dark:text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090A0F] transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            openModal({
                              type: 'error',
                              title: 'Remove Piece from Catalogue?',
                              message: `Are you sure you want to remove "${prod.name}" from the active showroom catalogue? You can restore it anytime via Reset Factory Data.`,
                              confirmText: 'Remove Piece',
                              onConfirm: () => deleteProduct(prod.id),
                            })
                          }
                          aria-label="Delete product"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/15 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: MANAGE EXISTING CATEGORIES
         ===================================================================== */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-4 sm:p-5 shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 rounded-2xl object-cover border border-[#D4AF37]/35 shrink-0"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#B58927] dark:text-[#D4AF37]">
                    {cat.itemCount} Designs
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] truncate">
                  {cat.tagline}
                </p>
                <p className="text-[11px] text-[#8C7E70] line-clamp-2">{cat.description}</p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCategory({ ...cat })}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3 py-1.5 text-xs font-semibold text-[#B58927] dark:text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#090A0F] transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Category Details</span>
                  </button>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-xs text-[#8C7E70] hover:text-[#D4AF37] underline"
                  >
                    View Page
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 3: MANAGE EXISTING ORDERS & TIMELINE STAGES
         ===================================================================== */}
      {activeTab === 'orders' && (
        <div className="space-y-5">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C59B3E]/15 dark:border-[#D4AF37]/15 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                      Order {ord.id}
                    </h3>
                    <span className="rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3 py-0.5 text-xs font-bold text-[#B58927] dark:text-[#D4AF37]">
                      {ORDER_STAGES[ord.currentStage]}
                    </span>
                  </div>
                  <p className="text-xs text-[#8C7E70] mt-0.5">
                    Patron: <strong>{ord.customerName}</strong> ({ord.phone}) • Placed on {ord.placedDate} • Total: ₹{ord.totalAmount?.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <CustomDropdown
                    label="Timeline Stage"
                    options={STAGE_OPTIONS}
                    value={ord.currentStage}
                    onChange={(newStage) => updateOrderStage(ord.id, newStage)}
                  />

                  <button
                    type="button"
                    onClick={() => setEditingOrder({ ...ord })}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#D4AF37]/40 px-4 py-2.5 text-xs font-semibold text-[#B58927] dark:text-[#D4AF37] hover:bg-[#D4AF37]/15 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Carrier / Address</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C5248] dark:text-[#C4BCAC]">
                <div>
                  <span className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">Delivery Address: </span>
                  {ord.address}
                </div>
                <div>
                  <span className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">Courier & AWB: </span>
                  {ord.carrier} ({ord.trackingRef})
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 4: MANAGE EXISTING PROMOTIONAL BANNERS
         ===================================================================== */}
      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(promoBanners).map(([key, banner]) => (
            <div
              key={key}
              className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative h-44 w-full">
                <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex items-center p-6">
                  <div className="max-w-xs">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      {banner.badge}
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-bold text-white">
                      {banner.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8C7E70] mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={banner.badge}
                      onChange={(e) => updatePromoBanner(key, { badge: e.target.value })}
                      className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 px-3 py-2 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#8C7E70] mb-1">
                      Banner Heading
                    </label>
                    <input
                      type="text"
                      value={banner.title}
                      onChange={(e) => updatePromoBanner(key, { title: e.target.value })}
                      className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 px-3 py-2 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8C7E70] mb-1">
                    Promotional Description
                  </label>
                  <textarea
                    rows={2}
                    value={banner.description}
                    onChange={(e) => updatePromoBanner(key, { description: e.target.value })}
                    className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 p-2.5 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          TAB 5: MANAGE ENQUIRIES & PATRON TESTIMONIALS
         ===================================================================== */}
      {activeTab === 'enquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Enquiries */}
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Concierge Enquiries ({enquiries.length})
            </h2>
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1615] dark:text-[#F8F5EE]">
                      {enq.name} • <span className="text-[#D4AF37]">{enq.subject}</span>
                    </h4>
                    <p className="text-[11px] text-[#8C7E70]">
                      {enq.email} • {enq.phone} • {enq.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleEnquiryStatus(enq.id)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold cursor-pointer ${
                        enq.status === 'Resolved'
                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {enq.status}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEnquiry(enq.id)}
                      className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#5C5248] dark:text-[#C4BCAC] leading-relaxed">
                  “{enq.message}”
                </p>
              </div>
            ))}
          </div>

          {/* Patron Testimonials */}
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Homepage Patron Testimonials ({testimonials.length})
            </h2>
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1615] dark:text-[#F8F5EE]">
                      {t.name} ({t.location})
                    </h4>
                    <span className="text-[11px] text-[#D4AF37]">{t.role}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteTestimonial(t.id)}
                    className="text-red-500 hover:bg-red-500/10 p-1.5 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs italic text-[#5C5248] dark:text-[#C4BCAC]">“{t.comment}”</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          CUSTOM MODAL: EDIT EXISTING PRODUCT
         ===================================================================== */}
      <CustomModal
        isOpen={Boolean(editingProduct)}
        onClose={() => setEditingProduct(null)}
        title={editingProduct ? `Edit Piece: ${editingProduct.name}` : ''}
        type="info"
      >
        {editingProduct && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct(editingProduct.id, editingProduct);
              setEditingProduct(null);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                Product Name
              </label>
              <input
                type="text"
                required
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                  }
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Original MRP (₹)
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  value={editingProduct.originalPrice}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      originalPrice: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Badge Ribbon
                </label>
                <CustomDropdown
                  className="w-full"
                  options={BADGE_OPTIONS}
                  value={editingProduct.badge || ''}
                  onChange={(val) => setEditingProduct({ ...editingProduct, badge: val })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Category
                </label>
                <CustomDropdown
                  className="w-full"
                  options={categories.map((c) => ({ value: c.slug, label: c.name }))}
                  value={editingProduct.category}
                  onChange={(slugVal) => {
                    const catObj = categories.find((c) => c.slug === slugVal);
                    setEditingProduct({
                      ...editingProduct,
                      category: slugVal,
                      categoryName: catObj ? catObj.name : editingProduct.categoryName,
                    });
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                Short Description
              </label>
              <textarea
                rows={3}
                value={editingProduct.shortDescription}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                }
                className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 p-3 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="rounded-xl border border-[#C59B3E]/35 px-5 py-2.5 text-xs font-semibold text-[#1A1615] dark:text-[#F8F5EE] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2.5 text-xs font-bold text-[#090A0F] shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </CustomModal>

      {/* =====================================================================
          CUSTOM MODAL: EDIT EXISTING CATEGORY
         ===================================================================== */}
      <CustomModal
        isOpen={Boolean(editingCategory)}
        onClose={() => setEditingCategory(null)}
        title={editingCategory ? `Edit Category: ${editingCategory.name}` : ''}
        type="info"
      >
        {editingCategory && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCategory(editingCategory.id, editingCategory);
              setEditingCategory(null);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Displayed Design Count
                </label>
                <input
                  type="number"
                  required
                  value={editingCategory.itemCount}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, itemCount: Number(e.target.value) })
                  }
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                Subtitle Tagline
              </label>
              <input
                type="text"
                required
                value={editingCategory.tagline}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, tagline: e.target.value })
                }
                className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 px-3.5 py-2.5 text-xs sm:text-sm text-[#1A1615] dark:text-[#F8F5EE]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                Category Banner Description
              </label>
              <textarea
                rows={3}
                value={editingCategory.description}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, description: e.target.value })
                }
                className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 p-3 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="rounded-xl border border-[#C59B3E]/35 px-5 py-2.5 text-xs font-semibold text-[#1A1615] dark:text-[#F8F5EE] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2.5 text-xs font-bold text-[#090A0F] shadow-md cursor-pointer"
              >
                Update Category
              </button>
            </div>
          </form>
        )}
      </CustomModal>

      {/* =====================================================================
          CUSTOM MODAL: EDIT EXISTING ORDER DETAILS
         ===================================================================== */}
      <CustomModal
        isOpen={Boolean(editingOrder)}
        onClose={() => setEditingOrder(null)}
        title={editingOrder ? `Update Shipment ${editingOrder.id}` : ''}
        type="info"
      >
        {editingOrder && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateOrderDetails(editingOrder.id, editingOrder);
              setEditingOrder(null);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={editingOrder.customerName}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, customerName: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 px-3.5 py-2.5 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                  Tracking Reference
                </label>
                <input
                  type="text"
                  required
                  value={editingOrder.trackingRef}
                  onChange={(e) =>
                    setEditingOrder({ ...editingOrder, trackingRef: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 px-3.5 py-2.5 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                Courier Partner
              </label>
              <input
                type="text"
                required
                value={editingOrder.carrier}
                onChange={(e) => setEditingOrder({ ...editingOrder, carrier: e.target.value })}
                className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 px-3.5 py-2.5 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C5248] dark:text-[#C4BCAC] mb-1">
                Delivery Address
              </label>
              <textarea
                rows={2}
                value={editingOrder.address}
                onChange={(e) => setEditingOrder({ ...editingOrder, address: e.target.value })}
                className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/35 p-3 text-xs text-[#1A1615] dark:text-[#F8F5EE]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="rounded-xl border border-[#C59B3E]/35 px-5 py-2.5 text-xs font-semibold text-[#1A1615] dark:text-[#F8F5EE] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2.5 text-xs font-bold text-[#090A0F] shadow-md cursor-pointer"
              >
                Save Shipment
              </button>
            </div>
          </form>
        )}
      </CustomModal>
    </div>
  );
};

export default AdminDashboardPage;
