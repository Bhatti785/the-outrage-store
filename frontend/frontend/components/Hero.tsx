'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, User } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80" />
      </div>

      {/* Gold accent bars */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37] z-10" />
      <div className="absolute top-1 left-0 right-0 h-0.5 bg-[#D4AF37]/50 z-10" />

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

          {/* OWN THE - White */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-white text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-[0.85] drop-shadow-2xl"
          >
            OWN
          </motion.h1>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-white text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-[0.85] drop-shadow-2xl"
          >
            THE
          </motion.h1>
          
          {/* OUTRAGE - Gold */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-serif text-[#D4AF37] text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-[0.85] drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            OUTRAGE
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-4 text-gray-300 text-sm md:text-base max-w-md text-center leading-relaxed drop-shadow-lg"
        >
          Luxury fashion at accessible prices. Authentic export quality pieces, curated for the discerning.
        </motion.p>

        {/* Gender Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 flex gap-4"
        >
          <Link href="/products?category=men">
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold text-sm tracking-wide hover:bg-white hover:text-black transition-all flex items-center gap-2">
              <User size={18} />
              MEN
            </button>
          </Link>
          <Link href="/products?category=women">
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold text-sm tracking-wide hover:bg-white hover:text-black transition-all flex items-center gap-2">
              <User size={18} />
              WOMEN
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
