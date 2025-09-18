import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { MouseEvent, useCallback, useTransition } from 'react'
import { Divide } from 'lucide-react'
import { Dialog, Divider, NavLink, SignInForm } from '@/components'
import SupabaseLogo from '@/components/header/supabase-logo'
import { useAuth, useAuthDispatch } from '@/contexts/auth'
import { useToggleState } from '@/hooks'
import { tw } from '@/utils'

const navigation: { path: string; text: string }[] = [
  { path: '/deferred-value', text: '지연된 값' },
  { path: '/transition', text: '트랜지션' },
  { path: '/use-function', text: 'use 함수' },
  { path: '/action', text: '액션' },
]

function RootLayout() {
  const navigate = useNavigate()

  // [실습]
  // 트랜지션을 사용해 페이지 전환 시, 사용자 경혐을 향상시켜보세요.
  // 문제 상황은 페이지 전환 과정에서 렌더링이 지연되고 있어
  // 렌더링 대기 시간 동안 앱이 멈춘 것처럼 보입니다.

  const [isPending, startTransition] = useTransition()

  const handleNavigation = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const aElement = e.target as HTMLAnchorElement
      const href = aElement.getAttribute('href')
      if (href) {
        startTransition(() => {
          navigate({ to: href })
        })
      }
    },
    [navigate]
  )

  return (
    <>
      <header
        className={tw`
          fixed left-0 right-0 top-0 
          backdrop-blur-xs bg-slate-950/90 text-white 
          border-b-1 border-b-slate-800
        `}
      >
        <Nav isPending={isPending} onNavigate={handleNavigation} />
      </header>

      <main className="container mx-auto p-4 pt-24">
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
  const { isAuthenticated } = useAuth()
  const { signOut } = useAuthDispatch()
  const [showModal, { on, off }] = useToggleState(false)

  return (
    <nav
      aria-label="내비게이션"
      className="container mx-auto flex gap-x-1 items-center"
    >
      <h1 className="pl-3">
        <NavLink href="/">
          <img
            src="/react.svg"
            alt="홈"
            width={36}
            height={36}
            className="hue-rotate-45 saturate-200"
          />
        </NavLink>
      </h1>
      <ul className="flex-1 flex items-center gap-x-1 p-4">
        {navigation.map((navItem) => {
          const isLast = navigation.at(-1) === navItem
          return (
            <li key={navItem.path} className={tw(isLast && 'flex-1')}>
              <NavLink
                href={navItem.path}
                isPending={isPending}
                onNavigate={onNavigate}
              >
                {navItem.text}
              </NavLink>
            </li>
          )
        })}
        <li>
          {isAuthenticated ? (
            <button
              type="button"
              className="button bg-indigo-800! text-indigo-50!"
              onClick={signOut}
            >
              로그아웃
            </button>
          ) : (
            <button
              type="button"
              className="button bg-indigo-900! text-indigo-300!"
              onClick={on}
            >
              로그인
            </button>
          )}

          <Dialog mode="custom" open={showModal} onClose={off}>
            <SignInForm onSwitchForm={() => {}} onClose={off} />
          </Dialog>
        </li>
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
