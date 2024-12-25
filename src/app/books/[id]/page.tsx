// src/app/books/[id]/page.tsx
import { getBook } from '@/lib/books'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Book } from 'lucide-react'

export default function BookDetail({ params }: { params: { id: string } }) {
  const book = getBook(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로 돌아가기
          </Link>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Book className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Calendar className="w-4 h-4" />
                {book.publishDate}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{book.subtitle}</p>

              <div className="space-y-4 text-gray-600 mb-8">
                <p>출판사: {book.publisher}</p>
                <p>ISBN: {book.isbn}</p>
                <p>쪽수: {book.pages}쪽</p>
                <p>가격: {book.price}</p>
              </div>

              <p className="text-gray-600 mb-8">{book.description}</p>

              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                구매하기
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">목차</h2>
              <ul className="space-y-2 text-gray-600">
                {book.tableOfContents.map((chapter, index) => (
                  <li key={index}>{chapter}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">추천사</h2>
              <div className="space-y-6">
                {book.reviews.map((review, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">{review.content}</p>
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-gray-600">{review.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}