import type { Metadata } from 'next'
import { Section } from '@/components'
import { wait } from '@/utils'
import { fetchQuotes } from './api'

export const metadata: Metadata = {
  title: '도서 목록',
  description: '런메이트(LearnMate)가 추천하는 도서 목록을 확인하세요.',
}

// 리액트 서버 컴포넌트
export default async function BooksPage() {
  await wait(2.2)
  const quotes = await fetchQuotes() // 데이터 가져온 후, 서버에서 렌더링

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
