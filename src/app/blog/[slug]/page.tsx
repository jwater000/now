// src/app/blog/[slug]/page.tsx
import { getBlogPost } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                블로그로 돌아가기
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {post.category}
              </span>
            </div>
          </div>

          {/* 썸네일 이미지 */}
          <div className="relative aspect-[16/9] mb-12 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">썸네일 이미지</span>
            </div>
          </div>

          {/* 작성자 정보 */}
          <div className="flex items-center gap-4 mb-12 p-6 bg-gray-50 rounded-lg">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{post.author.name}</h3>
              <p className="text-gray-600">작가 & 명상가</p>
            </div>
          </div>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} />
          </div>

          {/* 공유 버튼 */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">이 글 공유하기</h3>
              <div className="flex gap-4">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}