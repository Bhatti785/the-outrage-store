'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Truck, Star } from 'lucide-react'

export default function FreeDeliveryBanner() {
  const [orderCount, setOrderCount] = useState(0)

  useEffect(() => {
    // Simulate order count animation
    const targetCount = 1247
    const increment = Math.ceil(targetCount / 50)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= targetCount) {
        current = targetCount
        clearInterval(timer)
      }
      setOrderCount(current)
    }, 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold-400/10 via-gold-400/5 to-gold-400/10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold gold-text mb-4">
              Orders Above Rs. 5000
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers enjoying premium fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-lg p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-400/20 rounded-full">
                  <ShoppingCart size={32} className="text-gold-400" />
                </div>
              </div>
              <motion.div
                className="text-3xl font-bold text-gold-400 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                {orderCount.toLocaleString()}+
              </motion.div>
              <p className="text-gray-400">Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-lg p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-400/20 rounded-full">
                  <Truck size={32} className="text-gold-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gold-400 mb-2">
                FREE
              </div>
              <p className="text-gray-400">Delivery on Orders Above 5000</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-lg p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-400/20 rounded-full">
                  <Star size={32} className="text-gold-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gold-400 mb-2">
                4.9/5
              </div>
              <p className="text-gray-400">Customer Rating</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => window.location.href = '/products'}
              className="px-8 py-4 shimmer-btn text-black font-semibold rounded-sm text-lg"
            >
              Shop Now - Free Delivery
            </button>
            <button
              onClick={() => window.location.href = '/sale'}
              className="px-8 py-4 bg-transparent border-2 border-gold-400 text-gold-400 font-semibold rounded-sm text-lg hover:bg-gold-400 hover:text-black transition-all"
            >
              View Sale Items
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
