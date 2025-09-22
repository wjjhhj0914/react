import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: {},
}

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="bg-amber-300 flex-1">{children}</div>
}
