import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import type { JSX } from 'react/jsx-runtime'
import { toast } from 'sonner'
import { usePageQuery } from '@/hooks'
import Navigation, { type Page } from '@/pages/common/navigation'
import supabase, { type Profile } from './libs/supabase'
import ProfilePage from './pages/profile'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'

export default function AppPage() {
  const page = usePageQuery<Page>('signup')
  const [user, setUser] = useState<Partial<Profile> | null>(null)

  // 부수 효과 처리 : 외부 시스템과 리액트 앱 동기화
  useEffect(() => {
    const url = new URL(globalThis.location.href)
    url.searchParams.set('page', String(page))
    globalThis.history.pushState({}, '', url.toString())
  }, [page])

  useEffect(() => {
    // [실습] 최초 마운트 시, Supabase에서 현재 사용자 정보 가져오기
    supabase.auth.getUser().then(async ({ error, data }) => {
      if (error) {
        toast.error(`사용자 검색 오류 발생! ${error.message}`)
      } else {
        // 인증된 사용자 정보 가져오기에 성공!
        // 프로필 테이블에서 데이터 필터링해 가져오기 시도
        const { error: userProfileError, data: userProfile } = await supabase // 항상 supabase는 error와 data를 반환함. AuthResponse
          .from('profiles')
          .select('username, email, bio')
          .eq('id', data.user.id)
          .single() // 우리가 가져오는 데이터가 배열일 수도 있기 때문에, 하나의 데이터만 꺼내는 single() 추가

        if (userProfileError) {
          toast.error(
            `프로필 데이터 가져오기 오류 발생! ${userProfileError.message}`
          )
        } else {
          setUser(userProfile)
        }
        // setUser(data.user ?? null)
      }
    })
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
