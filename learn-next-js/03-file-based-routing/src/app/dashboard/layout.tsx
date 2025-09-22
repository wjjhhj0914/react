import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
  console.log('대시보드 레이아웃')

  return (
    <div className="bg-slate-200 flex-1">
      <nav className="p-5">
        <ul>
          <li>
            <Link
              className="text-sky-600 hover:text-sky-900"
              href="/dashboard/profile"
            >
              대시보드 &gt; 프로필
            </Link>
          </li>
          <li>
            <Link
              className="text-sky-600 hover:text-sky-900"
              href="/dashboard/settings"
            >
              대시보드 &gt; 설정
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}
