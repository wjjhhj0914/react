// import { use } from 'react'
import type { Metadata } from 'next'
import { Section } from '@/components'
import type { QuoteResponse } from './types'

export const metadata: Metadata = {
  title: '도서 목록',
  description: '런메이트(LearnMate)가 추천하는 도서 목록을 확인하세요.',
}

// 리액트의 use 함수 활용
// const { quotes } = use<QuoteResponse>(
//   fetch('https://dummyjson.com/quotes').then((response) => response.json())
// )

// 리액트 서버 컴포넌트
export default async function BooksPage() {
  // 서버 컴포넌트의 데이터 가져오기 (✅ 권장!!! 정적 렌더링 1회)
  const response = await fetch('https://dummyjson.com/quotes')
  const { quotes } = (await response.json()) as QuoteResponse

  return (
    <Section title="도서 목록 페이지">
      <p>도서 목록 페이지 방문</p>
      <ul className="flex flex-col gap-y-4">
        {quotes.map(({ id, quote }) => (
          <li key={id} className="p-2 border-1 border-slate-300">
            {quote}
          </li>
        ))}
      </ul>
    </Section>
  )
}
