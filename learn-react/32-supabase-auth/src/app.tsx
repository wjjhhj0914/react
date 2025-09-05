import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import type { JSX } from 'react/jsx-runtime'
import { usePageQuery } from '@/hooks'
import Navigation, { type Page } from '@/pages/common/navigation'
import ProfilePage from './pages/profile'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'

export default function AppPage() {
  const page = usePageQuery<Page>('signup')
  const [user] = useState<User | null>(null)

  useEffect(() => {
    const url = new URL(globalThis.location.href)
    url.searchParams.set('page', String(page))
    globalThis.history.pushState({}, '', url.toString())
  }, [page])

  useEffect(() => {
    // [실습] 최초 마운트 시, Supabase에서 현재 사용자 정보 가져오기
    // ...
    // [실습] Supabase 인증 상태 변경 구독
    // ...
    // [실습] Supabase 인증 구독 해제
    // ...
  }, [])

  let renderPage: JSX.Element | null = null

  switch (page) {
    case 'signin':
      renderPage = <SignInPage />
      break
    case 'signup':
      renderPage = <SignUpPage />
      break
    case 'profile':
      renderPage = <ProfilePage user={user} />
      break
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-center">Supabase 인증</h1>
      </header>
      <Navigation user={user} />
      <main>{renderPage}</main>
    </div>
  )
}
