// src/types/board.ts
export interface Post {
    id: string;
    type: 'program-review' | 'book-review' | 'program-question' | 'book-question' | 'general-question';
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    verificationCode?: string;
    relatedItem?: string;  // 프로그램 ID 또는 도서 ID
    verificationStatus?: boolean;
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