import type { Metadata } from 'next'
import fetchBooks from '@/app/books/api'
import { Section } from '@/components'
import Books from './components/books'

export const metadata: Metadata = {
  title: '도서 목록',
  description: '런메이트(LearnMate)가 추천하는 도서 목록을 확인하세요.',
}

export default async function BooksPage() {
  const booksData = await fetchBooks({ query: '리액트' })

  return (
    <Section title="도서 목록 페이지">
      <p>도서 목록 페이지 방문</p>
      <Books items={booksData.documents} />
    </Section>
  )
}
