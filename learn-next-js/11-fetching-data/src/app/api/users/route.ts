import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

/**
 * GET 요청 처리 - 모든 사용자 목록 조회
 *
 * @param _request NextRequest 객체 (사용되지 않음)
 * @returns 모든 사용자 정보를 JSON 형태로 반환
 */
export async function GET(_request: NextRequest) {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

/**
 * POST 요청 처리 - 새로운 사용자 생성
 *
 * @param request 사용자 정보가 포함된 NextRequest 객체
 * @returns 생성된 사용자 정보 또는 오류 메시지
 */
export async function POST(request: NextRequest) {
  // 요청 본문에서 JSON 데이터 추출
  const body = await request.json()
  const { name, email } = body

  // 필수 필드 검증
  if (!name || !email) {
    return NextResponse.json(
      { error: '이름과 이메일이 필요합니다.' },
      { status: 400 }
    )
  }

  // 데이터베이스에 사용자 생성
  const user = await prisma.user.create({
    data: { name, email },
  })

  // 생성된 사용자 정보 반환 (201 Created 상태 코드)
  return NextResponse.json(user, { status: 201 })
}

/**
 * DELETE 요청 처리 - 모든 사용자 삭제
 *
 * 주의: 이 기능은 모든 사용자 데이터를 영구적으로 삭제합니다.
 * 실제 프로덕션 환경에서는 적절한 인증 및 권한 검증이 필요합니다.
 *
 * @param _request NextRequest 객체 (사용되지 않음)
 * @returns 성공 여부를 JSON 형태로 반환
 */
export async function DELETE(_request: NextRequest) {
  try {
    // 모든 사용자 레코드 삭제
    const deletedCount = await prisma.user.deleteMany()

    // 성공 응답 반환
    return NextResponse.json(
      {
        success: true,
        message: '모든 사용자가 삭제되었습니다.',
        count: deletedCount.count,
      },
      { status: 200 }
    )
  } catch (error) {
    // 오류 발생 시 에러 응답 반환
    console.error('사용자 삭제 중 오류 발생:', error)
    return NextResponse.json(
      {
        success: false,
        error: '사용자 삭제 중 오류가 발생했습니다.',
      },
      { status: 500 }
    )
  }
}
