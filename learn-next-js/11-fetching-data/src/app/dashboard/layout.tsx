import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | LearnMate 대시보드',
    default: '대시보드',
  },
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <div className="bg-slate-200 flex-1">{children}</div>
}
