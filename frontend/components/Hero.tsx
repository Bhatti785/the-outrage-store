'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, User } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image - Custom OUTRAGE Theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')] bg-cover bg-center bg-no-repeat opacity-20" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
        </div>
        
        {/* Gold accent particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
      </div>

      {/* Gold accent bars - Enhanced */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-10" />
      <div className="absolute top-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-10" />

      {/* Main content */}
      <div className="relative z-20 h-screen flex flex-col justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center -mt-16"
        >
          {/* Premium badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-2 text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase">
              <Star size={12} fill="#D4AF37" />
              <span>Premium Export Quality</span>
              <Star size={12} fill="#D4AF37" />
            </div>
          </motion.div>

          {/* OWN THE OUTRAGE - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center -mt-16"
          >
            <div className="flex flex-col items-center justify-center">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.85]"
              >
                OWN
              </motion.h1>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-serif text-white text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.85]"
              >
                THE
              </motion.h1>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="font-serif text-[#D4AF37] text-5xl md:text-6xl lg:text-7xl font-black tracking-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              >
                OUTRAGE
              </motion.h1>
            </div>
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-4 text-gray-300 text-sm md:text-base max-w-md text-center leading-relaxed drop-shadow-lg"
        >
          Own the outrage. Define your style. Premium export quality fashion.
        </motion.p>

        {/* Gender Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 flex gap-4"
        >
          <Link href="/products?category=men">
            <button className="px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-semibold text-sm tracking-wide hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2">
              <User size={18} />
              MEN
            </button>
          </Link>
          <Link href="/products?category=women">
            <button className="px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-semibold text-sm tracking-wide hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2">
              <User size={18} />
              WOMEN
            </button>
          </Link>
          <Link href="/products?category=kids">
            <button className="px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-semibold text-sm tracking-wide hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2">
              <User size={18} />
              KIDS
            </button>
          </Link>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/products">
            <button className="px-10 py-3 bg-[#D4AF37] text-black font-semibold text-sm tracking-wide hover:bg-[#C4A030] transition-colors drop-shadow-lg">
              SHOP NOW
            </button>
          </Link>
          <Link href="/sale">
            <button className="px-10 py-3 border border-[#D4AF37] text-[#D4AF37] font-semibold text-sm tracking-wide hover:bg-[#D4AF37] hover:text-black transition-all">
              VIEW SALE
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  )
}
