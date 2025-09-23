import type { PropsWithChildren } from 'react'
import { Link } from '@/components'

export default function QuoteSingleLayout({ children }: PropsWithChildren) {
  console.log('QuoteSingleLayout 레이아웃 렌더링')

  return (
    <div>
      <nav>
        <Link href="/quotes" className="block p-2 bg-slate-50 text-slate-950">
          ← 인용 목록
        </Link>
      </nav>
      {children}
    </div>
  )
}
