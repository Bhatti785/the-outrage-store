'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  price: number
  oldPrice: number
  images: string[]
  isNew: boolean
  isSale: boolean
  category: string
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart, setIsCartOpen } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app/api'
        const res = await axios.get(`${API_URL}/api/products?isNew=true&limit=8`)
        setProducts(res.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

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

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-charcoal-800 h-64 rounded-lg" />
                <div className="mt-4 h-4 bg-charcoal-800 rounded w-3/4" />
                <div className="mt-2 h-4 bg-charcoal-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm uppercase tracking-widest">Fresh Drops</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-2 mb-4">New Arrivals</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover our latest premium export leftover fashion pieces</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  
                  {product.isSale && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-3 right-3 bg-gold-400 text-black text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-3 bg-gold-400 text-black rounded-full hover:bg-gold-500 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <ShoppingCart size={20} />
                    </button>
                    <Link href={`/products/${product._id}`}>
                      <button className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                        <Eye size={20} />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-white text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gold-400 font-semibold">${product.price}</span>
                    {product.oldPrice > 0 && (
                      <span className="text-gray-500 text-sm line-through">${product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <button className="px-8 py-3 border border-gold-400 text-gold-400 font-semibold rounded-sm hover:bg-gold-400 hover:text-black transition-all">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
