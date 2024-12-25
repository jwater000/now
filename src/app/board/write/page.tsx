// src/app/board/write/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { createPost } from '@/lib/api/board'

interface FormData {
  type: string;
  relatedItem: string;
  title: string;
  content: string;
  verificationCode: string;
}

export default function WritePage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    type: 'program-review',
    relatedItem: '',
    title: '',
    content: '',
    verificationCode: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError('로그인이 필요합니다.')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      // 필수 필드 검증
      if (formData.title.trim() === '') {
        setError('제목을 입력해주세요.')
        return
      }

      if (formData.content.trim() === '') {
        setError('내용을 입력해주세요.')
        return
      }

      if ((formData.type === 'program-review' || formData.type === 'book-review') && !formData.verificationCode) {
        setError('인증 코드를 입력해주세요.')
        return
      }

      if ((formData.type.includes('program') || formData.type.includes('book')) && !formData.relatedItem) {
        setError(formData.type.includes('program') ? '프로그램을 선택해주세요.' : '도서를 선택해주세요.')
        return
      }

      const response = await createPost({
        ...formData,
        authorId: user.id,
        authorName: user.nickname
      })

      if (response.success) {
        router.push('/board')
      } else {
        setError(response.error || '게시글 작성에 실패했습니다.')
      }
    } catch (err) {
      setError('게시글 작성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/board"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            게시판으로 돌아가기
          </Link>

          <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">글쓰기</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 게시글 유형 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  게시글 유형
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value, relatedItem: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <optgroup label="소감">
                    <option value="program-review">프로그램 참여 후기</option>
                    <option value="book-review">도서 읽은 후기</option>
                  </optgroup>
                  <optgroup label="문의">
                    <option value="program-question">프로그램 관련 문의</option>
                    <option value="book-question">도서 관련 문의</option>
                    <option value="general-question">기타 문의</option>
                  </optgroup>
                </select>
              </div>

              {/* 관련 항목 선택 */}
              {(formData.type === 'program-review' || formData.type === 'program-question') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    관련 프로그램
                  </label>
                  <select
                    value={formData.relatedItem}
                    onChange={(e) => setFormData({ ...formData, relatedItem: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">프로그램을 선택하세요</option>
                    <option value="mindful-meditation">마음챙김 명상</option>
                    <option value="writing-therapy">치유의 글쓰기</option>
                  </select>
                </div>
              )}

              {(formData.type === 'book-review' || formData.type === 'book-question') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    관련 도서
                  </label>
                  <select
                    value={formData.relatedItem}
                    onChange={(e) => setFormData({ ...formData, relatedItem: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">도서를 선택하세요</option>
                    <option value="mindful-living">마음챙김의 시작</option>
                    <option value="writing-therapy">글쓰기로 치유하기</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  내용
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              {/* 인증 코드는 후기 작성시에만 표시 */}
              {(formData.type === 'program-review' || formData.type === 'book-review') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    인증 코드
                  </label>
                  <input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                    placeholder="프로그램 참여 또는 도서 구매 인증 코드를 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    * 인증 코드는 프로그램 참여자 또는 도서 구매자에게 제공됩니다
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gray-900 text-white rounded-lg transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? '작성 중...' : '작성 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}