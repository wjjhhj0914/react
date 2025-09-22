// 리액트의 use 함수 활용
// const { quotes } = use<QuoteResponse>(
//   fetch('https://dummyjson.com/quotes').then((response) => response.json())
// )

// --------------------------------------------------------------------------

import type { QuoteResponse } from './types'

// 데이터 가져오기 비동기 함수
export const fetchQuotes = async (): Promise<QuoteResponse['quotes']> => {
  // 서버 컴포넌트의 데이터 가져오기 (✅ 권장!!! 정적 렌더링 1회)
  const response = await fetch('https://dummyjson.com/quotes')
  const { quotes } = await response.json()

  return quotes
}
