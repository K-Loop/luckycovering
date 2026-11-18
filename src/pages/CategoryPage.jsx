import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import CustomDropdown from '../components/CustomDropdown';

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-1500', label: 'Under ₹1,500', min: 0, max: 1500 },
  { id: '1500-2500', label: '₹1,500 – ₹2,500', min: 1500, max: 2500 },
  { id: '2500-5000', label: '₹2,500 – ₹5,000', min: 2500, max: 5000 },
  { id: 'above-5000', label: 'Above ₹5,000', min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { categories, products } = useStore();

  const currentCategory = categories.find((c) => c.slug === slug);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  if (!currentCategory) {
    return <Navigate to="/404" replace />;
  }

  const categoryProducts = useMemo(() => {
    const priceRange = PRICE_RANGES.find((r) => r.id === selectedPrice) || PRICE_RANGES[0];

    let items = products.filter((p) => p.category === currentCategory.slug);

    if (items.length < 6) {
      const extras = products
        .filter((p) => p.category !== currentCategory.slug)
        .slice(0, 6 - items.length);
      items = [...items, ...extras];
    }

    items = items.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);

    if (sortBy === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') items.sort((a, b) => b.rating - a.rating);
    else items.sort((a, b) => b.reviewsCount - a.reviewsCount);

    return items;
  }, [products, currentCategory.slug, selectedPrice, sortBy]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 mb-8 min-h-[240px] sm:min-h-[280px] flex items-end sm:items-center bg-[#1B0E08]">
        <div className="absolute inset-0 sm:left-auto sm:w-2/3">
          <img
            src={currentCategory.image}
            alt={currentCategory.name}
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120905] via-[#120905]/75 to-transparent sm:bg-gradient-to-r sm:from-[#120905] sm:via-[#120905]/85 sm:to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-12 max-w-xl space-y-2.5">
          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8F5EE]">
            {currentCategory.name}
          </h1>

          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#D4AF37] font-medium">
            <Link to="/" className="text-[#C4BCAC] hover:text-[#D4AF37] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C4BCAC]" />
            <span>{currentCategory.name}</span>
          </nav>

          <p className="text-xs sm:text-sm text-[#D8D0C2] pt-1 leading-relaxed">
            {currentCategory.description}
          </p>
        </div>
      </div>

      {/* Filter & Custom Dropdown Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-[#C59B3E]/25 dark:border-[#D4AF37]/20">
        <div className="inline-flex items-center gap-2 rounded-xl border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 bg-white dark:bg-[#131521] px-4 py-2 text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
          <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
          <span>Filter</span>
        </div>

        <CustomDropdown
          label="Sort by"
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Sidebar + Category Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-5 sm:p-6 shadow-sm space-y-7">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-3.5">
                Categories
              </h3>
              <ul className="space-y-1.5">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all cursor-pointer"
                  >
                    <span className="h-2 w-2 rounded-full border border-[#8C7E70]" />
                    <span>All</span>
                  </button>
                </li>
                {categories.map((cat) => {
                  const isCurrent = cat.slug === currentCategory.slug;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => navigate(`/category/${cat.slug}`)}
                        className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] font-semibold shadow'
                            : 'text-[#5C5248] dark:text-[#C4BCAC] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isCurrent ? 'bg-[#090A0F]' : 'border border-[#8C7E70]'
                          }`}
                        />
                        <span className="truncate">{cat.name}</span>
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
                            ? 'border-[#D4AF37] bg-[#D4AF37]'
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
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {categoryProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/20 p-12 text-center space-y-4">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <p className="text-sm text-[#5C5248] dark:text-[#C4BCAC]">
                No pieces in this price bracket. Try selecting "All Prices".
              </p>
              <button
                type="button"
                onClick={() => setSelectedPrice('all')}
                className="rounded-full bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2 text-xs font-semibold text-[#090A0F] cursor-pointer"
              >
                Show All Prices
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
