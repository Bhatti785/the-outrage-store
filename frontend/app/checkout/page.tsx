'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, Banknote, Upload, X, Truck } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    transactionId: '',
    paymentScreenshot: null
  })
  const [loading, setLoading] = useState(false)
  const [shippingCost, setShippingCost] = useState(200)
  const [uploading, setUploading] = useState(false)

  // Calculate shipping cost
  useEffect(() => {
    if (cartTotal > 5000) {
      setShippingCost(0)
    } else {
      setShippingCost(200)
    }
  }, [cartTotal])

  // Bank details
  const bankDetails = {
    bankName: "HBL - Habib Bank Limited",
    accountTitle: "THE OUTRAGE STORE",
    accountNumber: "1234-5678-9012",
    iban: "PK36HBL0000001234567890"
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-8">Add some items to your cart before checkout</p>
          <button
            onClick={() => router.push('/products')}
            className="px-8 py-3 bg-gold-400 text-black font-semibold rounded-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'products') // Use your Cloudinary preset

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      setFormData({ ...formData, paymentScreenshot: response.data.secure_url })
      toast.success('Screenshot uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload screenshot')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to place an order')
      router.push('/login')
      return
    }

    // Validate bank transfer requirements
    if (formData.paymentMethod === 'bank_transfer') {
      if (!formData.transactionId) {
        toast.error('Please enter transaction ID')
        return
      }
      if (!formData.paymentScreenshot) {
        toast.error('Please upload payment screenshot')
        return
      }
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      
      const orderData = {
        items: cart.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: cartTotal + shippingCost
      }

      // Add transaction ID and screenshot for bank transfer
      if (formData.paymentMethod === 'bank_transfer') {
        orderData.transactionId = formData.transactionId
        orderData.paymentScreenshot = formData.paymentScreenshot
      }

      await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Order placed successfully!')
      clearCart()
      router.push('/orders')
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const paymentMethods = [
    { id: 'bank_transfer', name: 'Bank Transfer', icon: Building2, description: 'Transfer to our bank account' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' }
  ]

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl font-bold gold-text mb-8 text-center"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>

              <h3 className="text-lg font-semibold text-white mt-8 mb-4">Payment Method</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-gold-400 bg-gold-400/10'
                        : 'border-gold-400/20 hover:border-gold-400/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="text-gold-400"
                    />
                    <method.icon size={20} className="text-gold-400" />
                    <div>
                      <p className="text-white font-medium">{method.name}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Bank Transfer Details */}
              {formData.paymentMethod === 'bank_transfer' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="glass rounded-lg p-6 space-y-4"
                >
                  <h4 className="text-white font-semibold mb-4">Bank Transfer Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bank Name:</span>
                      <span className="text-white">{bankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Title:</span>
                      <span className="text-white">{bankDetails.accountTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Number:</span>
                      <span className="text-white">{bankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">IBAN:</span>
                      <span className="text-white">{bankDetails.iban}</span>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Transaction ID"
                    value={formData.transactionId}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />

                  <div>
                    <label className="text-white font-medium mb-2 block">Payment Screenshot</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="screenshot-upload"
                      />
                      <label
                        htmlFor="screenshot-upload"
                        className="flex items-center gap-2 px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm cursor-pointer hover:border-gold-400 transition-colors"
                      >
                        <Upload size={20} className="text-gold-400" />
                        <span className="text-white">
                          {uploading ? 'Uploading...' : 'Upload Payment Screenshot'}
                        </span>
                      </label>
                    </div>
                    {formData.paymentScreenshot && (
                      <div className="mt-2 relative">
                        <img
                          src={formData.paymentScreenshot}
                          alt="Payment screenshot"
                          className="w-32 h-32 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentScreenshot: null })}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 shimmer-btn text-black font-semibold rounded-sm disabled:opacity-50 mt-6"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gold-400 font-semibold">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gold-400/20 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                </div>
                {cartTotal > 5000 && (
                  <div className="flex justify-between text-green-400 text-sm">
                    <span>Free Delivery Applied</span>
                    <span>-$200</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-gold-400/20">
                  <span>Total</span>
                  <span className="text-gold-400">${cartTotal + shippingCost}</span>
                </div>
              </div>

              {cartTotal <= 5000 && (
                <div className="mt-4 p-3 bg-gold-400/10 border border-gold-400/30 rounded text-center">
                  <p className="text-gold-400 text-sm">
                    Add ${(5000 - cartTotal).toFixed(2)} more for FREE delivery!
                  </p>
                </div>
              )}

              {/* Free Delivery Info */}
              <div className="mt-4 p-3 bg-green-400/10 border border-green-400/30 rounded">
                <div className="flex items-center gap-2 text-green-400">
                  <Truck size={16} />
                  <span className="text-sm font-medium">Free Delivery on orders above Rs. 5000</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
