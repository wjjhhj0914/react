/* eslint-disable react-refresh/only-export-components */
import type { AuthError, Session, User } from '@supabase/supabase-js'
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toast } from 'sonner'
import supabase from '@/libs/supabase'

// --------------------------------------------------------------------------
// Auth 컨텍스트 타입 정의

interface AuthContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextDispatchValue {
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<{ error: AuthError | null }>
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
}

// --------------------------------------------------------------------------
// Auth 컨텍스트 생성

const AuthContext = createContext<AuthContextValue | null>(null)
const AuthContextDispach = createContext<AuthContextDispatchValue | null>(null)

// --------------------------------------------------------------------------
// AuthProvider 컴포넌트

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // 초기 사용자 세션 가져오기
    const getInitialSession = async () => {
      try {
        setIsLoading(true)

        // 현재 세션 가져오기
        const { data } = await supabase.auth.getSession()
        const { session } = data
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('세션 가져오기 오류:', error)
        toast.error('인증 정보를 가져오는 중 문제가 발생했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    getInitialSession()

    // 인증 상태 변경 리스너
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // 인증 상태 컨텍스트 값
  const state = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
  }

  // 인증 상태 업데이트 함수 컨텍스트 값
  const actions = useMemo(() => {
    // 회원가입 함수
    const signUp = async (
      email: string,
      password: string,
      username: string
    ) => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        })

        if (!error) {
          toast.success('회원가입이 성공적으로 완료되었습니다!')
        }

        return { error }
      } catch (error) {
        console.error('회원가입 오류:', error)
        toast.error('회원가입 중 문제가 발생했습니다')
        return { error: error as AuthError }
      }
    }

    // 로그인 함수
    const signIn = async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (!error) {
          toast.success('로그인에 성공했습니다!')
        }

        return { error }
      } catch (error) {
        console.error('로그인 오류:', error)
        toast.error('로그인 중 문제가 발생했습니다')
        return { error: error as AuthError }
      }
    }

    // 로그아웃 함수
    const signOut = async () => {
      try {
        const { error } = await supabase.auth.signOut()

        if (!error) {
          toast.success('로그아웃 되었습니다')
        }

        return { error }
      } catch (error) {
        console.error('로그아웃 오류:', error)
        toast.error('로그아웃 중 문제가 발생했습니다')
        return { error: error as AuthError }
      }
    }

    return {
      signUp,
      signIn,
      signOut,
    }
  }, [])

  return (
    <AuthContextDispach value={actions}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthContextDispach>
  )
}

// --------------------------------------------------------------------------
// Auth 커스텀 훅

export function useAuth(): AuthContextValue {
  const contextValue = useContext(AuthContext)

  if (!contextValue) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용해야 합니다.')
  }

  return contextValue
}

export function useAuthDispatch(): AuthContextDispatchValue {
  const contextValue = useContext(AuthContextDispach)

  if (!contextValue) {
    throw new Error('useAuthDispatch는 AuthProvider 내부에서 사용해야 합니다.')
  }

  return contextValue
}
