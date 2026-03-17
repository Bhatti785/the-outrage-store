'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800',
    href: '/products?category=men',
    description: 'Sophisticated styles for the modern man'
  },
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    href: '/products?category=women',
    description: 'Elegant fashion for every occasion'
  },
  {
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800',
    href: '/products?category=kids',
    description: 'Comfortable and stylish for little ones'
  }
]

export default function CategorySection() {
  return (
    <section className="py-20 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold gold-text mb-4">Shop by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore our curated collections for every style</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={category.href}>
                <div className="group relative h-96 overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="font-serif text-3xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-gray-300 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      {category.description}
                    </p>
                    <div className="mt-4 w-12 h-0.5 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
