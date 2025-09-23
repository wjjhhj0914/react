import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '로그인',
  description: '런메이트(LearnMate) 서비스에 로그인해 재미나게 공부하세요.',
}

export default function SignInPage() {
  return (
    <Section title="로그인 페이지">
      <p>로그인 페이지 방문</p>
    </Section>
  )
}
