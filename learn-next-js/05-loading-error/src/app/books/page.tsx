/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { Section } from '@/components'
import { fetchKakaoBooks } from './api'

export const metadata: Metadata = {
  title: '도서 목록',
  description: '런메이트(LearnMate)가 추천하는 도서 목록을 확인하세요.',
}

// 리액트 서버 컴포넌트
export default async function BooksPage() {
  const { documents } = await fetchKakaoBooks({ query: '리액트' })

  return (
    <Section title="도서 목록 페이지">
      <p>도서 목록 페이지 방문</p>
      <ul className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {documents.map(({ isbn, thumbnail, title, status, price }) => (
          <li key={isbn} className="p-2 border-1 border-slate-300">
            <figure>
              <img src={thumbnail} alt="" width={120} height={120} />{' '}
              <h3>{title}</h3>
              <span>{price.toLocaleString()}원</span> | <span>{status}</span>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
