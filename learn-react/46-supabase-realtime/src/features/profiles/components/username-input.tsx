import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { tw } from '@/utils'
import type { ProfileFormData } from '../type'

interface Props {
  errors: FieldErrors<ProfileFormData>
  register: UseFormRegister<ProfileFormData>
}

export default function UsernameInput({ errors, register }: Props) {
  return (
    <div className="mb-4">
      <label
        htmlFor="profile-username"
        className="block font-medium text-lg mb-1"
      >
        이름
      </label>
      <input
        id="profile-username"
        type="text"
        autoComplete="off"
        aria-invalid={!!errors.username}
        aria-describedby={
          errors.username ? 'profile-username-error' : undefined
        }
        {...register('username', { required: '이름을 입력하세요.' })}
        className={tw(
          'w-full p-3 border rounded focus:outline-none focus:ring',
          errors.username
            ? 'border-red-500 ring-red-300'
            : 'border-gray-300 focus:ring-emerald-300'
        )}
      />
      {errors.username && (
        <div
          role="alert"
          id="profile-username-error"
          className="text-red-500 text-sm mt-1"
        >
          {errors.username.message}
        </div>
      )}
    </div>
  )
}
