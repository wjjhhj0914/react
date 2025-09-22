import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '회원가입',
  description:
    '회원 가입하면 OOO 이벤트에 참여할 수 있어 더 풍부한 학습이 가능해질거에요!',
}

export default function SignUpPage() {
  return (
    <Section title="회원가입 페이지">
      <p>회원가입 페이지 방문</p>
    </Section>
  )
}
