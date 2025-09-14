import type { User } from '@supabase/supabase-js'
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react'
import { LucideTrash, LucideUpload } from 'lucide-react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { tw } from '@/utils'

interface Props {
  user: User
  selectedFile: File | null
  setSelectedFile: Dispatch<SetStateAction<File | null>>
  profileImage: string | null
  setProfileImage: Dispatch<SetStateAction<string | null>>
}

export default function ProfileUploads({
  user,
  selectedFile,
  setSelectedFile,
  profileImage,
  setProfileImage,
}: Props) {
  // 업로드 상태
  const [isUploading, setIsUploading] = useState<boolean>(false)
  // 업로드 진행 상태
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  // 파일 변경 이벤트 핸들러
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files && files.length > 0) setSelectedFile(files[0])
  }

  // 선택된 파일 상태 초기화
  const removeSelectedFile = () => setSelectedFile(null)

  // 프로필 이미지 업로드 기능
  const uploadProfileImage = async () => {
    if (!user || !selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // 기존 이미지가 있으면 삭제
      if (profileImage) {
        const fileName = profileImage.split('/').pop() || ''
        const filePath = `${user.id}/${fileName}`

        // supabase 스토리지 'profiles' 버컷에서 기존 파일 경로 삭제
        console.log(filePath)
      }

      // 파일 확장자 추출 및 고유 파일명 생성
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      // 업로드 진행률 시뮬레이션
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 300)

      // [실습]
      // 파일 업로드
      // - supabase 스토리지 'profiles' 버킷에 파일 경로로 선택된 파일 업로드
      // - 오류 처리 '이미지 업로드 오류 발생! {오류.메시지}' -> 오류 발생 시, 함수 종료
      // - 오류 발생 시, isUploading, uploadProgress 상태 초기화
      console.log(filePath)

      clearInterval(progressInterval)

      // [실습]
      // 업로드된 파일의 공개 URL 가져오기
      // - 파일 경로로 supabase 스토리지 'profiles' 버컷에서 공개된 URL 가져오기
      const data = { publicUrl: '' }
      const { publicUrl } = data

      // [실습]
      // 프로필 테이블의 이미지 URL 업데이트
      // - 인증된 사용자의 프로필(profiles) 데이터베이스 행 'profile_image' 값에 가져온 URL 값 업데이트
      // - 오류 처리 '프로필 이미지 URL 수정 오류 발생! {오류.메시지}' -> 오류 발생 시, 함수 종료
      // - 오류 발생 시, isUploading, uploadProgress 상태 초기화

      // 완료 표시
      setUploadProgress(100)
      setTimeout(() => {
        setProfileImage(publicUrl)
        setSelectedFile(null)
        setIsUploading(false)
        setUploadProgress(0)
        toast.success('프로필 이미지가 업로드되었습니다.')
      }, 500)
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error)
      toast.error('이미지 업로드 중 오류가 발생했습니다.')
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // 프로필 이미지 삭제 기능
  const removeProfileImage = async () => {
    if (!user || !profileImage) return

    try {
      // URL에서 파일 이름 추출
      const fileName = profileImage.split('/').pop() || ''
      const filePath = `${user.id}/${fileName}`

      // [실습]
      // supabase 스토리지 'profiles' 버컷에서 파일 경로 삭제
      // - 오류 처리 '스토리지에서 이미지 삭제 오류 발생! {오류.메시지}' -> 오류 발생 시, 함수 종료
      console.log(filePath)

      // [실습]
      // 프로필(profiles) 데이터베이스 프로필 이미지 경로 값을 null로 업데이트
      // - 인증된 사용자의 행 데이터 업데이트
      // - 오류 처리 '데이터베이스에서 이미지 경로 null 수정 오류 발생! {오류.메시지}' -> 오류 발생 시, 함수 종료

      // 상태 업데이트
      setProfileImage(null)
      toast.success('프로필 이미지가 삭제되었습니다.')
    } catch (error) {
      console.error('이미지 삭제 중 오류:', error)
      toast.error('이미지 삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      {/* 프로필 사진 업로드 영역 */}
      <div className="mb-4">
        <h3 className="block font-medium text-lg mb-1">프로필 사진</h3>
        <div className="border border-gray-300 rounded p-4">
          {/* 현재 프로필 이미지 */}
          {profileImage && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">현재 프로필 사진</h3>
              <div className="relative max-w-[200px] mx-auto">
                <img
                  src={profileImage}
                  alt="프로필 이미지"
                  className="w-full h-auto object-cover rounded"
                />
                <button
                  type="button"
                  onClick={removeProfileImage}
                  className={tw(
                    'absolute top-1 right-1',
                    'grid place-content-center size-8',
                    'bg-black text-white',
                    'rounded-full',
                    'opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity'
                  )}
                  aria-label="이미지 삭제"
                >
                  <LucideTrash size={16} />
                </button>
              </div>
            </div>
          )}

          {/* 선택된 파일 미리보기 */}
          {selectedFile && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">업로드할 사진</h3>
              <div className="relative max-w-[200px] mx-auto">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="선택한 이미지"
                  className="w-full h-auto object-cover rounded"
                />
                <button
                  type="button"
                  onClick={removeSelectedFile}
                  className={tw(
                    'absolute top-1 right-1',
                    'bg-black text-white',
                    'rounded-full grid place-content-center size-7',
                    'opacity-0 hover:opacity-100 focus:opacity-100',
                    'transition-opacity'
                  )}
                  aria-label="선택 취소"
                >
                  <LucideTrash size={16} />
                </button>
              </div>

              {/* 이미지 업로드 버튼 */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={uploadProfileImage}
                  disabled={isUploading}
                  className={tw(
                    'flex items-center justify-center',
                    'w-full bg-emerald-600 text-white py-3 rounded border-0',
                    'hover:bg-emerald-700',
                    'focus:outline-none focus:ring focus:ring-blue-300',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  <LucideUpload size={18} className="mr-2" />
                  {isUploading
                    ? `업로드 중... ${uploadProgress}%`
                    : '지금 업로드하기'}
                </button>
              </div>

              {/* 업로드 진행 상태 표시 */}
              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}

          {/* 파일 선택 입력 필드 */}
          {!selectedFile && (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="profile-image-input"
                className={tw(
                  'relative',
                  'flex flex-col items-center justify-center py-10',
                  'w-full h-40 border-2 border-gray-300 border-dashed rounded-lg',
                  'cursor-pointer bg-gray-50 hover:bg-gray-100',
                  'focus-within:border-emerald-400'
                )}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="m-0 text-sm text-gray-500">
                    <span className="font-semibold">클릭하여 파일 선택</span>{' '}
                    또는 드래그 앤 드롭
                  </p>
                  <p className="m-0 text-xs text-gray-500">
                    PNG, JPG, GIF (최대 10MB)
                  </p>
                  <LucideUpload className="w-8 h-8 mt-3 text-gray-500" />
                </div>
                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer opacity-0 absolute inset-0"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
