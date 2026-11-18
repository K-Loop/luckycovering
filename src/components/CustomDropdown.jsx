import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({
  options = [],
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  className = '',
  buttonClassName = '',
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full inline-flex items-center justify-between gap-2.5 rounded-xl bg-white dark:bg-[#131521] border border-[#C59B3E]/35 dark:border-[#D4AF37]/35 hover:border-[#D4AF37] px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#1A1615] dark:text-[#F8F5EE] shadow-sm transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${buttonClassName}`}
      >
        <span className="truncate">
          {label ? `${label}: ` : ''}
          <span className="font-semibold text-[#B58927] dark:text-[#D4AF37]">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 left-0 sm:left-auto sm:min-w-[220px] mt-2 z-50 rounded-2xl bg-[#FFFDF9] dark:bg-[#171A29] border border-[#C59B3E]/45 dark:border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(0,0,0,0.45)] overflow-hidden backdrop-blur-2xl"
          >
            <div className="p-1.5 max-h-64 overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#D4AF37]/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#E8C76A] via-[#D4AF37] to-[#B58927] text-[#090A0F] font-bold shadow-sm'
                        : 'text-[#1A1615] dark:text-[#F8F5EE] hover:bg-[#D4AF37]/15 hover:text-[#B58927] dark:hover:text-[#D4AF37]'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[2.5]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
