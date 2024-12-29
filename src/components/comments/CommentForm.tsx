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
      authorName: user.nickname,
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
        authorName: user.nickname
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

  // ... 나머지 렌더링 코드는 이전과 동일
};

// src/components/comments/CommentItem.tsx
'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useCommentStore } from '@/store/comment';
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

  // 낙관적 업데이트 중인 항목 스타일
  const itemClassName = `p-4 border-b ${isOptimistic ? 'opacity-70' : ''}`;

  // ... 나머지 렌더링 코드는 이전과 동일
};