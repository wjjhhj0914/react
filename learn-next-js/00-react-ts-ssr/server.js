import fs from 'node:fs/promises'
import express from 'express'

// 상수 정의
const isProduction = process.env.NODE_ENV === 'production' // 프로덕션 환경 여부
const port = process.env.PORT || 5173 // 서버 포트
const base = process.env.BASE || '/' // 기본 경로

// 프로덕션 환경에서 HTML 템플릿 캐싱
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// HTTP 서버 생성
const app = express()

// Vite 또는 프로덕션 미들웨어 추가
/** @type {import('vite').ViteDevServer | undefined} */
let vite
if (!isProduction) {
  // 개발 환경: Vite 개발 서버 설정 및 미들웨어 적용
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true }, // 미들웨어 모드 활성화
    appType: 'custom', // 사용자 정의 앱 타입
    base,
  })
  app.use(vite.middlewares)
} else {
  // 프로덕션 환경: 압축 및 정적 파일 서빙 미들웨어 적용
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression()) // gzip 압축
  app.use(base, sirv('./dist/client', { extensions: [] })) // 정적 파일 서비스
}

// HTML 응답 처리
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '') // 요청 URL에서 base 경로 제거

    /** @type {string} */
    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // 개발 환경: 항상 최신 템플릿을 읽고, Vite의 HTML 변환 적용
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      // 프로덕션 환경: 캐싱된 템플릿과 서버 번들 사용
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    // SSR 렌더 함수 실행 (head, html 반환)
    const rendered = await render(url)

    // 템플릿에 렌더링된 내용 삽입
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')

    // 최종 HTML 응답
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    // 에러 발생 시 Vite의 스택트레이스 보정 및 로그 출력
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// HTTP 서버 시작
app.listen(port, () => {
  console.log(`HTTP 서버 구동 → http://localhost:${port}`)
})
