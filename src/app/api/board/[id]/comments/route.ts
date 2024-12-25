// src/app/api/board/[id]/comments/[commentId]/route.ts
import { NextResponse } from 'next/server'
import type { Comment } from '@/types/board'
import { comments } from '@/app/api/board/route'  // 임시 데이터 저장소

// 댓글 수정
export async function PUT(
  request: Request,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const body = await request.json()
    const commentIndex = comments.findIndex(c => c.id === params.commentId)

    if (commentIndex === -1) {
      return NextResponse.json(
        { success: false, error: '댓글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 작성자 검증
    if (comments[commentIndex].authorId !== body.authorId) {
      return NextResponse.json(
        { success: false, error: '수정 권한이 없습니다.' },
        { status: 403 }
      )
    }

    // 댓글 업데이트
    comments[commentIndex] = {
      ...comments[commentIndex],
      content: body.content,
      updatedAt: new Date().toISOString().split('T')[0],
      isEdited: true
    }

    return NextResponse.json({
      success: true,
      data: comments[commentIndex]
    })
  } catch (error) {
    console.error('Error updating comment:', error)
    return NextResponse.json(
      { success: false, error: '댓글 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 댓글 삭제
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const commentIndex = comments.findIndex(c => c.id === params.commentId)

    if (commentIndex === -1) {
      return NextResponse.json(
        { success: false, error: '댓글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // URL에서 작성자 ID 추출
    const { searchParams } = new URL(request.url)
    const authorId = searchParams.get('authorId')

    // 작성자 검증
    if (comments[commentIndex].authorId !== authorId) {
      return NextResponse.json(
        { success: false, error: '삭제 권한이 없습니다.' },
        { status: 403 }
      )
    }

    // 댓글 삭제
    comments.splice(commentIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Error deleting comment:', error)
    return NextResponse.json(
      { success: false, error: '댓글 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const newComment: Comment = {
      id: Date.now().toString(),
      postId: params.id,
      content: body.content,
      // ... 나머지 필드
    }
    // ...
  } catch (error) {
    console.error('Comment creation error:', error)
    // ...
  }
}