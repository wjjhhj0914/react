import { apiKey, KAKAO_BOOKS_API } from './constants'
import type { KakaoBooksQuery, KakaoBooksQueryResults } from './types'

const fetchBooks = async ({
  query,
  sort = 'accuracy',
  page = 1,
  size = 10,
  target = 'title',
}: KakaoBooksQuery): Promise<KakaoBooksQueryResults> => {
  const searchParams = new URLSearchParams({
    query,
    sort,
    page: page.toString(),
    size: size.toString(),
    target,
  })

  const booksEndpoint = `${KAKAO_BOOKS_API}${searchParams.toString()}`

  const response = await fetch(booksEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  const responseData = await response.json()

  if (!response.ok) {
    throw new Error(responseData)
  }

  return responseData
}

export default fetchBooks
