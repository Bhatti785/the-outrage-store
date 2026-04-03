'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, Banknote, Upload, X, Truck } from 'lucide-react'
import axios from 'axios'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    transactionId: '',
    paymentScreenshot: '' as string | null
  })

  const [loading, setLoading] = useState(false)
  const [shippingCost, setShippingCost] = useState(200)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setShippingCost(cartTotal > 5000 ? 0 : 200)
  }, [cartTotal])

  const bankDetails = {
    bankName: "HBL - Habib Bank Limited",
    accountTitle: "THE OUTRAGE STORE",
    accountNumber: "1234-5678-9012",
    iban: "PK36HBL0000001234567890"
  }

  // ✅ FIXED
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'products')

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
        data
      )

      setFormData(prev => ({
        ...prev,
        paymentScreenshot: response.data.secure_url
      }))

      toast.success('Screenshot uploaded successfully')
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  // ✅ FIXED
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast.error('Please login')
      router.push('/login')
      return
    }

    if (formData.paymentMethod === 'bank_transfer') {
      if (!formData.transactionId) {
        toast.error('Enter transaction ID')
        return
      }
      if (!formData.paymentScreenshot) {
        toast.error('Upload screenshot')
        return
      }
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL

      const orderData: any = {
        items: cart.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image
        })),
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: cartTotal + shippingCost
      }

      if (formData.paymentMethod === 'bank_transfer') {
        orderData.transactionId = formData.transactionId
        orderData.paymentScreenshot = formData.paymentScreenshot
      }

      await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Order placed successfully')
      clearCart()
      router.push('/orders')

    } catch (error) {
      toast.error('Order failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        <h1 className="text-white text-3xl mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <input placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <input placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <input placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />

          <input placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
          />

          <input type="file" onChange={handleImageUpload} />

          <button disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>

        </form>
      </div>
    </div>
  )
}
