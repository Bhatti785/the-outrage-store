'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Percent } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  salePrice: number
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  category: string
  isNew: boolean
  isSale: boolean
}

export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
        const res = await axios.get(`${API_URL}/api/products?isSale=true`)
        setProducts(res.data.products)
      } catch (error) {
        console.error('Error fetching sale products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSaleProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart({
      product: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.images[0]
    })
    toast.success(`${product.name} added to cart`)
  }

  const calculateDiscount = (price: number, salePrice: number) => {
    return Math.round(((price - salePrice) / price) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-charcoal-900 h-64 rounded-lg" />
                <div className="mt-4 h-4 bg-charcoal-900 rounded w-3/4" />
                <div className="mt-2 h-4 bg-charcoal-900 rounded w-1/2" />
              </div>
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
        <Link href="/">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full mb-4">
            <Percent size={20} />
            <span className="font-semibold">SALE</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Flash Sale</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Grab these amazing deals before they're gone! Limited time offers on premium export quality fashion.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <Percent size={64} className="text-gold-400/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Sale Items</h2>
            <p className="text-gray-400 mb-8">Check back later for amazing deals!</p>
            <Link href="/products">
              <button className="px-8 py-3 bg-gold-400 text-black font-semibold rounded-sm">
                Browse All Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg bg-charcoal-900">
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={product.images[0] || '/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded font-bold">
                      -{calculateDiscount(product.price, product.salePrice)}%
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-3 bg-gold-400 text-black rounded-full hover:bg-gold-500 transition-colors"
                      >
                        <ShoppingCart size={20} />
                      </button>
                      <Link href={`/products/${product._id}`}>
                        <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium">
                          View
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-white text-sm truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gold-400 font-semibold">${product.salePrice}</span>
                      <span className="text-gray-500 text-sm line-through">${product.price}</span>
                    </div>
                    <p className="text-green-400 text-xs mt-1">
                      Save ${(product.price - product.salePrice).toFixed(2)}
                    </p>
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
