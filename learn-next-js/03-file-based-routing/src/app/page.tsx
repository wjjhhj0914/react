import { Section } from '@/components'

export default function HomePage() {
  return (
    <Section
      title={
        <>
          <em className="text-pink-600 not-italic">홈</em> 페이지
        </>
      }
      className="bg-amber-100"
    >
      <p>홈 페이지 방문</p>
    </Section>
  )
}
