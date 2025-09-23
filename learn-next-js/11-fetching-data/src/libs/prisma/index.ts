import { PrismaClient } from '@prisma/client'

// PrismaClient 인스턴스 생성
// 이 인스턴스는 데이터베이스와의 연결을 관리하고 쿼리를 실행하는 데 사용됩니다.
const prisma = new PrismaClient()

// prisma 인스턴스를 다른 파일에서 import하여 사용할 수 있도록 export합니다.
export default prisma
