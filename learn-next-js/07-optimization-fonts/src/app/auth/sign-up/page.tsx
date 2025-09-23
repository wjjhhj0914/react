import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '회원가입',
  description: '런메이트(LearnMate) 서비스에 가입해 재밌게 공부하세요.',
}

export default function SignUpPage() {
  return (
    <Section title="회원가입 페이지">
      <p>회원가입 페이지 방문</p>
    </Section>
  )
}
