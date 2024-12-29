// src/lib/kakao.ts
declare global {
  interface Window {
    Kakao: any;
  }
}

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY!;

export function initializeKakao() {
  if (typeof window !== 'undefined' && !window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_KEY);
    console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
  }
}