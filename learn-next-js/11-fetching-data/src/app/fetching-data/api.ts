export interface User {
  id: string
  name: string
  email: string
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Supabase에서 사용자 목록 가져오기에 실패했습니다.')
  }

  return response.json()
}
