// src/components/comments/CommentForm.tsx
'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useCommentStore } from '@/store/comment';
import { createComment } from '@/lib/api/comment';
import { ERROR_MESSAGES } from '@/lib/error';
import ErrorAlert from '@/components/common/ErrorAlert';

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated } = useAuthStore();
  const { addComment, unmarkOptimistic } = useCommentStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);

    // 낙관적 업데이트를 위한 임시 댓글
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      content: content.trim(),
      authorId: user.id,
      authorName: user.name,
      postId,
      createdAt: new Date().toISOString(),
    };

    // UI 즉시 업데이트
    addComment(optimisticComment);

    try {
      const newComment = await createComment({
        content: content.trim(),
        postId,
        authorId: user.id,
        authorName: user.name
      });
      
      // 성공 시 임시 ID 제거
      unmarkOptimistic(optimisticComment.id);
      setContent('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      setError(ERROR_MESSAGES.comment.CREATE_FAILED);
      // 실패 시 롤백
      const comments = useCommentStore.getState().comments;
      useCommentStore.setState({
        comments: comments.filter(c => c.id !== optimisticComment.id)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center text-gray-600 bg-gray-50 rounded-lg">
        댓글을 작성하려면 로그인이 필요합니다.
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '등록 중...' : '댓글 등록'}
          </button>
        </div>
      </form>
      {error && (
        <ErrorAlert 
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </>
  );
}

// src/components/comments/CommentItem.tsx
'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useCommentStore } from '@/store/comment';
import { Comment } from '@/types/comment';
import { updateComment as updateCommentAPI, deleteComment as deleteCommentAPI } from '@/lib/api/comment';
import { ERROR_MESSAGES } from '@/lib/error';
import ErrorAlert from '@/components/common/ErrorAlert';
import { Pencil, Trash2, X, Check } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();
  const { updateComment, deleteComment, unmarkOptimistic, rollbackDelete } = useCommentStore();

  const isOwner = user?.id === comment.authorId;
  const isOptimistic = useCommentStore((state) => 
    state.optimisticIds.has(comment.id)
  );

  const handleUpdate = async () => {
    if (!isOwner || editContent.trim() === '') return;
    
    setIsLoading(true);
    const originalContent = comment.content;

    // 낙관적 업데이트
    updateComment(comment.id, editContent.trim());

    try {
      await updateCommentAPI({
        id: comment.id,
        content: editContent.trim()
      });
      unmarkOptimistic(comment.id);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update comment:', error);
      setError(ERROR_MESSAGES.comment.UPDATE_FAILED);
      // 실패 시 롤백
      updateComment(comment.id, originalContent);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isOwner || !window.confirm('정말 삭제하시겠습니까?')) return;
    
    setIsLoading(true);
    const deletedComment = deleteComment(comment.id);

    try {
      await deleteCommentAPI(comment.id);
      unmarkOptimistic(comment.id);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      setError(ERROR_MESSAGES.comment.DELETE_FAILED);
      // 실패 시 롤백
      if (deletedComment) {
        rollbackDelete(deletedComment);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-4 border-b ${isOptimistic ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="font-medium">{comment.authorName}</span>
          <span className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        {isOwner && !isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
              disabled={isLoading}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            disabled={isLoading}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={handleUpdate}
              className="px-3 py-1 text-green-600 hover:text-green-800"
              disabled={isLoading}
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-2 whitespace-pre-wrap">{comment.content}</p>
      )}

      {error && (
        <ErrorAlert 
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}

// src/components/comments/CommentList.tsx
'use client';

import { useEffect } from 'react';
import { useCommentStore } from '@/store/comment';
import { getComments } from '@/lib/api/comment';
import CommentItem from './CommentItem';
import ErrorAlert from '@/components/common/ErrorAlert';

interface CommentListProps {
  postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
  const { 
    comments, 
    setComments, 
    setLoading, 
    error,
    setError 
  } = useCommentStore();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        setError(ERROR_MESSAGES.comment.FETCH_FAILED);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, setComments, setLoading, setError]);

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
        />
      ))}
      {error && (
        <ErrorAlert 
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}