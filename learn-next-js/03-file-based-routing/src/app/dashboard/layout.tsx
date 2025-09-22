import type { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
  // console.log('대시보드 레이아웃')

  return <div className="bg-slate-200 flex-1">{children}</div>
}
