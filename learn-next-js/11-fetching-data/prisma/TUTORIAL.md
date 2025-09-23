# Prisma란?

- **ORM** 도구: 데이터베이스 테이블을 코드(객체)로 다룸
- SQL을 직접 쓰지 않고, 자바스크립트/타입스크립트 코드로 데이터 조작
- 타입 자동 생성(타입스크립트와 궁합 최고)
- Next.js, Express 등 Node.js 기반 백엔드에서 사용

---

## Prisma 설치

```bash
bun add -d prisma
bun add @prisma/client
```

## Prisma 초기화

```bash
bunx prisma init
```

- `prisma/schema.prisma` 파일 생성됨
- `.env` 파일에 DB 연결 정보 자동 생성됨
  ```env
  DATABASE_URL="file:./dev.db"
  ```

## 스키마 작성 (예시: User 테이블)

`prisma/schema.prisma` 파일 작성

````prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
````

## 데이터베이스 테이블 생성 (마이그레이션)

```bash
bunx prisma migrate dev --name init
```

- `prisma/dev.db` 파일 생성됨 (SQLite)
- 테이블 자동 생성됨

## Prisma Client로 데이터 읽고 쓰기

### Prisma Client import

`libs/prisma.ts` 파일 생성

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

### Next.js API Route에서 사용

`app/api/users/route.ts` 파일 작성

```ts
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
```

## API 테스트

- GET `/api/users` : 모든 사용자 조회
- POST `/api/users` : 사용자 생성 (name, email 입력)