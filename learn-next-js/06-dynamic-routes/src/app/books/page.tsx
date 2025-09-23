import type { Metadata } from 'next'
import { Link, Section } from '@/components'

export const metadata: Metadata = {
  title: '도서 목록',
  description: '런메이트(LearnMate)가 추천하는 도서 목록을 확인하세요.',
}

export default function BooksPage() {
  return (
    <Section title="추천 도서 목록" className="gap-y-4">
      <ul className="flex gap-x-1">
        <li>
          <Link className="p-2 border-1 border-slate-200" href="/books/next.js">
            Next.js
          </Link>
        </li>
        <li>
          <Link className="p-2 border-1 border-slate-200" href="/books/리액트">
            리액트
          </Link>
        </li>
        <li>
          <Link
            className="p-2 border-1 border-slate-200"
            href="/books/테일윈드"
          >
            테일윈드
          </Link>
        </li>
      </ul>
    </Section>
  )
}
