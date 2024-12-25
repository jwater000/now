// src/lib/api/board.ts
import type { Post, Comment, ApiResponse } from '@/types/board'

export async function getPosts(type?: string): Promise<ApiResponse<Post[]>> {
  const url = type && type !== 'all' 
    ? `/api/board?type=${type}`
    : '/api/board'
  
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export async function getPost(id: string): Promise<ApiResponse<{ post: Post; comments: Comment[] }>> {
  const response = await fetch(`/api/board/${id}`)
  const data = await response.json()
  return data
}

export async function createPost(postData: Omit<Post, 'id' | 'createdAt'>): Promise<ApiResponse<Post>> {
  const response = await fetch('/api/board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  const data = await response.json()
  return data
}

export async function createComment(
  id: string,
  data: { content: string; authorId: string; authorName: string }
): Promise<ApiResponse<Comment>> {
  const response = await fetch(`/api/board/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

// 게시글 수정
export async function updatePost(
    id: string,
    updateData: Partial<Post>
  ): Promise<ApiResponse<Post>> {
    const response = await fetch(`/api/board/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
    return response.json()
  }
  
  // 게시글 삭제
  export async function deletePost(id: string): Promise<ApiResponse<null>> {
    const response = await fetch(`/api/board/${id}`, {
      method: 'DELETE',
    })
    return response.json()
  }

  // src/lib/api/board.ts에 추가
export async function updateComment(
  postId: string,
  commentId: string,
  data: { content: string; authorId: string }
): Promise<ApiResponse<Comment>> {
  const response = await fetch(`/api/board/${postId}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteComment(
  postId: string,
  commentId: string,
  authorId: string
): Promise<ApiResponse<null>> {
  const response = await fetch(
    `/api/board/${postId}/comments/${commentId}?authorId=${authorId}`,
    {
      method: 'DELETE',
    }
  )
  return response.json()
}