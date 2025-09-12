import type { User } from '@supabase/supabase-js';
import supabase from '..';
import { toast } from 'sonner';

// 사용자 (세션) 정보 가져오기
const requiredUser = async (): Promise<User> => {
  const { error, data } = await supabase.auth.getUser();

  if (error) {
    const errorMessage = '로그인이 필요합니다!';
    toast.error(`${errorMessage} ${error.message}`);
    throw new Error(errorMessage);
  }

  const { user } = data;
  return user;
};

export default requiredUser;
