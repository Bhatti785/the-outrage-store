'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  salePrice?: number
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  category: string
  isNew: boolean
  isSale: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app'
        const res = await axios.get(`${API_URL}/api/products/${productId}`)
        setProduct(res.data.product)
        if (res.data.product.sizes?.length > 0) {
          setSelectedSize(res.data.product.sizes[0])
        }
        if (res.data.product.colors?.length > 0) {
          setSelectedColor(res.data.product.colors[0])
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return
    
    addToCart({
      product: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor
    })
    toast.success(`${product.name} added to cart`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-charcoal-900 h-96 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-charcoal-900 rounded w-3/4" />
              <div className="h-4 bg-charcoal-900 rounded w-1/4" />
              <div className="h-24 bg-charcoal-900 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products">
            <button className="px-6 py-3 bg-gold-400 text-black font-semibold rounded-sm">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const displayPrice = product.salePrice || product.price
  const hasDiscount = product.salePrice && product.salePrice < product.price

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
            Back to Products
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-lg overflow-hidden bg-charcoal-900"
          >
            <Image
              src={product.images[0] || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isSale && (
              <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                SALE
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 right-4 bg-gold-400 text-black px-3 py-1 rounded text-sm font-semibold">
                NEW
              </span>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="text-gold-400 text-sm uppercase tracking-widest">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-3xl font-bold text-gold-400">${displayPrice}</span>
                {hasDiscount && (
                  <span className="text-xl text-gray-500 line-through">${product.price}</span>
                )}
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed">{product.description}</p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div>
                <label className="text-white font-medium mb-3 block">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-sm transition-all ${
                        selectedSize === size
                          ? 'border-gold-400 bg-gold-400 text-black'
                          : 'border-gold-400/30 text-white hover:border-gold-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div>
                <label className="text-white font-medium mb-3 block">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-sm transition-all ${
                        selectedColor === color
                          ? 'border-gold-400 bg-gold-400 text-black'
                          : 'border-gold-400/30 text-white hover:border-gold-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-white font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gold-400/30 text-white rounded-sm hover:border-gold-400"
                >
                  -
                </button>
                <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border border-gold-400/30 text-white rounded-sm hover:border-gold-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-4 shimmer-btn text-black font-semibold rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
