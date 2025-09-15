import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '@/contexts/auth'
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
  // 현재 인증된 사용자 정보 가져오기
  const { user } = useAuth()

  // 폼 제출 상태 관리
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // 이미지 업로드 관련 상태 관리
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // 사용자가 선택한 이미지 파일
  const [profileImage, setProfileImage] = useState<string | null>(null) // 현재 프로필 이미지 URL

  // React Hook Form을 사용한 폼 상태 관리
  const {
    register, // 입력 필드 등록 함수
    handleSubmit, // 폼 제출 핸들러
    formState: { errors, isDirty }, // 폼 상태 (에러, 변경 여부)
    reset, // 폼 초기화 함수
  } = useForm<ProfileFormData>({
    mode: 'onChange', // 입력값 변경 시마다 유효성 검사 실행
  })

  // 컴포넌트 마운트 시, 사용자 데이터 로드
  useEffect(() => {
    if (user) {
      /**
       * 사용자 프로필 데이터를 가져오는 함수
       * Supabase Database에서 사용자 정보를 조회합니다.
       */
      const fetchUserData = async () => {
        try {
          // [실습]
          // 프로필(profiles) 테이블에서 인증된 사용자 데이터 조회
          // - 'username', 'email', 'bio' 필드 값만 가져오기
          // - 단 하나의 행(row) 데이터만 가져오기
          // - 오류 처리 '로그인된 사용자 정보를 가져올 수 없습니다. {에러.메시지}'
          const data = { username: '', email: '', bio: '', profile_image: null }
          const { username, email, bio, profile_image } = data

          // 폼 필드 초기값 설정
          if (email) {
            reset({
              username,
              email,
              bio,
            })
          }

          // 프로필 이미지 URL이 있으면 상태 업데이트
          if (profile_image) {
            setProfileImage(profile_image)
          }
        } catch (error) {
          console.error('프로필 데이터를 가져오는 중 오류 발생:', error)
        }
      }

      // 사용자 데이터 로드 실행
      fetchUserData()
    }
  }, [reset, user])

  /**
   * 폼 제출 시 실행되는 함수
   * 사용자 프로필 정보와 이미지를 업데이트합니다.
   */
  const onSubmit = async (_formData: ProfileFormData) => {
    if (isSubmitting || !user) return

    setIsSubmitting(true)

    try {
      // [실습]
      // 사용자(user) 메타데이터 업데이트
      // - 폼 데이터 값으로 'email', 'data.username', 'data.bio' 업데이트
      // - 오류 처리 '프로필 업데이트 오류 발생! {오류.메시지}' -> 오류 발생 시, 함수 종료

      // [실습]
      // 프로필(profiles) 테이블 업데이트
      // - 폼 데이터로 'username', 'email', 'bio', 'updated_at' 업데이트
      // - 인증된 사용자의 프로필 행을 찾아 업데이트
      // - 오류 처리 '프로필 테이블 업데이트 오류 발생! {오류.메시지}' -> 오류 발생 시, 함수 종료

      // [실습]
      // 선택한 프로필 이미지 파일 업로드
      // - selectedFile 또는 user 정보 확인
      // - 파일 확장자(extension) 추출
      // - 고유 파일명 생성 (UUID 또는 crypto 활용)
      // - 파일 경로 지정 (`{사용자ID}/{파일명}`)
      // - Supabase 스토리지 'profiles' 버킷에 파일 업로드
      // - 업로드된 파일 공개 URL 가져오기
      // - 프로필(profiles) 테이블의 'profile_image' 필드 업데이트
      // - 성공 메시지 표시 및 상태 업데이트
      if (selectedFile) {
        const uploadProfileImage = async () => {
          if (!selectedFile || !user) return

          try {
            // 이전 프로필 이미지가 있으면 삭제
            if (profileImage) {
              const oldFileName = profileImage.split('/').pop()
              if (oldFileName) {
                const oldFilePath = `${user.id}/${oldFileName}`
                // [실습]
                // supabase 스토리지 'profiles' 버킷에서 이전 프로필 이미지 삭제
                console.log(oldFilePath)
              }
            }

            // 파일 확장자 추출
            const fileExt = selectedFile.name.split('.').pop()

            // 고유 파일명 생성
            const fileName = `${uuidv4()}.${fileExt}`
            const filePath = `${user.id}/${fileName}`

            // [실습]
            // supabase 스토리지 'profiles' 버킷에 파일 경로로 선택된 파일 업로드
            // - 오류 처리 '이미지 업로드 실패! {오류.메시지}'
            console.log(filePath)

            // [실습]
            // 업로드된 파일의 공개 URL 가져오기
            // - supabase 스토리지 'profiles' 버킷에서 파일 경로로 공개된 URL 가져오기
            const data = { publicUrl: '' }
            const { publicUrl } = data

            // [실습]
            // 프로필(profiles) 테이블의 이미지 URL 업데이트
            // - 인증된 사용자 행에 profile_image 필드에 업데이트
            // - 오류 처리 '프로필 이미지 URL 저장 실패! {오류.메시지}' -> 오류 발생 시, 함수 종료

            // 상태 업데이트
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

      // 폼 필드 업데이트 및 성공 메시지 표시
      toast.success('프로필이 성공적으로 업데이트되었습니다!')
    } catch (error) {
      toast.error('프로필 업데이트 중 오류가 발생했습니다.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 사용자가 로그인되어 있지 않은 경우 안내 메시지 표시
  if (!user) {
    return (
      <section>
        <h2 className="my-0">사용자 정보 없음</h2>
        <p>사용자 정보를 확인하려면 먼저 로그인(Login)하세요.</p>
      </section>
    )
  }

  // 프로필 폼 UI 렌더링
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
