'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface ProductFormData {
  name: string
  price: number
  stock: number
  category: string
  brand: string
  color: string[]
  size: string[]
  description: string
  images: string[]
  isNew: boolean
  isSale: boolean
}

export default function AddProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    stock: 0,
    category: 'men',
    brand: '',
    color: [],
    size: [],
    description: '',
    images: [],
    isNew: false,
    isSale: false
  })

  const [newColor, setNewColor] = useState('')
  const [newSize, setNewSize] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([''])

  const categories = ['men', 'women', 'kids']
  const availableColors = [
    'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 
    'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'Navy'
  ]
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price || !formData.stock || !formData.brand) {
      toast.error('Please fill all required fields')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://the-outrage-store-production.up.railway.app/api'
      
      const productData = {
        ...formData,
        images: imageUrls.filter(url => url.trim() !== '')
      }

      await axios.post(`${API_URL}/products`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Product added successfully!')
      router.push('/admin/products')
    } catch (error) {
      toast.error('Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  const addColor = () => {
    if (newColor && !formData.color.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        color: [...prev.color, newColor]
      }))
      setNewColor('')
    }
  }

  const removeColor = (colorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      color: prev.color.filter(color => color !== colorToRemove)
    }))
  }

  const addSize = () => {
    if (newSize && !formData.size.includes(newSize)) {
      setFormData(prev => ({
        ...prev,
        size: [...prev.size, newSize]
      }))
      setNewSize('')
    }
  }

  const removeSize = (sizeToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      size: prev.size.filter(size => size !== sizeToRemove)
    }))
  }

  const addImageUrl = () => {
    setImageUrls(prev => [...prev, ''])
  }

  const updateImageUrl = (index: number, value: string) => {
    setImageUrls(prev => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const removeImageUrl = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gold-400 hover:bg-gold-400/10 rounded transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="font-serif text-3xl font-bold gold-text">Add New Product</h1>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  placeholder="Enter brand name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white focus:outline-none focus:border-gold-400"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-charcoal-900">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  placeholder="Enter product description"
                />
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Colors
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <select
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="px-3 py-2 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="">Select color</option>
                    {availableColors.map(color => (
                      <option key={color} value={color} className="bg-charcoal-900">
                        {color}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addColor}
                    className="px-3 py-2 bg-gold-400 text-black font-semibold rounded-sm hover:bg-gold-500 transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.color.map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gold-400/20 text-gold-400 text-sm rounded-full flex items-center gap-2"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="text-gold-400 hover:text-gold-300"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Sizes
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <select
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="px-3 py-2 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white focus:outline-none focus:border-gold-400"
                  >
                    <option value="">Select size</option>
                    {availableSizes.map(size => (
                      <option key={size} value={size} className="bg-charcoal-900">
                        {size}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addSize}
                    className="px-3 py-2 bg-gold-400 text-black font-semibold rounded-sm hover:bg-gold-500 transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.size.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gold-400/20 text-gold-400 text-sm rounded-full flex items-center gap-2"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="text-gold-400 hover:text-gold-300"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Product Images
              </label>
              <div className="space-y-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-charcoal-900 border border-gold-400/20 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                      placeholder="Enter image URL"
                    />
                    {imageUrls.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageUrl(index)}
                        className="p-3 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="px-4 py-2 bg-gold-400 text-black font-semibold rounded-sm hover:bg-gold-500 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Image URL
                </button>
              </div>
            </div>

            {/* Status Options */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
                  className="rounded border-gold-400/20 bg-charcoal-900 text-gold-400 focus:ring-gold-400"
                />
                <span className="text-sm">Mark as New</span>
              </label>

              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={formData.isSale}
                  onChange={(e) => setFormData(prev => ({ ...prev, isSale: e.target.checked }))}
                  className="rounded border-gold-400/20 bg-charcoal-900 text-gold-400 focus:ring-gold-400"
                />
                <span className="text-sm">Put on Sale</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="px-6 py-3 bg-transparent border border-gold-400 text-gold-400 font-semibold rounded-sm hover:bg-gold-400/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gold-400 text-black font-semibold rounded-sm hover:bg-gold-500 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black" />
                ) : (
                  <Save size={20} />
                )}
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
