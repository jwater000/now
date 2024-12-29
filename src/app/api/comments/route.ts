// src/app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Comment, CommentCreateInput, ApiResponse } from '@/types/comment'

// 임시 데이터 저장소 (실제로는 데이터베이스를 사용해야 함)
let comments: Comment[] = []

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postId = searchParams.get('postId')

  if (!postId) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'Post ID is required' },
      { status: 400 }
    )
  }

  const postComments = comments.filter(comment => comment.postId === postId)
  return NextResponse.json<ApiResponse<Comment[]>>({ data: postComments })
}

export async function POST(request: NextRequest) {
  const body: CommentCreateInput = await request.json()

  if (!body.content || !body.postId || !body.authorId || !body.authorName) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'Required fields are missing' },
      { status: 400 }
    )
  }

  const newComment: Comment = {
    id: crypto.randomUUID(),
    content: body.content,
    authorId: body.authorId,
    authorName: body.authorName,
    postId: body.postId,
    createdAt: new Date().toISOString()
  }

  comments.push(newComment)
  return NextResponse.json<ApiResponse<Comment>>({ data: newComment }, { status: 201 })
}

// src/app/api/comments/[id]/route.ts
import { CommentUpdateInput } from '@/types/comment'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body: CommentUpdateInput = await request.json()
  const commentIndex = comments.findIndex(c => c.id === params.id)

  if (commentIndex === -1) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'Comment not found' },
      { status: 404 }
    )
  }

  comments[commentIndex] = {
    ...comments[commentIndex],
    content: body.content,
    updatedAt: new Date().toISOString()
  }

  return NextResponse.json<ApiResponse<Comment>>({ data: comments[commentIndex] })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const commentIndex = comments.findIndex(c => c.id === params.id)

  if (commentIndex === -1) {
    return NextResponse.json<ApiResponse<never>>(
      { error: 'Comment not found' },
      { status: 404 }
    )
  }

  comments = comments.filter(c => c.id !== params.id)
  return NextResponse.json<ApiResponse<null>>({ data: null })
}