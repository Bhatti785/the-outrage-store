'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Filter, ChevronDown } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  price: number
  oldPrice: number
  images: string[]
  category: string
  isNew: boolean
  isSale: boolean
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const isSale = searchParams.get('isSale')
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: category || '',
    minPrice: '',
    maxPrice: '',
    isSale: isSale === 'true'
  })
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.isSale) params.append('isSale', 'true')
      
      const res = await axios.get(`${API_URL}/api/products?${params}`)
      setProducts(res.data.products)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0]
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-4xl font-bold gold-text">
            {filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Collection` : 'All Products'}
          </h1>
          <p className="text-gray-400 mt-2">{products.length} products found</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="glass rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-gold-400" />
                <h3 className="font-semibold text-white">Filters</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 bg-charcoal-800 border border-gold-400/20 rounded-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="">All Categories</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-1/2 px-3 py-2 bg-charcoal-800 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-1/2 px-3 py-2 bg-charcoal-800 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.isSale}
                    onChange={(e) => setFilters({ ...filters, isSale: e.target.checked })}
                    className="w-4 h-4 accent-gold-400"
                  />
                  <span className="text-gray-400">On Sale Only</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-charcoal-800 h-64 rounded-lg" />
                    <div className="mt-4 h-4 bg-charcoal-800 rounded w-3/4" />
                    <div className="mt-2 h-4 bg-charcoal-800 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-charcoal-900">
                      <Link href={`/products/${product._id}`}>
                        <div className="relative h-64">
                          <Image
                            src={product.images[0] || '/placeholder.png'}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {product.isSale && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</span>
                          )}
                          {product.isNew && (
                            <span className="absolute top-3 right-3 bg-gold-400 text-black text-xs px-2 py-1 rounded">NEW</span>
                          )}
                        </div>
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="absolute bottom-4 right-4 p-3 bg-gold-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-white font-medium truncate">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gold-400 font-semibold">${product.price}</span>
                        {product.oldPrice > 0 && (
                          <span className="text-gray-500 text-sm line-through">${product.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No products found</p>
                <button
                  onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', isSale: false })}
                  className="mt-4 text-gold-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-400" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
