import { useState } from 'react'
import { Dialog } from '@/components'
import { SignInForm, SignUpForm } from '@/components/form'
import { useAuth, useAuthDispatch } from '@/contexts/auth'
import { useToggleState } from '@/hooks'
import { tw } from '@/utils'
import SupabaseLogo from './supabase-logo'

type FormType = 'signin' | 'signup'

export default function Header() {
  // 인증 컨텍스트 사용
  const { user, isLoading } = useAuth()
  const { signOut } = useAuthDispatch()

  // 다이얼로그 열기 상태
  const [isOpen, { toggle: toggleDialog }] = useToggleState(false)

  // 다이얼로그 닫을 때 기본 폼으로 초기화
  const handleCloseDialog = () => {
    toggleDialog()
    // 다이얼로그가 닫히면 기본 폼 타입(로그인)으로 초기화
    setTimeout(() => setFormType('signin'), 300)
  }

  // 폼 전환 상태
  const [formType, setFormType] = useState<FormType>('signin')

  // 폼 타입 전환 함수
  const switchToSignIn = () => setFormType('signin')
  const switchToSignUp = () => setFormType('signup')

  return (
    <header className="fixed w-full top-0 left-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a
            className="flex items-center"
            href="https://supabase.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SupabaseLogo />
          </a>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {user.user_metadata.username ?? ''} ({user.email})
              </span>
              <button
                type="button"
                onClick={signOut}
                disabled={isLoading}
                className={tw(
                  'px-4 py-2 rounded',
                  'bg-gray-200 text-gray-800 border-0',
                  'hover:bg-gray-300',
                  'focus:outline-none focus:ring focus:ring-gray-600',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {isLoading ? '로그아웃 중...' : '로그아웃'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={toggleDialog}
              className={tw(
                'px-4 py-2 rounded',
                'bg-emerald-600 text-white border-0',
                'hover:bg-emerald-700',
                'focus:outline-none focus:ring focus:ring-emerald-300'
              )}
            >
              로그인
            </button>
          )}
        </div>
      </div>

      {!user && (
        <Dialog open={isOpen} onClose={handleCloseDialog}>
          {formType === 'signin' ? (
            <SignInForm
              onSwitchForm={switchToSignUp}
              onClose={handleCloseDialog}
            />
          ) : (
            <SignUpForm
              onSwitchForm={switchToSignIn}
              onClose={handleCloseDialog}
            />
          )}
        </Dialog>
      )}
    </header>
  )
}
