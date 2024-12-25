// src/components/common/Footer.tsx
import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react'

const navigation = {
  main: [
    { name: '홈', href: '/' },
    { name: '블로그', href: '/blog' },
    { name: '프로그램', href: '/programs' },
    { name: '저서', href: '/books' },
    { name: '문의하기', href: '/contact' },
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@example.com' },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="py-12 md:py-16">
          {/* 상단 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* 로고와 설명 */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-bold">작가명</h3>
              <p className="text-gray-400 text-sm">
                마음의 평화를 찾아가는 여정에서<br />
                당신의 동반자가 되어드리겠습니다
              </p>
            </div>

            {/* 빠른 링크 */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">바로가기</h3>
              <ul className="space-y-2">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 연락처 */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">연락처</h3>
              <div className="space-y-2 text-gray-400">
                <p>서울특별시 강남구 테헤란로 123</p>
                <p>02-1234-5678</p>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-gray-800 pt-8">
            {/* 하단 영역 */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* 저작권 */}
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} 작가명. All rights reserved.
              </p>

              {/* 소셜 링크 */}
              <div className="flex space-x-6">
                {navigation.social.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{item.name}</span>
                      <Icon className="h-6 w-6" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}