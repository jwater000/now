'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { getPost, createComment, deletePost } from '@/lib/api/board'
import type { Post, Comment } from '@/types/board'
import { useRouter } from 'next/navigation' 
import CommentItem from '@/components/comments/CommentItem'


export default function BoardDetailPage({ params }: { params: { id: string } }) {
  const id = use(params).id
  const { user, isAuthenticated } = useAuthStore()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getPost(id)
        if (response.success && response.data) {
          setPost(response.data.post)
          setComments(response.data.comments)
        } else {
          setError(response.error || '게시글을 불러오는데 실패했습니다.')
        }
      } catch (err) {
        console.error('Page error:', err)
        setError('게시글을 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await deletePost(id)
      if (response.success) {
        router.push('/board')
      } else {
        alert(response.error || '게시글 삭제에 실패했습니다.')
      }
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.')
    } finally {
      setShowDeleteModal(false)
    }
  }

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
    const categories: { [key: string]: string } = {
      'program-review': '프로그램 후기',
      'book-review': '도서 후기',
      'program-question': '프로그램 문의',
      'book-question': '도서 문의',
      'general-question': '기타 문의'
    }
    return categories[type] || type
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsSubmitting(true)
      const response = await createComment(id, {
        content: comment,
        authorId: user.id,
        authorName: user.nickname
      })

      if (response.success && response.data) {
        setComments(prev => [...prev, response.data as Comment])
        setComment('')
      } else {
        alert('댓글 작성에 실패했습니다.')
      }
    } catch (err) {
      alert('댓글 작성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600">게시글을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-red-600">{error || '게시글을 찾을 수 없습니다.'}</p>
            <Link
              href="/board"
              className="inline-block mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg"
            >
              게시판으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/board"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            게시판으로 돌아가기
          </Link>

          <div className="bg-white rounded-lg p-8">
            {/* 게시글 헤더 */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                <span className={`px-2 py-1 rounded ${getCategoryStyle(post.type)}`}>
                  {getCategoryName(post.type)}
                </span>
                <span>작성일: {post.createdAt}</span>
                <span>작성자: {post.authorName}</span>
                {post.relatedItem && (
                  <span>
                    {post.type.includes('program') ? '프로그램: ' : '도서: '}
                    {post.relatedItem}
                  </span>
                )}
                {post.verificationStatus && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    인증완료
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {post.title}
              </h1>
            </div>

            {/* 게시글 본문 */}
            <div className="prose max-w-none mb-12 whitespace-pre-wrap">
              {post.content}
            </div>

            {/* 수정/삭제 버튼 추가 */}
            {user && user.id === post.authorId && (
              <div className="flex gap-2 mb-8">
                <Link
                  href={`/board/edit/${post.id}`}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                >
                  삭제
                </button>
              </div>
            )}

            {/* 댓글 섹션 */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                댓글 ({comments.length})
              </h2>

              {/* 댓글 목록 */}
              <div className="space-y-6 mb-8">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    postId={id}
                    onDelete={(commentId: string) => {
                      setComments(comments.filter(c => c.id !== commentId))
                    }}
                    onUpdate={(commentId: string, newContent: string) => {
                      setComments(comments.map(c =>
                        c.id === commentId
                          ? { ...c, content: newContent, isEdited: true }
                          : c
                      ))
                    }}
                  />
                ))}
                {comments.length === 0 && (
                  <p className="text-center text-gray-500">
                    아직 댓글이 없습니다.
                  </p>
                )}
              </div>

              {/* 댓글 작성 폼 */}
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="댓글을 작성하세요"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 bg-gray-900 text-white rounded-lg transition-colors ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                      }`}
                    >
                      {isSubmitting ? '작성 중...' : '댓글 작성'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 mb-2">
                    댓글을 작성하려면 로그인이 필요합니다
                  </p>
                  <Link
                    href="/board"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    로그인하러 가기
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-4">게시글 삭제</h3>
            <p className="text-gray-600 mb-6">
              정말로 이 게시글을 삭제하시겠습니까?
              <br />
              삭제된 게시글은 복구할 수 없습니다.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}