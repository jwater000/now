// src/components/comments/CommentItem.tsx
import { useState } from 'react'
import { Comment } from '@/types/board'
import { useAuthStore } from '@/store/auth'
import { updateComment, deleteComment } from '@/lib/api/board'

interface CommentItemProps {
  comment: Comment
  postId: string
  onDelete: (commentId: string) => void
  onUpdate: (commentId: string, newContent: string) => void
}

export default function CommentItem({
  comment,
  postId,
  onDelete,
  onUpdate
}: CommentItemProps) {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = async () => {
    if (!user) return

    try {
      const response = await updateComment(postId, comment.id, {
        content: editedContent,
        authorId: user.id
      })

      if (response.success) {
        onUpdate(comment.id, editedContent)
        setIsEditing(false)
      } else {
        alert(response.error || '댓글 수정에 실패했습니다.')
      }
    } catch (err) {
      alert('댓글 수정에 실패했습니다.')
    }
  }

  const handleDelete = async () => {
    if (!user) return
    if (!window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) return

    try {
      setIsDeleting(true)
      const response = await deleteComment(postId, comment.id, user.id)
      
      if (response.success) {
        onDelete(comment.id)
      } else {
        alert(response.error || '댓글 삭제에 실패했습니다.')
      }
    } catch (err) {
      alert('댓글 삭제에 실패했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span className="font-medium">{comment.authorName}</span>
        <div className="flex items-center gap-2">
          <span>{comment.createdAt}</span>
          {comment.isEdited && (
            <span className="text-gray-500">(수정됨)</span>
          )}
          {user && user.id === comment.authorId && !isEditing && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700"
              >
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-700"
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              취소
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">{comment.content}</p>
      )}
    </div>
  )
}