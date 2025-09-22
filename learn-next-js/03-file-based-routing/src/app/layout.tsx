import type { PropsWithChildren } from 'react'

import { NavLink } from '@/components'
import '@/styles/main.css'
import { tw } from '@/utils'

export default function RootLayout({ children }: PropsWithChildren) {
  console.log('루트 레이아웃')

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
        <header className="bg-slate-950 text-white">
          <nav
            aria-label="사이트 페이지 내비게이션"
            className="container mx-auto"
          >
            <ul className="flex gap-x-4 p-5">
              <li>
                <NavLink href="/">홈</NavLink>
              </li>
              <li>
                <NavLink href="/auth/sign-in">로그인</NavLink>
              </li>
              <li>
                <NavLink href="/auth/sign-up">회원가입</NavLink>
              </li>
              <li>
                <NavLink href="/books">도서 목록</NavLink>
              </li>
              <li className="relative group">
                <NavLink href="/dashboard" exact>
                  대시보드
                </NavLink>
                <ul
                  className={tw`
                    group-hover:block
                    group-focus-within:block
                    hidden
                    absolute -left-3
                    w-[10ch]
                    space-y-2
                    px-3 pt-2 pb-3 rounded
                    bg-slate-950
                  `}
                >
                  <li>
                    <NavLink href="/dashboard/profile">프로필</NavLink>
                  </li>
                  <li>
                    <NavLink href="/dashboard/settings">설정</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  )
}
