'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  LogOut, Menu, X, ChevronRight 
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400" />
      </div>
    )
  }

  const menuItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/admin/users', icon: Users, label: 'Users' },
  ]

  return (
    <div className="min-h-screen bg-black flex">
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-charcoal-900 border-r border-gold-400/20 transition-transform`}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold gold-text">Admin Panel</span>
          </Link>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gold-400 hover:bg-gold-400/10 rounded-lg transition-all"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gold-400 w-full rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span>Exit Admin</span>
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass sticky top-0 z-40 px-4 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Welcome, {user.name}</span>
            <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center text-black font-semibold">
              {user.name[0]}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
