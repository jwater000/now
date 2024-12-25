// src/components/sections/Blog.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog'

export default function Blog() {
  const allPosts = getAllBlogPosts()
  // 메인 페이지에서는 최근 3개의 포스트만 표시
  const blogPosts = allPosts.slice(0, 3)

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
              블로그
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              명상과 글쓰기에 대한 인사이트를 나눕니다
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-full">전체</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-full">명상</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-full">글쓰기</button>
              <button className="px-4 py-2 hover:bg-gray-100 rounded-full">웰빙</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
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
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              모든 글 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}