import { Link, Section } from '@/components'
import { fetchQuotes } from './api'

export default async function QuotesPage() {
  const { quotes } = await fetchQuotes()

  return (
    <Section title="인용 구문 목록">
      <output>총 인용 구문의 갯수 {quotes.length}개</output>
      <ul className="flex flex-col gap-y-3">
        {quotes.slice(0, 13).map(({ id, quote }) => (
          <li key={id}>
            <Link href={`/quotes/${id}`} className="text-blue-500">
              {quote}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
