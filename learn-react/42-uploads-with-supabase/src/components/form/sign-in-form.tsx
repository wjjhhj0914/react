import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useToggleState } from '@/hooks'
import supabase from '@/libs/supabase'
import { tw } from '@/utils'

type SigninFormData = {
  email: string
  password: string
}

interface Props {
  onSwitchForm: () => void
  onClose: () => void
}

export default function SignInForm({ onSwitchForm, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    mode: 'onChange',
  })

  const [showPassword, { toggle }] = useToggleState(false)

  const onSubmit = async (formData: SigninFormData) => {
    if (isSubmitting) return

    const { error, data } = await supabase.auth.signInWithPassword(formData)

    if (error) {
      toast.error(
        `로그인 오류 발생! ${error.status}:${error.name}:${error.message}`
      )
    } else {
      if (data.user) {
        const { username } = data.user.user_metadata
        toast.success(`${username}님! 로그인되었습니다.`)
        onClose()
      }
    }
  }

  return (
    <div className="max-w-md w-80 mx-auto bg-white rounded-lg p-4">
      <h2 className="text-xl font-bold mb-6 text-center">로그인</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="로그인 폼"
        autoComplete="off"
        noValidate
      >
        <div className="mb-4">
          <label htmlFor="login-email" className="block font-medium mb-1">
            이메일
          </label>
          <input
            type="text"
            id="login-email"
            autoComplete="off"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            {...register('email', {
              required: '이름 또는 이메일을 입력하세요',
            })}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              errors.email
                ? 'border-red-500 ring-red-300'
                : 'border-gray-300 focus:ring-emerald-300'
            }`}
          />
          {errors.email && (
            <div
              id="login-email-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="login-password" className="block font-medium mb-1">
            패스워드
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password ? 'login-password-error' : undefined
              }
              {...register('password', {
                required: '패스워드를 입력하세요',
              })}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors.password
                  ? 'border-red-500 ring-red-300'
                  : 'border-gray-300 focus:ring-emerald-300'
              }`}
            />
            <button
              type="button"
              onClick={toggle}
              className={tw(
                'cursor-pointer',
                'absolute right-1 top-1/2',
                '-translate-y-1/2',
                'rounded border-0',
                'px-2 py-1',
                'text-sm text-gray-600 bg-gray-50',
                'hover:bg-gray-200',
                'focus:outline-none focus:ring focus:ring-emerald-300'
              )}
              aria-label={showPassword ? '패스워드 숨기기' : '패스워드 표시'}
              title={showPassword ? '패스워드 숨기기' : '패스워드 표시'}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {errors.password && (
            <div
              id="login-password-error"
              className="text-red-500 text-sm mt-1"
              role="alert"
            >
              {errors.password.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          aria-disabled={isSubmitting}
          className={tw(
            'cursor-pointer',
            'w-full border-0 py-3 rounded',
            'border-1 border-emerald-600',
            'bg-emerald-600 text-white',
            'hover:bg-emerald-700',
            'focus:bg-emerald-800 focus:border-emerald-800',
            'aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
          )}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <div className="flex justify-center mt-4 text-sm">
        <p className="text-gray-600">계정이 없으신가요?</p>
        <button
          type="button"
          onClick={onSwitchForm}
          className={tw(
            'border-0 bg-transparent',
            'text-emerald-600 hover:text-emerald-700 font-medium ml-1'
          )}
        >
          회원가입
        </button>
      </div>
    </div>
  )
}
