'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react'
import axios from 'axios'

interface Stats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  monthlySales: Array<{ _id: { year: number; month: number }; total: number; count: number }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
        const res = await axios.get(`${API_URL}/api/orders/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(res.data.stats)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400" />
      </div>
    )
  }

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'bg-blue-500/20 text-blue-400' },
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: Package, color: 'bg-green-500/20 text-green-400' },
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingCart, color: 'bg-purple-500/20 text-purple-400' },
    { label: 'Total Revenue', value: `$${(stats?.totalRevenue || 0).toFixed(2)}`, icon: DollarSign, color: 'bg-gold-400/20 text-gold-400' },
  ]

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold gold-text mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-lg p-6"
          >
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
              <card.icon size={24} />
            </div>
            <p className="text-gray-400 text-sm">{card.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Monthly Sales</h2>
        {stats?.monthlySales && stats.monthlySales.length > 0 ? (
          <div className="space-y-4">
            {stats.monthlySales.map((sale) => (
              <div key={`${sale._id.year}-${sale._id.month}`} className="flex items-center justify-between py-3 border-b border-gold-400/10">
                <span className="text-gray-400">
                  {new Date(sale._id.year, sale._id.month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <div className="flex items-center gap-8">
                  <span className="text-gray-400">{sale.count} orders</span>
                  <span className="text-gold-400 font-semibold">${sale.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No sales data available yet</p>
        )}
      </div>
    </div>
  )
}
