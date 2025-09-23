import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { NavLink } from '@/components'
import '@/styles/main.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    template: '%s | LearnMate',
    default: 'LearnMate - 1:1 퍼스널 맨투맨 학습 서비스',
  },
  description:
    '전문 강사진과 함께하는 개인 맞춤형 학습 솔루션. 학습 목표와 수준에 맞춘 1:1 개인 교육으로 효과적인 성장을 경험하세요.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    url: siteUrl,
    images: {
      url: '/og_image.png',
      alt: '런메이트(LearnMate)',
      width: 1200,
      height: 630,
    },
  },
}

// --------------------------------------------------------------------------
// 루트 레이아웃 컴포넌트

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
        <header className="fixed z-10000 top-0 left-0 right-0 bg-slate-950/80 text-white backdrop-blur-xs">
          <Navigation />
        </header>
        <main className="flex flex-col min-h-screen pt-14">{children}</main>
      </body>
    </html>
  )
}

// --------------------------------------------------------------------------
// 내비게이션 컴포넌트

function Navigation() {
  return (
    <nav className="container mx-auto p-4">
      <h2 className="sr-only">사이트 내비게이션</h2>
      <ul className="flex gap-x-4 [&_a:hover]:text-amber-400">
        <li>
          <NavLink href="/">홈</NavLink>
        </li>
        <li>
          <NavLink href="/catch-all/next/react/tailwindcss/supabase">
            catch-all 세그먼트
          </NavLink>
        </li>
        <li>
          <NavLink href="/optional-catch-all">
            옵셔널 catch-all 세그먼트
          </NavLink>
        </li>
        <li>
          <NavLink href="/quotes">인용 목록</NavLink>
        </li>
        <li>
          <NavLink href="/auth/sign-up">회원가입</NavLink>
        </li>
        <li>
          <NavLink href="/auth/sign-in">로그인</NavLink>
        </li>
        <li>
          <NavLink href="/books">도서 목록</NavLink>
        </li>
        <li className="relative group">
          <NavLink href="/dashboard" exact>
            대시보드
          </NavLink>
          <ul
            className={`
              hidden 
              absolute left-0 w-[8ch] 
              p-3 pt-2 rounded-md shadow-lg 
              space-y-1
              bg-slate-900
              group-hover:block
              group-focus-within:block
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
  )
}
