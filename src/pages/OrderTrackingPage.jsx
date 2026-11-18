import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PackageCheck,
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Headphones,
  ArrowRight,
  Search,
} from 'lucide-react';
import { useStore, ORDER_STAGES } from '../context/StoreContext';

const OrderTrackingPage = () => {
  const { orders, products, openModal } = useStore();
  const [orderInput, setOrderInput] = useState(orders[0]?.id || '#LC123456');
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || '#LC123456');
  const [showItems, setShowItems] = useState(false);

  const activeOrder =
    orders.find((o) => o.id.toUpperCase() === selectedOrderId.toUpperCase()) || orders[0];

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const raw = orderInput.trim().toUpperCase();
    if (!raw) {
      openModal({
        type: 'warning',
        title: 'Enter an Order ID',
        message: 'Please enter a valid Lucky Covering Order ID (for example: #LC123456) to inspect live shipment status.',
      });
      return;
    }
    const withHash = raw.startsWith('#') ? raw : `#${raw}`;
    const found = orders.find((o) => o.id.toUpperCase() === withHash);
    if (!found) {
      openModal({
        type: 'error',
        title: `Order "${withHash}" Not Found`,
        message: `We could not find an active shipment with ID "${withHash}". Try one of our live tracked orders (${orders
          .map((o) => o.id)
          .join(', ')}) or contact our Bridal Concierge.`,
        confirmText: 'Try Sample Order',
      });
      return;
    }
    setSelectedOrderId(found.id);
  };

  const stageIcons = [PackageCheck, Package, Truck, MapPin, CheckCircle2];
  const orderProducts = (activeOrder?.itemIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
          Track Your Order
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC]">
          Enter your order ID to get the latest updates on your insured jewellery shipment.
        </p>

        <form onSubmit={handleTrackSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8C7E70] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              placeholder="Enter Order ID (e.g. #LC123456)"
              className="w-full rounded-xl bg-white dark:bg-[#131521] border border-[#C59B3E]/35 dark:border-[#D4AF37]/30 pl-11 pr-4 py-3.5 text-sm text-[#1A1615] dark:text-[#F8F5EE] placeholder:text-[#8C7E70] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-8 py-3.5 text-sm font-bold text-[#090A0F] shadow-md hover:opacity-95 transition-opacity cursor-pointer"
          >
            Track Order
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#8C7E70] dark:text-[#857D6F]">
          <span>Active Order IDs (managed in /admin):</span>
          {orders.map((ord) => (
            <button
              key={ord.id}
              type="button"
              onClick={() => {
                setOrderInput(ord.id);
                setSelectedOrderId(ord.id);
              }}
              className={`rounded-full border px-2.5 py-0.5 transition-colors cursor-pointer ${
                activeOrder?.id === ord.id
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#090A0F] font-bold'
                  : 'border-[#D4AF37]/35 text-[#B58927] dark:text-[#D4AF37] hover:bg-[#D4AF37]/15'
              }`}
            >
              {ord.id} ({ORDER_STAGES[ord.currentStage]})
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal 5-Stage Order Progress Timeline */}
      {activeOrder && (
        <>
          <motion.div
            key={`${activeOrder.id}-${activeOrder.currentStage}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/25 p-6 sm:p-10 shadow-lg mb-8"
          >
            <div className="relative">
              <div className="hidden sm:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-[#E5DEC9] dark:bg-[#252838]" />
              <div
                style={{ width: `${(activeOrder.currentStage / 4) * 80}%` }}
                className="hidden sm:block absolute top-6 left-[10%] h-0.5 bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] transition-all duration-700"
              />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 relative z-10">
                {ORDER_STAGES.map((stageLabel, index) => {
                  const IconComponent = stageIcons[index];
                  const isCompleted = index <= activeOrder.currentStage;
                  const isCurrent = index === activeOrder.currentStage;

                  return (
                    <div
                      key={stageLabel}
                      className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2.5"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isCompleted
                            ? 'border-[#D4AF37] bg-gradient-to-br from-[#E8C76A] to-[#B58927] text-[#090A0F] shadow-[0_0_20px_rgba(212,175,55,0.45)]'
                            : 'border-[#C59B3E]/30 dark:border-[#D4AF37]/20 bg-[#FAF6F0] dark:bg-[#191C2B] text-[#8C7E70]'
                        } ${isCurrent ? 'ring-4 ring-[#D4AF37]/25 scale-105' : ''}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div>
                        <p
                          className={`text-xs sm:text-sm font-bold ${
                            isCompleted
                              ? 'text-[#1A1615] dark:text-[#F8F5EE]'
                              : 'text-[#8C7E70] dark:text-[#857D6F]'
                          }`}
                        >
                          {stageLabel}
                        </p>
                        <p className="text-[11px] text-[#8C7E70] dark:text-[#857D6F] mt-0.5">
                          {isCompleted ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Order Details & Delivery Address Card */}
          <div className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/25 dark:border-[#D4AF37]/25 p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
              <div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
                  Order {activeOrder.id}
                </h2>
                <p className="text-xs text-[#8C7E70] dark:text-[#857D6F] mt-0.5">
                  Placed on {activeOrder.placedDate} • {activeOrder.carrier} ({activeOrder.trackingRef})
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowItems(!showItems)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#B58927] dark:text-[#D4AF37] hover:underline cursor-pointer"
              >
                <span>{showItems ? 'Hide Details' : 'View Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {showItems && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
                {orderProducts.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="flex items-center gap-3.5 rounded-2xl bg-[#FAF6F0] dark:bg-[#191C2B] p-3 border border-[#C59B3E]/20 dark:border-[#D4AF37]/20"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-serif-luxury text-base font-bold text-[#1A1615] dark:text-[#F8F5EE] truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#B58927] dark:text-[#D4AF37] font-semibold">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div>
              <h3 className="text-sm font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-1.5">
                Delivery Address
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#1A1615] dark:text-[#F8F5EE]">
                {activeOrder.customerName}
              </p>
              <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] mt-0.5 leading-relaxed">
                {activeOrder.address}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Need Help Support Strip */}
      <div className="mt-8 rounded-2xl bg-[#F3ECE1] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/35">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Need Help with Your Shipment?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC]">
              Our bridal concierge support team is here for you 7 days a week.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#090A0F] shadow hover:scale-105 transition-transform shrink-0"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
