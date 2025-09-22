import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '회원가입 | LearnMate',
  description: '회원가입하면 더 풍부한 학습이 가능해질 거예요!',
}

export default function SignUpPage() {
  return (
    <Section title="회원가입 페이지">
      <p>회원가입 페이지 방문</p>
    </Section>
  )
}
