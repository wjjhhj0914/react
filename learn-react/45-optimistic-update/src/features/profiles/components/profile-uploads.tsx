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
import {
  removePreviousProfileImage,
  removeProfileStorage,
  resetProfileTable,
  updateProfilImage,
  uploadProfilePublicUrl,
} from '@/libs/supabase/api/profiles'
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
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files && files.length > 0) setSelectedFile(files[0])
  }

  const removeSelectedFile = () => setSelectedFile(null)

  const uploadProfileImage = async () => {
    if (!user || !selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      if (profileImage) await removePreviousProfileImage(profileImage)

      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10
          return newProgress >= 90 ? 90 : newProgress
        })
      }, 300)

      const publicUrl = await uploadProfilePublicUrl(filePath, selectedFile)

      clearInterval(progressInterval)

      await updateProfilImage(publicUrl)

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

  const removeProfileImage = async () => {
    if (!user || !profileImage) return

    try {
      const fileName = profileImage.split('/').pop() || ''
      const filePath = `${user.id}/${fileName}`

      await removeProfileStorage(filePath)
      await resetProfileTable()

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
                  aria-label="프로필 이미지 삭제"
                  title="프로필 이미지 삭제"
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
