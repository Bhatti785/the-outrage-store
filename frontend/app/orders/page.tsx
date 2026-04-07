'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

interface Order {
  _id: string
  items: {
    product: {
      _id: string
      name: string
      images: string[]
    }
    quantity: number
    price: number
    name: string
    image: string
  }[]
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  totalAmount: number
  createdAt: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
        
        const res = await axios.get(`${API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setOrders(res.data.orders)
      } catch (error) {
        console.error('Error fetching orders:', error)
        toast.error('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [user])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-400" size={20} />
      case 'processing':
        return <Clock className="text-yellow-400" size={20} />
      case 'cancelled':
        return <XCircle className="text-red-400" size={20} />
      default:
        return <Package className="text-gold-400" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-400/10 text-green-400 border-green-400/30'
      case 'processing':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30'
      case 'cancelled':
        return 'bg-red-400/10 text-red-400 border-red-400/30'
      default:
        return 'bg-gold-400/10 text-gold-400 border-gold-400/30'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please Login</h1>
          <p className="text-gray-400 mb-8">You need to login to view your orders</p>
          <Link href="/login">
            <button className="px-8 py-3 bg-gold-400 text-black font-semibold rounded-sm">
              Login
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-charcoal-900 h-32 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/products">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-serif text-4xl font-bold gold-text mb-4">My Orders</h1>
          <p className="text-gray-400">Track and manage your orders</p>
        </motion.div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={64} className="text-gold-400/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Orders Yet</h2>
            <p className="text-gray-400 mb-8">You haven't placed any orders yet</p>
            <Link href="/products">
              <button className="px-8 py-3 bg-gold-400 text-black font-semibold rounded-sm">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gold-400/10">
                  <div>
                    <p className="text-sm text-gray-400">Order ID</p>
                    <p className="text-white font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Order Date</p>
                    <p className="text-white">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="text-gold-400 font-bold">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded border ${getStatusColor(order.orderStatus)}`}>
                    {getStatusIcon(order.orderStatus)}
                    <span className="font-medium capitalize">{order.orderStatus}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-lg bg-charcoal-900 overflow-hidden">
                        <img
                          src={item.image || '/placeholder.png'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-gold-400 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gold-400/10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Payment Method</p>
                      <p className="text-white capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Payment Status</p>
                      <p className={`font-medium capitalize ${order.paymentStatus === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {order.paymentStatus}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Shipping to</p>
                      <p className="text-white">{order.shippingAddress.fullName}</p>
                      <p className="text-gray-400 text-sm">{order.shippingAddress.city}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
