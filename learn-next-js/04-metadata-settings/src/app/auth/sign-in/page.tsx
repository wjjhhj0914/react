import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '로그인',
}

export default function SignInPage() {
  return (
    <Section title="로그인 페이지">
      <p>로그인 페이지 방문</p>
    </Section>
  )
}
