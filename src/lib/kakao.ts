// src/lib/kakao.ts
declare global {
    interface Window {
      Kakao: any;
    }
  }
  
  export const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '';
  
  export function initializeKakao() {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_KEY);
        }
      };
  
      document.body.appendChild(script);
    }
  }