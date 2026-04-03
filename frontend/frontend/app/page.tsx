'use client'

import Hero from '@/components/Hero'
import FreeDeliveryBanner from '@/components/FreeDeliveryBanner'
import CategorySection from '@/components/CategorySection'
import NewArrivals from '@/components/NewArrivals'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <FreeDeliveryBanner />
      <Hero />
      <CategorySection />
      <NewArrivals />
      <Newsletter />
      <Footer />
    </>
  )
}
