// src/types/comment.ts
export interface Comment {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    postId: string;
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface CommentCreateInput {
    content: string;
    postId: string;
    authorId: string;
    authorName: string;
  }
  
  export interface CommentUpdateInput {
    id: string;
    content: string;
  }
  
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
  }