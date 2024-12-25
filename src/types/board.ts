// src/types/board.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  category: string; // 이 필드가 있는지 확인
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}