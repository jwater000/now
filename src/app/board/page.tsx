// src/app/board/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth'
import KakaoLogin from '@/components/auth/KakaoLogin'
import { getPosts } from '@/lib/api/board'
import type { Post } from '@/types/board'

const CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'program-review', name: '프로그램 후기' },
  { id: 'book-review', name: '도서 후기' },
  { id: 'program-question', name: '프로그램 문의' },
  { id: 'book-question', name: '도서 문의' },
  { id: 'general-question', name: '기타 문의' }
]

export default function BoardPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getPosts(selectedCategory)
        if (response.success && response.data) {
          setPosts(response.data)
        } else {
          setError(response.error || '게시글을 불러오는데 실패했습니다.')
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('게시글 목록을 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [selectedCategory])

  const getCategoryStyle = (type: string) => {
    switch(type) {
      case 'program-review':
        return 'bg-blue-100 text-blue-700'
      case 'book-review':
        return 'bg-green-100 text-green-700'
      case 'program-question':
        return 'bg-purple-100 text-purple-700'
      case 'book-question':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryName = (type: string) => {
    const category = CATEGORIES.find(cat => cat.id === type)
    return category ? category.name : type
  }

  if (error) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">게시판</h1>
            {isAuthenticated ? (
              <Link
                href="/board/write"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                글쓰기
              </Link>
            ) : (
              <div className="w-64">
                <KakaoLogin />
              </div>
            )}
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* 게시글 목록 */}
          <div className="bg-white rounded-lg shadow">
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">게시글을 불러오는 중...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">게시글이 없습니다.</p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <Link href={`/board/${post.id}`} className="block p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <span className={`px-2 py-1 rounded ${getCategoryStyle(post.type)}`}>
                        {getCategoryName(post.type)}
                      </span>
                      <span>{post.createdAt}</span>
                      <span>작성자: {post.authorName}</span>
                      {post.verificationStatus && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          인증완료
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {post.content}
                    </p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}