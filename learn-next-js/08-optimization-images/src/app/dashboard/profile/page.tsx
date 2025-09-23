import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '프로필',
}

export default function DashboardProfile() {
  return (
    <Section title="대시보드 프로필 페이지">
      <p>대시보드 / 프로필 페이지 방문</p>
    </Section>
  )
}
