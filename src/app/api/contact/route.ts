// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // 이메일 검증
    if (!data.email || !data.email.includes('@')) {
      return NextResponse.json(
        { error: '유효한 이메일을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 필수 필드 검증
    if (!data.name || !data.message) {
      return NextResponse.json(
        { error: '모든 필수 항목을 입력해주세요.' },
        { status: 400 }
      )
    }

    console.log('Contact form submission:', data)

    return NextResponse.json(
      { message: '메시지가 성공적으로 전송되었습니다.' },
      { status: 200 }
    )
  } catch (err: unknown) {
    const error = err as Error
    return NextResponse.json(
      { error: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}