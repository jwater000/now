// src/components/sections/Books.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Book, ArrowRight } from 'lucide-react'
import { getAllBooks } from '@/lib/books'

export default function Books() {
  const allBooks = getAllBooks()
  // 메인 페이지에서는 최근 2개의 책만 표시
  const books = allBooks.slice(0, 2)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              저서
            </h2>
            <p className="text-lg text-gray-600">
              마음의 성장을 위한 안내서
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-1/3 min-h-[280px]">
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <Book className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="w-2/3 p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    {book.publishDate}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {book.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {book.description}
                  </p>
                  
                  <Link 
                    href={`/books/${book.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    자세히 보기
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              모든 저서 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}