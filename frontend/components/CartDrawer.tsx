'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useCart()

  // Calculate shipping cost
  const shippingCost = cartTotal > 5000 ? 0 : 200
  const totalAmount = cartTotal + shippingCost

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-charcoal-900 z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
                <h2 className="font-serif text-xl font-semibold gold-text">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ShoppingBag size={48} className="mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-gold-400 hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.product}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex gap-4 p-4 bg-charcoal-800 rounded-lg"
                      >
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || '/placeholder.png'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white text-sm">{item.name}</h3>
                          <p className="text-gold-400 text-sm">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-white"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-white"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product)}
                              className="p-1 text-red-400 hover:text-red-300 ml-auto"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gold-400/20">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-semibold text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-400">Shipping</span>
                    <span className={`font-semibold ${shippingCost === 0 ? 'text-green-400' : 'text-white'}`}>
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {cartTotal > 5000 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-green-400 text-sm">Free Delivery Applied</span>
                      <span className="text-green-400 text-sm">-$200</span>
                    </div>
                  )}
                  <div className="flex justify-between mb-4 pt-2 border-t border-gold-400/20">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold gold-text text-lg">${totalAmount.toFixed(2)}</span>
                  </div>
                  {cartTotal <= 5000 && (
                    <div className="mb-4 p-2 bg-gold-400/10 border border-gold-400/30 rounded text-center">
                      <p className="text-gold-400 text-xs">
                        Add ${(5000 - cartTotal).toFixed(2)} more for FREE delivery!
                      </p>
                    </div>
                  )}
                  <Link href="/checkout">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full shimmer-btn py-3 text-black font-semibold rounded-sm"
                    >
                      Checkout
                    </button>
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full mt-2 py-3 border border-gold-400 text-gold-400 font-semibold rounded-sm hover:bg-gold-400 hover:text-black transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
