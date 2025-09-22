import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '도서 목록',
  description: '런메이트(LearnMate)가 추천하는 도서 목록을 확인하세요.',
}

export default function BooksPage() {
  return (
    <Section title="도서 목록 페이지">
      <p>도서 목록 페이지 방문</p>
    </Section>
  )
}
