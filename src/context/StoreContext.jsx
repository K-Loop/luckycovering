import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  PRODUCTS as INITIAL_PRODUCTS,
  CATEGORIES as INITIAL_CATEGORIES,
  PROMO_BANNERS as INITIAL_BANNERS,
  TESTIMONIALS as INITIAL_TESTIMONIALS,
} from '../data/jewelleryData';

const StoreContext = createContext(null);

const INITIAL_ORDERS = [
  {
    id: '#LC123456',
    placedDate: '12 Nov 2026',
    currentStage: 2, // 0: Order Placed, 1: Processing, 2: Shipped, 3: Out for Delivery, 4: Delivered
    statusLabel: 'Shipped',
    customerName: 'Ananya Sundaram',
    customerEmail: 'ananya.sundaram@gmail.com',
    phone: '+91 98401 23456',
    address: 'No. 12, 1st Main Street, T. Nagar, Chennai – 600017, Tamil Nadu, India',
    carrier: 'BlueDart Royal Insured Priority',
    trackingRef: 'BD-994821048-IN',
    totalAmount: 4998,
    itemIds: ['lc-prod-01', 'lc-prod-02'],
  },
  {
    id: '#LC998877',
    placedDate: '08 Nov 2026',
    currentStage: 4,
    statusLabel: 'Delivered',
    customerName: 'Lakshmi Narayanan',
    customerEmail: 'lakshmi.narayanan@yahoo.in',
    phone: '+91 98422 88990',
    address: 'Villa 18, Race Course Road, Coimbatore – 641018, Tamil Nadu, India',
    carrier: 'DTDC Prime Vault Express',
    trackingRef: 'DT-77412980-IN',
    totalAmount: 5499,
    itemIds: ['lc-prod-03'],
  },
  {
    id: '#LC445566',
    placedDate: '16 Nov 2026',
    currentStage: 1,
    statusLabel: 'Processing',
    customerName: 'Divya Krishnan',
    customerEmail: 'divya.krish@outlook.com',
    phone: '+91 99001 44556',
    address: 'Flat 402, Heritage Greens, Indiranagar, Bengaluru – 560038, Karnataka',
    carrier: 'BlueDart Royal Insured Priority',
    trackingRef: 'BD-995100342-IN',
    totalAmount: 5498,
    itemIds: ['lc-prod-04', 'lc-prod-08'],
  },
  {
    id: '#LC778899',
    placedDate: '17 Nov 2026',
    currentStage: 3,
    statusLabel: 'Out for Delivery',
    customerName: 'Meenakshi Iyer',
    customerEmail: 'meenakshi.iyer@gmail.com',
    phone: '+91 94440 77889',
    address: 'Plot 8, West Masi Street, Madurai – 625001, Tamil Nadu, India',
    carrier: 'Delhivery Insured Gold Express',
    trackingRef: 'DL-55201944-IN',
    totalAmount: 4299,
    itemIds: ['lc-prod-16'],
  },
];

const INITIAL_ENQUIRIES = [
  {
    id: 'enq-1',
    name: 'Priya Venkatesh',
    email: 'priya.v@gmail.com',
    phone: '+91 98409 11223',
    subject: 'Bridal Jewellery Consultation',
    message: 'Looking for a complete Muhurtham bridal haram, choker, vaddanam, and jhumka set for my wedding on Dec 14th.',
    status: 'Pending',
    date: '17 Nov 2026',
  },
  {
    id: 'enq-2',
    name: 'Kavitha Raman',
    email: 'kavitha.raman@gmail.com',
    phone: '+91 94431 55667',
    subject: 'Bulk / Wedding Return Gifts',
    message: 'We need 50 pieces of Kamala Lotus Ear Studs in velvet gift boxes for wedding return favours.',
    status: 'Resolved',
    date: '15 Nov 2026',
  },
];

export const ORDER_STAGES = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export const StoreProvider = ({ children }) => {
  // 1. Theme Persistence
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_theme');
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    try {
      localStorage.setItem('lc_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // 2. Dynamic Products State (Manageable from /admin)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_products_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_products_v1', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // 3. Dynamic Categories State (Manageable from /admin)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_categories_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_CATEGORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_categories_v1', JSON.stringify(categories));
    } catch {
      // ignore
    }
  }, [categories]);

  // 4. Dynamic Promo Banners State (Manageable from /admin)
  const [promoBanners, setPromoBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_banners_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BANNERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_banners_v1', JSON.stringify(promoBanners));
    } catch {
      // ignore
    }
  }, [promoBanners]);

  // 5. Dynamic Orders State (Manageable from /admin & reflected on /track-order)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_orders_v1', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // 6. Dynamic Testimonials & Enquiries (Manageable from /admin)
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_testimonials_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TESTIMONIALS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_testimonials_v1', JSON.stringify(testimonials));
    } catch {
      // ignore
    }
  }, [testimonials]);

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_enquiries_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ENQUIRIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_enquiries_v1', JSON.stringify(enquiries));
    } catch {
      // ignore
    }
  }, [enquiries]);

  // 7. Cart & Wishlist Persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lc_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('lc_recent');
      return saved ? JSON.parse(saved) : ['lc-prod-01', 'lc-prod-02', 'lc-prod-04', 'lc-prod-06'];
    } catch {
      return ['lc-prod-01', 'lc-prod-02', 'lc-prod-04', 'lc-prod-06'];
    }
  });

  const recordRecentlyViewed = (productId) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('lc_recent', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // 8. Global Toast & Custom Modal System
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'gold') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast((current) => (current && current.message === message ? null : current));
    }, 3200);
  };

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: null,
  });

  const openModal = (config) => {
    setModalConfig({
      isOpen: true,
      title: config.title || 'Lucky Covering Alert',
      message: config.message || '',
      type: config.type || 'info',
      confirmText: config.confirmText || 'Understood',
      cancelText: config.cancelText || 'Cancel',
      onConfirm: config.onConfirm || null,
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, selectedSize = null) => {
    if (!product.inStock) {
      openModal({
        type: 'error',
        title: 'Currently Out of Stock',
        message: `"${product.name}" is temporarily out of stock in our showroom vault. Please save it to your Wishlist or contact our Bridal Concierge for restock priority.`,
        confirmText: 'Got It',
      });
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          categoryName: product.categoryName,
          quantity,
          selectedSize,
        },
      ];
    });
    showToast(`Added "${product.name}" to your Royal Cart`);
  };

  const removeFromCart = (productId) => {
    const target = cart.find((item) => item.id === productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
    if (target) {
      showToast(`Removed "${target.name}" from Cart`, 'neutral');
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: Math.min(10, newQuantity) } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist Operations
  const isInWishlist = (productId) => wishlist.includes(productId);

  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed "${product.name}" from Wishlist`, 'neutral');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      showToast(`Saved "${product.name}" to your Wishlist`);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Cleared your Wishlist', 'neutral');
  };

  // Admin Management Operations (For existing Products, Categories, Orders, Banners, Testimonials, Enquiries)
  const updateProduct = (productId, updates) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const updatedPrice = Number(updates.price ?? p.price);
        const updatedOriginal = Number(updates.originalPrice ?? p.originalPrice);
        const computedDiscount =
          updatedOriginal > updatedPrice
            ? Math.round(((updatedOriginal - updatedPrice) / updatedOriginal) * 100)
            : 0;
        return {
          ...p,
          ...updates,
          price: updatedPrice,
          originalPrice: updatedOriginal,
          discount: computedDiscount,
        };
      })
    );
    showToast('Product updated in live catalogue ✨');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalogue', 'neutral');
  };

  const updateCategory = (categoryId, updates) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, ...updates } : c))
    );
    showToast('Category details updated ✨');
  };

  const updateOrderStage = (orderId, newStageIndex) => {
    const stageIdx = Number(newStageIndex);
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              currentStage: stageIdx,
              statusLabel: ORDER_STAGES[stageIdx] || 'Processing',
            }
          : ord
      )
    );
    showToast(`Order ${orderId} status updated to "${ORDER_STAGES[stageIdx]}"`);
  };

  const updateOrderDetails = (orderId, updates) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, ...updates } : ord))
    );
    showToast(`Order ${orderId} details saved`);
  };

  const updatePromoBanner = (bannerKey, updates) => {
    setPromoBanners((prev) => ({
      ...prev,
      [bannerKey]: {
        ...prev[bannerKey],
        ...updates,
      },
    }));
    showToast('Promotional banner updated on Homepage ✨');
  };

  const deleteTestimonial = (testimonialId) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== testimonialId));
    showToast('Testimonial removed');
  };

  const addEnquiry = (enquiry) => {
    const newItem = {
      id: `enq-${Date.now()}`,
      ...enquiry,
      status: 'Pending',
      date: '18 Nov 2026',
    };
    setEnquiries((prev) => [newItem, ...prev]);
  };

  const toggleEnquiryStatus = (enquiryId) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === enquiryId
          ? { ...e, status: e.status === 'Pending' ? 'Resolved' : 'Pending' }
          : e
      )
    );
    showToast('Enquiry status updated');
  };

  const deleteEnquiry = (enquiryId) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
    showToast('Enquiry deleted');
  };

  const resetAllStoreData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setPromoBanners(INITIAL_BANNERS);
    setOrders(INITIAL_ORDERS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setEnquiries(INITIAL_ENQUIRIES);
    localStorage.removeItem('lc_products_v1');
    localStorage.removeItem('lc_categories_v1');
    localStorage.removeItem('lc_banners_v1');
    localStorage.removeItem('lc_orders_v1');
    localStorage.removeItem('lc_testimonials_v1');
    localStorage.removeItem('lc_enquiries_v1');
    showToast('All showroom data restored to factory defaults ✨');
  };

  // Computed Cart Totals
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shippingCost = useMemo(() => (cartSubtotal === 0 || cartSubtotal >= 999 ? 0 : 99), [cartSubtotal]);
  const cartTotal = useMemo(() => cartSubtotal + shippingCost, [cartSubtotal, shippingCost]);

  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlist.includes(p.id)),
    [products, wishlist]
  );

  const recentlyViewedProducts = useMemo(
    () =>
      recentlyViewedIds
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean),
    [recentlyViewedIds, products]
  );

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        products,
        categories,
        promoBanners,
        orders,
        testimonials,
        enquiries,
        updateProduct,
        deleteProduct,
        updateCategory,
        updateOrderStage,
        updateOrderDetails,
        updatePromoBanner,
        deleteTestimonial,
        addEnquiry,
        toggleEnquiryStatus,
        deleteEnquiry,
        resetAllStoreData,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingCost,
        cartTotal,
        wishlist,
        wishlistProducts,
        isInWishlist,
        toggleWishlist,
        clearWishlist,
        recentlyViewedProducts,
        recordRecentlyViewed,
        toast,
        showToast,
        modalConfig,
        openModal,
        closeModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
