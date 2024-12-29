// src/store/comment.ts
import { create } from 'zustand'
import { Comment } from '@/types/comment'

interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  optimisticIds: Set<string>;

  // Actions
  setComments: (comments: Comment[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Optimistic update actions
  addComment: (comment: Comment) => void;
  updateComment: (id: string, content: string) => void;
  deleteComment: (id: string) => void;
  markOptimistic: (id: string) => void;
  unmarkOptimistic: (id: string) => void;
  rollbackDelete: (comment: Comment) => void;
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: [],
  isLoading: false,
  error: null,
  optimisticIds: new Set<string>(),

  setComments: (comments) => set({ comments }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addComment: (comment) => {
    set((state) => ({
      comments: [comment, ...state.comments],
      optimisticIds: new Set(state.optimisticIds).add(comment.id)
    }));
  },

  updateComment: (id, content) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === id
          ? { 
              ...comment, 
              content,
              updatedAt: new Date().toISOString() 
            }
          : comment
      ),
      optimisticIds: new Set(state.optimisticIds).add(id)
    }));
  },

  deleteComment: (id) => {
    const comment = get().comments.find(c => c.id === id);
    set((state) => ({
      comments: state.comments.filter(c => c.id !== id),
      optimisticIds: new Set(state.optimisticIds).add(id)
    }));
    return comment; // 롤백을 위해 삭제된 댓글 반환
  },

  markOptimistic: (id) => {
    set((state) => ({
      optimisticIds: new Set(state.optimisticIds).add(id)
    }));
  },

  unmarkOptimistic: (id) => {
    const optimisticIds = new Set(get().optimisticIds);
    optimisticIds.delete(id);
    set({ optimisticIds });
  },

  rollbackDelete: (comment) => {
    set((state) => ({
      comments: [...state.comments, comment]
    }));
  },
}));