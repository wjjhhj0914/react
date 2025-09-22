import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { metadata as RootMetadata } from '@/app/layout'

export const metadata: Metadata = {
  title: '대시보드 | LearnMate',
  openGraph: {
    ...RootMetadata.openGraph,
    images: [
      {
        url: '/og_image_dashboard.png',
        alt: 'product update 2025',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <div className="bg-slate-200 flex-1">{children}</div>
}
