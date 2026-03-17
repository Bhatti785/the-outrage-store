import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import AnimatedBackground from '@/components/AnimatedBackground'
import AnnouncementBar from '@/components/AnnouncementBar'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'THE OUTRAGE - Premium Export Leftover Fashion',
  description: 'Discover premium export leftover fashion at unbeatable prices. Shop men, women, and kids collections.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-black text-white relative">
        <AnimatedBackground />
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <CartDrawer />
            <main className="relative z-10">{children}</main>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#1A1A1A',
                  color: '#fff',
                  border: '1px solid #D4AF37',
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
