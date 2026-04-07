'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Eye, CreditCard, MapPin } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Order {
  _id: string
  user: { name: string; email: string }
  totalAmount: number
  orderStatus: string
  paymentStatus: string
  paymentMethod: string
  transactionId?: string
  paymentScreenshot?: string
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  items: {
    name: string
    quantity: number
    price: number
    image: string
  }[]
  createdAt: string
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
      const res = await axios.get(`${API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setOrders(res.data.orders)
    } catch (error) {
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
      await axios.put(`${API_URL}/api/orders/${id}/status`, { orderStatus: status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Order status updated')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const updatePaymentStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
      await axios.put(`${API_URL}/api/orders/${id}/payment`, { paymentStatus: status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Payment status updated')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update payment status')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      confirmed: 'bg-blue-500/20 text-blue-400',
      shipped: 'bg-purple-500/20 text-purple-400',
      delivered: 'bg-green-500/20 text-green-400',
      cancelled: 'bg-red-500/20 text-red-400'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400'
  }

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-yellow-500/20 text-yellow-400',
      Paid: 'bg-green-500/20 text-green-400',
      Rejected: 'bg-red-500/20 text-red-400'
    }
    return colors[status] || 'bg-gray-500/20 text-gray-400'
  }

  const filteredOrders = filter 
    ? orders.filter(o => o.orderStatus === filter)
    : orders

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold gold-text mb-8">Orders</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white focus:outline-none focus:border-gold-400"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="glass rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-charcoal-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-400/10">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-charcoal-800/50"
                >
                  <td className="px-6 py-4 text-white font-medium">#{order._id.slice(-6)}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white">{order.user?.name}</p>
                      <p className="text-gray-400 text-sm">{order.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gold-400">${order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`px-2 py-1 rounded text-xs block ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                      {order.transactionId && (
                        <p className="text-xs text-gray-400">ID: {order.transactionId}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gold-400 hover:bg-gold-400/10 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-400 py-8">No orders found</p>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MapPin size={20} />
                  Customer Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white ml-2">{selectedOrder.shippingAddress.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white ml-2">{selectedOrder.user.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white ml-2">{selectedOrder.shippingAddress.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Address:</span>
                    <span className="text-white ml-2">{selectedOrder.shippingAddress.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">City:</span>
                    <span className="text-white ml-2">{selectedOrder.shippingAddress.city}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CreditCard size={20} />
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Method:</span>
                    <span className="text-white ml-2 capitalize">{selectedOrder.paymentMethod.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                  {selectedOrder.transactionId && (
                    <div>
                      <span className="text-gray-400">Transaction ID:</span>
                      <span className="text-white ml-2">{selectedOrder.transactionId}</span>
                    </div>
                  )}
                  {selectedOrder.paymentScreenshot && (
                    <div>
                      <span className="text-gray-400 block mb-2">Payment Screenshot:</span>
                      <img
                        src={selectedOrder.paymentScreenshot}
                        alt="Payment screenshot"
                        className="w-32 h-32 object-cover rounded border border-gold-400/20"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Status Update */}
                <div className="pt-4 border-t border-gold-400/20">
                  <label className="text-white text-sm mb-2 block">Update Payment Status:</label>
                  <select
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => {
                      updatePaymentStatus(selectedOrder._id, e.target.value)
                      setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value })
                    }}
                    className="w-full px-3 py-2 bg-charcoal-800 border border-gold-400/20 rounded text-white text-sm focus:outline-none focus:border-gold-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-6 pt-6 border-t border-gold-400/20">
              <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-charcoal-800/50 rounded">
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
            </div>

            {/* Order Status Update */}
            <div className="mt-6 pt-6 border-t border-gold-400/20">
              <label className="text-white text-sm mb-2 block">Update Order Status:</label>
              <select
                value={selectedOrder.orderStatus}
                onChange={(e) => {
                  updateStatus(selectedOrder._id, e.target.value)
                  setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })
                }}
                className="w-full px-3 py-2 bg-charcoal-800 border border-gold-400/20 rounded text-white text-sm focus:outline-none focus:border-gold-400"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
