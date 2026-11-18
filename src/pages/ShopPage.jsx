import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Sparkles,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import CustomDropdown from '../components/CustomDropdown';

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-1500', label: 'Under ₹1,500', min: 0, max: 1500 },
  { id: '1500-2500', label: '₹1,500 – ₹2,500', min: 1500, max: 2500 },
  { id: '2500-4000', label: '₹2,500 – ₹4,000', min: 2500, max: 4000 },
  { id: 'above-4000', label: 'Above ₹4,000', min: 4000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const ITEMS_PER_PAGE = 9;

const ShopPage = () => {
  const { products, categories, promoBanners } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);
  const [searchText, setSearchText] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchText(searchParams.get('q') || '');
    const col = searchParams.get('collection');
    if (col === 'new') setSortBy('newest');
    if (col === 'bridal') setSelectedCategory('neckpieces');
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPrice, onlyInStock, sortBy, searchText]);

  const filteredProducts = useMemo(() => {
    const priceRange = PRICE_RANGES.find((r) => r.id === selectedPrice) || PRICE_RANGES[0];

    let list = products.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      if (onlyInStock && !product.inStock) return false;
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCat = product.categoryName.toLowerCase().includes(q);
        const matchDesc = product.shortDescription.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list = [...list].sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival));
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else {
      list = [...list].sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [products, selectedCategory, selectedPrice, onlyInStock, sortBy, searchText]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPrice('all');
    setOnlyInStock(false);
    setSearchText('');
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Luxury Banner Header */}
      <div className="relative rounded-3xl overflow-hidden border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 mb-8 min-h-[210px] sm:min-h-[250px] flex items-end sm:items-center p-5 sm:p-12">
        <img
          src={promoBanners.newArrivals.image}
          alt="Lucky Covering Royal Catalogue"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[75%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0805]/95 via-[#0F0805]/75 to-black/25 sm:bg-gradient-to-r sm:from-[#0F0805]/95 sm:via-[#0F0805]/80 sm:to-black/30" />

        <div className="relative z-10 max-w-xl space-y-2.5">
          <nav className="flex items-center gap-2 text-xs text-[#C4BCAC]">
            <Link to="/" className="hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-medium">Shop All Jewellery</span>
          </nav>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#F8F5EE]">
            {selectedCategory === 'all'
              ? 'Royal Jewellery Catalogue'
              : categories.find((c) => c.slug === selectedCategory)?.name || 'Jewellery'}
          </h1>
          <p className="text-xs sm:text-sm text-[#D8D0C2] max-w-md">
            Elegant handcrafted South Indian temple, bridal & contemporary gold covering designs for every sacred occasion.
          </p>
        </div>
      </div>

      {/* Filter & Custom Dropdown Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 bg-white dark:bg-[#131521] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span>Filter</span>
          </button>

          <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC]">
            Showing <span className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">{filteredProducts.length}</span> handcrafted pieces
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8C7E70] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Filter by keyword..."
              className="rounded-xl bg-white dark:bg-[#131521] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 pl-8 pr-7 py-2.5 text-xs text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => setSearchText('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C7E70] hover:text-[#D4AF37]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <CustomDropdown
            label="Sort by"
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      {/* Main Content Layout: Sidebar Filters + 3-Col Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside
          className={`lg:col-span-3 space-y-7 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 sm:p-6 shadow-sm space-y-7">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-3.5">
                Categories
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] font-semibold shadow'
                        : 'text-[#5C5248] dark:text-[#C4BCAC] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          selectedCategory === 'all' ? 'bg-[#090A0F]' : 'bg-[#D4AF37]/60'
                        }`}
                      />
                      All Jewellery
                    </span>
                    <span className="text-[11px] opacity-80">({products.length})</span>
                  </button>
                </li>

                {categories.map((cat) => {
                  const active = selectedCategory === cat.slug;
                  const count = products.filter((p) => p.category === cat.slug).length;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          active
                            ? 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] font-semibold shadow'
                            : 'text-[#5C5248] dark:text-[#C4BCAC] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              active ? 'bg-[#090A0F]' : 'bg-[#D4AF37]/60'
                            }`}
                          />
                          {cat.name}
                        </span>
                        <span className="text-[11px] opacity-80">({count})</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-5 border-t border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-3.5">
                Price Range
              </h3>
              <div className="space-y-2.5">
                {PRICE_RANGES.map((range) => {
                  const active = selectedPrice === range.id;
                  return (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setSelectedPrice(range.id)}
                      className="w-full flex items-center gap-3 text-left text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] hover:text-[#D4AF37] transition-colors cursor-pointer py-1"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                          active
                            ? 'border-[#D4AF37] bg-[#D4AF37] text-[#090A0F]'
                            : 'border-[#8C7E70] dark:border-[#857D6F]'
                        }`}
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#090A0F]" />}
                      </span>
                      <span className={active ? 'font-semibold text-[#1A1615] dark:text-[#F8F5EE]' : ''}>
                        {range.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-3">
                Availability
              </h3>
              <button
                type="button"
                onClick={() => setOnlyInStock(!onlyInStock)}
                className="flex items-center gap-3 text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] cursor-pointer"
              >
                <span
                  className={`flex h-4.5 w-4.5 items-center justify-center rounded border ${
                    onlyInStock
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-[#090A0F]'
                      : 'border-[#8C7E70]'
                  }`}
                >
                  {onlyInStock && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span>Ready to Ship (In Stock Only)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-xl border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 py-2.5 text-xs font-semibold text-[#B58927] dark:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-9">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 bg-white dark:bg-[#131521] text-[#1A1615] dark:text-[#F8F5EE] disabled:opacity-40 hover:border-[#D4AF37] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] shadow-md'
                          : 'border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 bg-white dark:bg-[#131521] text-[#5C5248] dark:text-[#C4BCAC] hover:border-[#D4AF37]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 bg-white dark:bg-[#131521] text-[#1A1615] dark:text-[#F8F5EE] disabled:opacity-40 hover:border-[#D4AF37] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-12 text-center space-y-4">
              <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto" />
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                No Jewellery Found Matching Your Filters
              </h3>
              <p className="text-sm text-[#5C5248] dark:text-[#C4BCAC] max-w-md mx-auto">
                Try adjusting your price range or category selection to explore our handcrafted collections.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2.5 text-xs font-semibold text-[#090A0F] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
