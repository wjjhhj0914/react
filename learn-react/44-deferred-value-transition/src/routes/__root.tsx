import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { MouseEvent, useCallback } from 'react'
import { NavLink } from '@/components'

const navigation: { path: string; text: string }[] = [
  { path: '/deferred-value', text: '지연된 값' },
  { path: '/transition', text: '트랜지션' },
  { path: '/use-function', text: 'use 함수' },
]

function RootLayout() {
  const navigate = useNavigate()

  // [실습]
  // 트랜지션을 사용해 페이지 전환 시, 사용자 경혐을 향상시켜보세요.
  // 문제 상황은 페이지 전환 과정에서 렌더링이 지연되고 있어
  // 렌더링 대기 시간 동안 앱이 멈춘 것처럼 보입니다.
  const isPending = false
  const handleNavigation = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const aElement = e.target as HTMLAnchorElement
      const href = aElement.getAttribute('href')
      if (href) navigate({ to: href })
    },
    [navigate]
  )

  return (
    <>
      <header className="bg-black text-white">
        <Nav isPending={isPending} onNavigate={handleNavigation} />
      </header>

      <main className="container mx-auto p-4">
        {isPending ? <PageLoading /> : <Outlet />}
      </main>

      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })

// --------------------------------------------------------------------------

function Nav({
  isPending,
  onNavigate,
}: {
  isPending?: boolean
  onNavigate: (e: MouseEvent<HTMLAnchorElement>) => void
}) {
  return (
    <nav aria-label="내비게이션" className="container mx-auto">
      <ul className="flex gap-x-3.5 p-4">
        {navigation.map((navItem) => (
          <li key={navItem.path}>
            <NavLink
              href={navItem.path}
              isPending={isPending}
              onNavigate={onNavigate}
            >
              {navItem.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// --------------------------------------------------------------------------

function PageLoading() {
  return (
    <div role="status" className="flex justify-center items-center py-8">
      <div
        role="presentation"
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      />
      <span className="ml-3 text-lg font-medium text-gray-700">
        페이지 로딩 중...
      </span>
    </div>
  )
}
