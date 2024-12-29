// src/lib/api/comments.ts
import { Comment, CommentCreateInput, CommentUpdateInput, ApiResponse } from '@/types/comment'

export async function getComments(postId: string): Promise<Comment[]> {
  const response = await fetch(`/api/comments?postId=${postId}`)
  const { data, error } = (await response.json()) as ApiResponse<Comment[]>

  if (!response.ok || error) {
    throw new Error(error || 'Failed to fetch comments')
  }

  return data || []
}

export async function createComment(input: CommentCreateInput): Promise<Comment> {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  const { data, error } = (await response.json()) as ApiResponse<Comment>

  if (!response.ok || error) {
    throw new Error(error || 'Failed to create comment')
  }

  return data!
}

export async function updateComment(id: string, input: CommentUpdateInput): Promise<Comment> {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  const { data, error } = (await response.json()) as ApiResponse<Comment>

  if (!response.ok || error) {
    throw new Error(error || 'Failed to update comment')
  }

  return data!
}

export async function deleteComment(id: string): Promise<void> {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  })

  const { error } = (await response.json()) as ApiResponse<null>

  if (!response.ok || error) {
    throw new Error(error || 'Failed to delete comment')
  }
}