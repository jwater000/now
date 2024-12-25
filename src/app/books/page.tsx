import Link from 'next/link'
import { getAllBooks } from '@/lib/books'
import { Book } from 'lucide-react'

export default function BooksPage() {
  const books = getAllBooks()

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            책 목록
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {books.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`}>
                <div className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Book className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{book.subtitle}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{book.publishDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}