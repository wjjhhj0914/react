import { wait } from '@/utils'
import type { KakaoBooksResponse } from './types'

console.log(process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY)

const headersList = {
  'Content-Type': 'Application/json',
  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
}

interface Options {
  query: string
}

// 데이터 가져오기 비동기 함수
export const fetchKakaoBooks = async ({
  query,
}: Options): Promise<KakaoBooksResponse> => {
  const encodedQuery = encodeURIComponent(query)

  await wait()

  const response = await fetch(
    `https://dapi.kakao.com/v3/search/book?query=${encodedQuery}`,
    {
      headers: headersList,
    }
  )

  if (!response.ok) {
    throw new Error('카카오 도서 API에서 데이터 가져오기에 실패했습니다.')
  }

  return response.json()
}
