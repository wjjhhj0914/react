import '@/styles/main.css'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <head>
        <link
          as="font"
          rel="stylesheet"
          fetchPriority="high"
          crossOrigin="anonymous"
          href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        />
      </head>
      <body className="overflow-y-scroll">
        <header className="container mx-auto">
          <nav aria-label="사이트 페이지 내비게이션">
            <ul className="p-5">
              <li>
                <Link href="/">홈</Link>
              </li>
              <li>
                <Link href="/auth/sign-in">로그인</Link>
              </li>
              <li>
                <Link href="/auth/sign-up">회원가입</Link>
              </li>
              <li>
                <Link href="/books">도서 목록</Link>
              </li>
              <li>
                <Link href="/dashboard">대시보드</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  )
}
