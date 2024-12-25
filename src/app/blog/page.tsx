// src/app/blog/page.tsx
import { getAllBlogPosts } from '@/lib/blog'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">블로그</h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-full">전체</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-full">명상</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-full">글쓰기</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-full">웰빙</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">썸네일 이미지</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}