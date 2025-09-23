# 데이터 가져오기

- 서버에서 데이터 가져오기
- 서버에서 데이터에 연결
- 클라이언트에서 데이터 가져오기

## Prisma 설정

1. `bun i` - 프로젝트의 모든 의존성을 설치
2. `bunx prisma db push` - 데이터베이스와 모든 테이블이 생성
3. `bunx prisma db seed` - API의 데이터와 매우 유사한 데이터가 데이터베이스에 시드
4. `bunx prisma generate` - 타입 관련 오류 발생 시, 제너레이트 명령 실행 (그래도 해결 안되면 TS Server 다시 시작)
5. `bun dev` - 개발 서버가 시작