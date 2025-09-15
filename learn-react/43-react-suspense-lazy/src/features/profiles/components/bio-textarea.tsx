import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { ProfileFormData } from '../type'

interface Props {
  errors: FieldErrors<ProfileFormData>
  register: UseFormRegister<ProfileFormData>
}

export default function BioTextarea({ errors, register }: Props) {
  return (
    <div className="mb-4">
      <label htmlFor="profile-bio" className="block font-medium text-lg mb-1">
        소개
      </label>
      <textarea
        id="profile-bio"
        autoComplete="off"
        aria-describedby={errors.bio ? 'profile-bio-error' : undefined}
        {...register('bio')}
        rows={3}
        className="w-full p-3 border rounded focus:outline-none focus:ring border-gray-300 focus:ring-emerald-300 resize-none"
        placeholder="자신을 간단히 소개해 주세요"
      />
      {errors.bio && (
        <div
          id="profile-bio-error"
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {errors.bio.message}
        </div>
      )}
    </div>
  )
}
