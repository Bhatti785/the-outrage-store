'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash, Search } from 'lucide-react'
import axios from 'axios'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  price: number
  stock: number
  category: string
  images: string[]
  isNew: boolean
  isSale: boolean
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
      const res = await axios.get(`${API_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(res.data.products)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-serif text-3xl font-bold gold-text">Products</h1>
        <button className="px-4 py-2 bg-gold-400 text-black font-semibold rounded-sm hover:bg-gold-500 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="glass rounded-lg p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-charcoal-800 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      <div className="glass rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-charcoal-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-400/10">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-charcoal-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded overflow-hidden">
                        <Image
                          src={product.images[0] || '/placeholder.png'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 capitalize">{product.category}</td>
                  <td className="px-6 py-4 text-gold-400">${product.price}</td>
                  <td className="px-6 py-4 text-gray-400">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {product.isNew && (
                        <span className="px-2 py-1 bg-gold-400/20 text-gold-400 text-xs rounded">New</span>
                      )}
                      {product.isSale && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Sale</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gold-400 hover:bg-gold-400/10 rounded transition-colors">
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 py-8">No products found</p>
        )}
      </div>
    </div>
  )
}
