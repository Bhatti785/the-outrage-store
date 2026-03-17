'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Thank you for subscribing!')
      setEmail('')
    }
  }

  return (
    <section className="py-20 bg-charcoal-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold gold-text mb-4">
            Join the Elite
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to get exclusive access to new drops, special offers, and insider news
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-black border border-gold-400/30 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold-400 text-black font-semibold rounded-sm hover:bg-gold-500 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Subscribe
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates
          </p>
        </motion.div>
      </div>
    </section>
  )
}
