import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '@/contexts/auth'
import {
  getUserDataFromProfileDB,
  removePreviousProfileImage,
  updateProfilImage,
  updateProfileTable,
  updateUserMetadata,
  uploadProfilePublicUrl,
} from '@/libs/supabase/api/profiles'
import { tw } from '@/utils'
import BioTextarea from './components/bio-textarea'
import EmailInput from './components/email-input'
import ProfileUploads from './components/profile-uploads'
import UsernameInput from './components/username-input'
import type { ProfileFormData } from './type'

/**
 * 사용자 프로필 관리 컴포넌트
 * 사용자 정보 조회, 수정 및 프로필 이미지 업로드 기능을 제공합니다.
 */
export default function Profile() {
  const { user } = useAuth()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>({
    mode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      /**
       * 사용자 프로필 데이터를 가져오는 함수
       * Supabase Database에서 사용자 정보를 조회합니다.
       */
      const fetchUserData = async () => {
        try {
          const profileData = await getUserDataFromProfileDB()
          if (!profileData) return

          const { username, email, bio, profile_image } = profileData

          if (email) reset({ username, email, bio })

          if (profile_image) {
            setProfileImage(profile_image)
          }
        } catch (error) {
          console.error('프로필 데이터를 가져오는 중 오류 발생:', error)
        }
      }

      fetchUserData()
    }
  }, [reset, user])

  /**
   * 폼 제출 시 실행되는 함수
   * 사용자 프로필 정보와 이미지를 업데이트합니다.
   */
  const onSubmit = async (formData: ProfileFormData) => {
    if (isSubmitting || !user) return

    setIsSubmitting(true)

    try {
      const { email, username, bio } = formData
      await updateUserMetadata(email, username, bio)

      const updatedProfileData = await updateProfileTable(email, username, bio)

      if (updatedProfileData.email) {
        reset({
          username: updatedProfileData.username,
          email: updatedProfileData.email,
          bio: updatedProfileData.bio,
        })
      }

      if (selectedFile) {
        const uploadProfileImage = async () => {
          if (!selectedFile || !user) return

          try {
            await removePreviousProfileImage(profileImage)

            const fileExt = selectedFile.name.split('.').pop()
            const fileName = `${uuidv4()}.${fileExt}`
            const filePath = `${user.id}/${fileName}`

            const publicUrl = await uploadProfilePublicUrl(
              filePath,
              selectedFile
            )

            await updateProfilImage(publicUrl)

            setProfileImage(publicUrl)
            setSelectedFile(null)
            toast.success('프로필 이미지가 업로드되었습니다.')
          } catch (error) {
            console.error('이미지 업로드 중 오류:', error)
            toast.error('이미지 업로드 중 오류가 발생했습니다.')
          }
        }

        await uploadProfileImage()
      }

      toast.success('프로필이 성공적으로 업데이트되었습니다!')
    } catch (error) {
      toast.error('프로필 업데이트 중 오류가 발생했습니다.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <section>
        <h2 className="my-0">사용자 정보 없음</h2>
        <p>사용자 정보를 확인하려면 먼저 로그인(Login)하세요.</p>
      </section>
    )
  }

  return (
    <section aria-labelledby="profile-headline">
      <div className="max-w-lg mx-auto bg-white rounded-lg p-6 mt-0">
        <h2 id="profile-headline" className="text-xl mt-0 text-emerald-700">
          사용자 프로필
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          aria-label="프로필 수정 폼"
          autoComplete="off"
          noValidate
        >
          {/* 사용자 이름 입력 컴포넌트 */}
          <UsernameInput register={register} errors={errors} />

          {/* 이메일 입력 컴포넌트 */}
          <EmailInput register={register} errors={errors} />

          {/* 자기소개 입력 컴포넌트 */}
          <BioTextarea register={register} errors={errors} />

          {/* 프로필 이미지 업로드 컴포넌트 */}
          <ProfileUploads
            user={user}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />

          {/* 프로필 업데이트 버튼 */}
          <button
            type="submit"
            aria-disabled={isSubmitting}
            disabled={(!isDirty && !selectedFile) || isSubmitting}
            className={tw(
              'cursor-pointer',
              'w-full bg-emerald-600 border-1 border-emerald-600 text-white py-3 rounded',
              'hover:not-disabled:bg-emerald-700',
              'focus:bg-emerald-800 focus:border-emerald-800',
              'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            {isSubmitting ? '업데이트 중...' : '프로필 업데이트'}
          </button>
        </form>
      </div>
    </section>
  )
}
