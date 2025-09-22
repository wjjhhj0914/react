import { Section } from '@/components'
import { wait } from '@/utils'

export default async function DashboardPage() {
  await wait()

  return (
    <Section title="대시보드 페이지">
      <p>대시보드 페이지 방문</p>
    </Section>
  )
}
