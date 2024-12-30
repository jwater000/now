'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { initializeKakao } from '@/lib/kakao'
import { AuthError, ERROR_MESSAGES } from '@/lib/error'
import ErrorAlert from '@/components/common/ErrorAlert'

interface KakaoAuthResponse {
  access_token: string;
}

interface KakaoError {
  error: string;
}

export default function KakaoLogin() {
  const { setUser } = useAuthStore()
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('KAKAO_JS_KEY:', process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
    }
    console.log('Kakao is initialized:', Kakao.isInitialized())
  }, [])

  useEffect(() => {
    try {
      initializeKakao();
      setIsLoaded(true);
    } catch (err) {
      setError('카카오 로그인을 초기화하는데 실패했습니다.');
    }
  }, [])

  const handleKakaoLogin = () => {
    if (!window.Kakao || !isLoaded) {
      setError('카카오 로그인을 사용할 수 없습니다.');
      return;
    }

    window.Kakao.Auth.login({
      success: (authObj: KakaoAuthResponse) => {
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
            console.error('카카오 프로필 정보 요청 실패:', error);
            setError(ERROR_MESSAGES.auth.PROFILE_FAILED);
          },
        });
      },
      fail: (error: KakaoError) => {
        console.error('카카오 로그인 실패:', error);
        setError(ERROR_MESSAGES.auth.LOGIN_FAILED);
      },
    });
  };

  return (
    <>
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

      {error && (
        <ErrorAlert 
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </>
  )
}