// src/app/layout.tsx
import type { Metadata } from 'next'
import { Noto_Serif_KR } from 'next/font/google'
import Script from 'next/script'  // Script import 추가
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import './globals.css'

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: '작가/명상가 포트폴리오',
  description: '글쓰기와 명상을 통한 내면의 여정',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={notoSerifKr.className}>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" /> {/* body 내부로 이동 */}
        <Header />
        <main className="min-h-screen pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}