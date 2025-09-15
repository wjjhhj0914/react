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

export const updateUserMetadata = async (
  email: Profile['email'],
  username: Profile['username'],
  bio: Profile['bio']
): Promise<void> => {
  if (!email) return;

  const { error: authUpdateError } = await supabase.auth.updateUser({
    email,
    data: { username, bio },
  });

  if (authUpdateError) {
    const errorMessage = `프로필 업데이트 오류 발생! ${authUpdateError.message}`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateProfileTable = async (
  email: Profile['email'],
  username: Profile['username'],
  bio: Profile['bio']
): Promise<Omit<UserData, 'profile_image'>> => {
  const user = await requiredUser();

  const { error, data } = await supabase
    .from('profiles')
    .update({ username, email, bio, updated_at: new Date().toISOString() })
    .eq('id', user.id)
    .select('username, email, bio')
    .single();

  if (error) {
    const errorMessage = `프로필 테이블 업데이트 오류 발생! ${error.message}`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  return data;
};

export const removePreviousProfileImage = async (
  profileImage: string | null
) => {
  const user = await requiredUser();

  if (profileImage) {
    const oldFileName = profileImage.split('/').pop();
    if (oldFileName) {
      const oldFilePath = `${user.id}/${oldFileName}`;
      const { error } = await supabase.storage
        .from('profiles')
        .remove([oldFilePath]);
      if (error) {
        const errorMessage = `이전 프로필 이미지 삭제 오류 발생! ${error.message}`;
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    }
  }
};
