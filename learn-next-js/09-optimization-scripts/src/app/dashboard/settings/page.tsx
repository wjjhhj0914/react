import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '설정',
}

export default function DashboardSettings() {
  return (
    <Section title="대시보드 설정 페이지">
      <p>대시보드 / 설정 페이지 방문</p>
    </Section>
  )
}
