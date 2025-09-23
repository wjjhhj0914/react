import { Section } from '@/components'

export default function NotFound() {
  return (
    <Section title="인용 구문을 찾을 수 없음">
      <p>
        인용 구문의 라우트 매개변수인 quoteId 값은 1 ~ 1454 까지만 허용됩니다.
      </p>
    </Section>
  )
}
