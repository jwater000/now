// src/components/auth/KakaoLogin.tsx
'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { initializeKakao } from '@/lib/kakao'

interface KakaoAuthObj {
  access_token: string
  // 필요한 다른 속성들 추가
}

interface KakaoError {
  error: string
  // 필요한 다른 속성들 추가
}

export default function KakaoLogin() {
  const { setUser } = useAuthStore()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    initializeKakao();
    setIsLoaded(true);
  }, [])

  const handleKakaoLogin = () => {
    if (window.Kakao && isLoaded) {
      window.Kakao.Auth.login({
        success: (authObj: KakaoAuthObj) => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res: any) => {
              const kakaoAccount = res.kakao_account;
              setUser({
                id: res.id.toString(),
                nickname: kakaoAccount.profile.nickname,
                email: kakaoAccount.email,
                profileImage: kakaoAccount.profile.profile_image_url,
                kakaoId: res.id.toString(),
              });
            },
            fail: (error: KakaoError) => {
              console.error('카카오 프로필 정보 요청 실패', error);
            },
          });
        },
        fail: (error: KakaoError) => {
          console.error('카카오 로그인 실패', error);
        },
      });
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FEE500] text-[#3C1E1E] rounded-lg hover:bg-[#FDD900] transition-colors"
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="flex-shrink-0"
      >
        <path d="M12 3C6.48 3 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8zm-1-13h2v5h-2zm0 6h2v2h-2z"/>
      </svg>
      카카오 계정으로 로그인
    </button>
  )
}