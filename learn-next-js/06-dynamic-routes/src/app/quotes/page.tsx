import { Section } from '@/components'
import { fetchQuotes } from './api'

export default async function QuotesPage() {
  const { quotes } = await fetchQuotes()

  return (
    <Section title="인용 구문 목록">
      <output>총 인용 구문의 갯수 {quotes.length}개</output>
    </Section>
  )
}
