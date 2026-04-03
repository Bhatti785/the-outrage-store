'use client'

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gold-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-2xl font-bold gold-text mb-4">THE OUTRAGE</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium export leftover fashion at unbeatable prices. Quality meets affordability in every piece.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 bg-charcoal-800 rounded-full text-gray-400 hover:text-gold-400 hover:bg-charcoal-700 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-charcoal-800 rounded-full text-gray-400 hover:text-gold-400 hover:bg-charcoal-700 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-charcoal-800 rounded-full text-gray-400 hover:text-gold-400 hover:bg-charcoal-700 transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/products?category=men" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">Men</Link></li>
              <li><Link href="/products?category=women" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">Women</Link></li>
              <li><Link href="/products?category=kids" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">Kids</Link></li>
              <li><Link href="/sale" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-gold-400 transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-gold-400" />
                support@theoutrage.com
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-gold-400" />
                +92 300 1234567
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-gold-400 mt-0.5" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-400/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} THE OUTRAGE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-gold-400 transition-colors text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-gold-400 transition-colors text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
