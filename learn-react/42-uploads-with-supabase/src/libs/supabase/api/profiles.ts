import { toast } from 'sonner';
import supabase, { type Profile } from '../index';
import requiredUser from './required-user';

type UserData = Pick<Profile, 'username' | 'bio' | 'email' | 'profile_image'>;

export const getUserDataFromProfileDB = async (): Promise<UserData> => {
  const user = await requiredUser();

  const { error, data } = await supabase
    .from('profiles')
    .select('username, email, bio, profile_image')
    .eq('id', user.id)
    .single();

  if (error) {
    const errorMessage = `로그인된 사용자 정보를 가져올 수 없습니다. ${error.message}`;
    toast.error(errorMessage, {
      cancel: { label: '닫기', onClick: () => console.log('닫기') },
    });
    throw new Error(errorMessage);
  }

  return data;
};
