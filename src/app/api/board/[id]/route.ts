import { NextResponse } from 'next/server'
import { posts } from '../route'
import type { Comment } from '@/types/board'

// 임시 댓글 데이터 저장소
let comments: Comment[] = []

// 게시글 상세 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = posts.find(p => p.id === params.id)
  if (!post) {
    return NextResponse.json(
      { success: false, error: '게시글을 찾을 수 없습니다.' },
      { status: 404 }
    )
  }

  const postComments = comments.filter(c => c.postId === params.id)

  return NextResponse.json({
    success: true,
    data: {
      post,
      comments: postComments
    }
  })
}

// 게시글 수정
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const postIndex = posts.findIndex(p => p.id === params.id)

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 작성자 검증
    if (posts[postIndex].authorId !== body.authorId) {
      return NextResponse.json(
        { success: false, error: '수정 권한이 없습니다.' },
        { status: 403 }
      )
    }

    // 게시글 업데이트
    posts[postIndex] = {
      ...posts[postIndex],
      ...body,
      updatedAt: new Date().toISOString().split('T')[0]
    }

    return NextResponse.json({
      success: true,
      data: posts[postIndex]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '게시글 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 게시글 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postIndex = posts.findIndex(p => p.id === params.id)

    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, error: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // URL에서 작성자 ID 추출
    const { searchParams } = new URL(request.url)
    const authorId = searchParams.get('authorId')

    // 작성자 검증
    if (posts[postIndex].authorId !== authorId) {
      return NextResponse.json(
        { success: false, error: '삭제 권한이 없습니다.' },
        { status: 403 }
      )
    }

    // 게시글 삭제
    posts.splice(postIndex, 1)
    
    // 관련 댓글도 삭제
    comments = comments.filter(comment => comment.postId !== params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '게시글 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}