import type { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <div className="bg-slate-200 flex-1">{children}</div>
}
