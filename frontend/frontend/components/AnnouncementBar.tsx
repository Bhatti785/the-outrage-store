'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Truck } from 'lucide-react'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [message, setMessage] = useState("Free Delivery on orders above Rs. 5000")

  useEffect(() => {
    const messages = [
      "Free Delivery on orders above Rs. 5000",
      "Premium Export Quality Fashion",
      "New Arrivals Every Week",
      "100% Authentic Products"
    ]
    
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % messages.length
      setMessage(messages[index])
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="relative bg-gradient-to-r from-gold-400/20 to-gold-400/10 border-b border-gold-400/30 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2 sm:py-3">
          <div className="flex items-center gap-2 text-gold-400">
            <Truck size={16} className="hidden sm:block" />
            <motion.p
              key={message}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-sm font-medium text-center"
            >
              {message}
            </motion.p>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gold-400/60 hover:text-gold-400 transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  )
}
