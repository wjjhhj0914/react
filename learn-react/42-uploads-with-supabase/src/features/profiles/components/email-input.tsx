import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { tw } from '@/utils'
import type { ProfileFormData } from '../type'

interface Props {
  errors: FieldErrors<ProfileFormData>
  register: UseFormRegister<ProfileFormData>
}

export default function EmailInput({ errors, register }: Props) {
  return (
    <div className="mb-4">
      <label htmlFor="profile-email" className="block font-medium text-lg mb-1">
        이메일
      </label>
      <input
        type="email"
        id="profile-email"
        autoComplete="off"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'profile-email-error' : undefined}
        {...register('email', {
          required: '이메일을 입력하세요',
          pattern: {
            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
            message: '올바른 이메일 형식이 아닙니다.',
          },
        })}
        className={tw(
          'w-full p-3 border rounded focus:outline-none focus:ring',
          errors.email
            ? 'border-red-500 ring-red-300'
            : 'border-gray-300 focus:ring-emerald-300'
        )}
      />
      {errors.email && (
        <div
          id="profile-email-error"
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {errors.email.message}
        </div>
      )}
    </div>
  )
}
