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