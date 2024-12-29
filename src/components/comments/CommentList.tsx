// src/components/comments/CommentList.tsx
import { useEffect, useState } from 'react'
import { useCommentStore } from '@/store/comment'
import { getComments } from '@/lib/api/comment'
import CommentItem from './CommentItem'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CommentListProps {
  postId: string;
  currentUser: {
    id: string;
    name: string;
  } | null;
}

const COMMENTS_PER_PAGE = 5

export default function CommentList({ postId, currentUser }: CommentListProps) {
  const { comments, setComments, setLoading, setError } = useCommentStore()
  const [page, setPage] = useState(1)
  const [sortAscending, setSortAscending] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  // 댓글 정렬 함수
  const sortComments = (commentsToSort: Array<any>) => {
    return [...commentsToSort].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortAscending ? dateA - dateB : dateB - dateA
    })
  }

  // 댓글 로딩
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const data = await getComments(postId)
        setComments(sortComments(data))
        setHasMore(data.length >= COMMENTS_PER_PAGE)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
        setError('댓글을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [postId, setComments, setLoading, setError])

  // 정렬 순서 변경
  const toggleSort = () => {
    setSortAscending(!sortAscending)
    setComments(sortComments(comments))
  }

  // 더보기
  const loadMore = () => {
    setPage(prev => prev + 1)
    // 실제 구현에서는 여기서 페이지네이션된 데이터를 추가로 로드
    setHasMore(false) // 예시로 더 이상 데이터가 없다고 가정
  }

  const displayedComments = comments.slice(0, page * COMMENTS_PER_PAGE)

  if (!comments.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        첫 번째 댓글을 작성해보세요!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">
          총 {comments.length}개의 댓글
        </span>
        <button
          onClick={toggleSort}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
        >
          {sortAscending ? (
            <>
              오래된 순 <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              최신순 <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="divide-y">
        {displayedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
      </div>

      {hasMore && displayedComments.length < comments.length && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:border-gray-400 transition-colors"
          >
            더보기
          </button>
        </div>
      )}
    </div>
  )
}