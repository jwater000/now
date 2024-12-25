import { NextResponse } from 'next/server'
import type { Post } from '@/types/board'

// 임시 데이터 저장소
const posts = [] as Post[]

// 게시글 목록 조회
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  let filteredPosts = posts
  if (type && type !== 'all') {
    filteredPosts = posts.filter(post => post.type === type)
  }

  return NextResponse.json({ success: true, data: filteredPosts })
}

// 게시글 작성
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, title, content, authorId, authorName, verificationCode, relatedItem } = body

    // 인증 코드 검증 (실제로는 데이터베이스에서 확인)
    const verificationStatus = type.includes('review') 
      ? verifyCode(verificationCode, relatedItem)
      : undefined

    const newPost: Post = {
      id: Date.now().toString(),
      type,
      title,
      content,
      authorId,
      authorName,
      createdAt: new Date().toISOString().split('T')[0],
      relatedItem,
      verificationStatus
    }

    posts.unshift(newPost)

    return NextResponse.json({
      success: true,
      data: newPost
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: '게시글 작성에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 임시 인증 코드 검증 함수
function verifyCode(code: string, itemId: string): boolean {
  return true
}

export const comments: Comment[] = []