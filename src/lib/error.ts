// src/lib/error.ts
export class AuthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AuthError';
    }
  }
  
  export class CommentError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'CommentError';
    }
  }
  
  export function getErrorMessage(error: unknown): string {
    if (error instanceof AuthError) {
      return error.message;
    }
    
    if (error instanceof CommentError) {
      return error.message;
    }
  
    if (error instanceof Error) {
      return error.message;
    }
  
    return '알 수 없는 오류가 발생했습니다.';
  }
  
  // 에러 메시지 상수
  export const ERROR_MESSAGES = {
    auth: {
      LOGIN_REQUIRED: '로그인이 필요합니다.',
      LOGIN_FAILED: '로그인에 실패했습니다.',
      LOGOUT_FAILED: '로그아웃에 실패했습니다.',
      PROFILE_FAILED: '프로필 정보를 가져오는데 실패했습니다.',
    },
    comment: {
      FETCH_FAILED: '댓글을 불러오는데 실패했습니다.',
      CREATE_FAILED: '댓글 작성에 실패했습니다.',
      UPDATE_FAILED: '댓글 수정에 실패했습니다.',
      DELETE_FAILED: '댓글 삭제에 실패했습니다.',
      UNAUTHORIZED: '권한이 없습니다.',
    }
  };