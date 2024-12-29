// src/lib/auth.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

declare global {
  interface Window {
    Kakao: any;
  }
}

interface AuthUser {
  id: string;
  name: string;
  profileImage?: string;
  email?: string;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      initialized: false,

      initialize: async () => {
        if (get().initialized) return;

        try {
          set({ isLoading: true });
          
          // Kakao SDK 초기화
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
          }

          // 기존 세션 확인
          const status = await window.Kakao.Auth.getStatusInfo();
          if (status.status === 'connected') {
            const { id, properties, kakao_account } = await window.Kakao.API.request({
              url: '/v2/user/me'
            });

            set({
              user: {
                id: id.toString(),
                name: properties.nickname,
                profileImage: properties.profile_image,
                email: kakao_account?.email
              }
            });
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          set({ error: '인증 초기화에 실패했습니다.' });
        } finally {
          set({ isLoading: false, initialized: true });
        }
      },

      login: async () => {
        try {
          set({ isLoading: true });

          await window.Kakao.Auth.login({
            success: async () => {
              const { id, properties, kakao_account } = await window.Kakao.API.request({
                url: '/v2/user/me'
              });

              set({
                user: {
                  id: id.toString(),
                  name: properties.nickname,
                  profileImage: properties.profile_image,
                  email: kakao_account?.email
                }
              });
            },
            fail: (error: any) => {
              console.error('Login failed:', error);
              set({ error: '로그인에 실패했습니다.' });
            }
          });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          
          if (!window.Kakao.Auth.getAccessToken()) {
            throw new Error('Not logged in');
          }

          await window.Kakao.Auth.logout();
          set({ user: null });
        } catch (error) {
          console.error('Logout failed:', error);
          set({ error: '로그아웃에 실패했습니다.' });
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

// src/hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth';

export function useAuthGuard() {
  const { user, initialize, initialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  useEffect(() => {
    if (initialized && !user) {
      router.push('/login');
    }
  }, [user, initialized, router]);

  return { user, isAuthenticated: !!user };
}