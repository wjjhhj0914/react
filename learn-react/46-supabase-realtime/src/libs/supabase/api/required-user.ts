import type { User } from '@supabase/supabase-js'
import { toast } from 'sonner'
import supabase from '../index'

// --------------------------------------------------------------------------
// 사용자 (세션) 정보 가져오기

const requiredUser = async (): Promise<User> => {
  const { error, data } = await supabase.auth.getUser()

  if (error) {
    const errorMessage = '로그인이 필요합니다!'
    toast.error(`${errorMessage} ${error.message}`, {
      cancel: {
        label: '닫기',
        onClick: () => console.log('닫기'),
      },
    })
    throw new Error(errorMessage)
  }

  const { user } = data
  return user
}

export default requiredUser
