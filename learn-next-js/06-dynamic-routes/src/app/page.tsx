import { notFound } from 'next/navigation'
import { Section } from '@/components'

// 데이터 가져오기

export default async function HomePage() {
  const quote = await fetch('https://dummyjson.com/quotes/1454').then((res) =>
    res.json()
  )

  if (!('id' in quote)) {
    notFound()
  }
  return (
    <Section title="홈 페이지">
      <p>홈 페이지 방문</p>
    </Section>
  )
}
