import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import CustomDropdown from '../components/CustomDropdown';

const ENQUIRY_TOPICS = [
  { value: 'Bridal Jewellery Consultation', label: 'Bridal Jewellery Consultation' },
  { value: 'Order & Delivery Assistance', label: 'Order & Delivery Assistance' },
  { value: 'Custom Temple Haram Request', label: 'Custom Temple Haram Request' },
  { value: 'Bulk / Wedding Return Gifts', label: 'Bulk / Wedding Return Gifts' },
];

const ContactPage = () => {
  const { addEnquiry, openModal, showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bridal Jewellery Consultation',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry(formData);
    openModal({
      type: 'success',
      title: 'Royal Enquiry Received',
      message: `Thank you, ${formData.name}! Your enquiry regarding "${formData.subject}" has been logged in our Showroom Admin Desk (/admin) and our Bridal Concierge will reach out shortly.`,
      confirmText: 'Wonderful',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Bridal Jewellery Consultation',
      message: '',
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B58927] dark:text-[#D4AF37] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          ROYAL CONCIERGE DESK
        </span>
        <h1 className="mt-1 font-serif-luxury text-4xl sm:text-5xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
          Get in Touch With Us
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC]">
          Whether you are curating a complete South Indian bridal trousseau, tracking an order, or enquiring about bulk festive gifting, our specialists are delighted to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 p-6 sm:p-8 shadow-lg space-y-6">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1615] dark:text-[#F8F5EE]">
              Flagship Showroom & Support
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">Showroom Address</h3>
                  <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] mt-0.5 leading-relaxed">
                    Lucky Covering Heritage Emporium, No. 42, North Usman Road, T. Nagar, Chennai – 600017, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">Direct Concierge Line</h3>
                  <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] mt-0.5">
                    +91 98400 77889 / +91 44 2815 4499
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">Email Support</h3>
                  <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] mt-0.5">
                    concierge@luckycovering.com • bridal@luckycovering.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B58927] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1615] dark:text-[#F8F5EE]">Visiting Hours</h3>
                  <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] mt-0.5">
                    Monday – Sunday: 10:00 AM to 8:30 PM IST
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#C59B3E]/20 dark:border-[#D4AF37]/15">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B58927] dark:text-[#D4AF37] mb-3">
                Connect on Social Media
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, label: '@LuckyCoveringOfficial' },
                  { icon: Facebook, label: 'Lucky Covering Jewellery' },
                  { icon: Youtube, label: 'Lucky Bridal Lookbook' },
                ].map((soc) => (
                  <button
                    key={soc.label}
                    type="button"
                    onClick={() => showToast(`Opening ${soc.label}`)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C59B3E]/30 dark:border-[#D4AF37]/30 bg-[#FAF6F0] dark:bg-[#191C2B] text-[#1A1615] dark:text-[#F8F5EE] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <soc.icon className="w-4.5 h-4.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Enquiry Form with Custom Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#131521] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 p-6 sm:p-10 shadow-lg"
        >
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1A1615] dark:text-[#F8F5EE] mb-2">
            Send an Enquiry
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5248] dark:text-[#C4BCAC] mb-6">
            Fill out the form below and our jewellery stylist will respond within 2 business hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5248] dark:text-[#C4BCAC] mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ananya Sundaram"
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 px-4 py-3 text-sm text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5248] dark:text-[#C4BCAC] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ananya@example.com"
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 px-4 py-3 text-sm text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5248] dark:text-[#C4BCAC] mb-2">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98400 00000"
                  className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 px-4 py-3 text-sm text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5248] dark:text-[#C4BCAC] mb-2">
                  Enquiry Topic
                </label>
                <CustomDropdown
                  className="w-full"
                  buttonClassName="py-3 bg-[#FAF6F0] dark:bg-[#191C2B]"
                  options={ENQUIRY_TOPICS}
                  value={formData.subject}
                  onChange={(val) => setFormData({ ...formData, subject: val })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5248] dark:text-[#C4BCAC] mb-2">
                Your Message *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your wedding date, saree colour, or specific jewellery pieces you are looking for..."
                className="w-full rounded-xl bg-[#FAF6F0] dark:bg-[#191C2B] border border-[#C59B3E]/30 dark:border-[#D4AF37]/25 p-4 text-sm text-[#1A1615] dark:text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] px-8 py-3.5 text-sm font-bold text-[#090A0F] shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Royal Enquiry</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
