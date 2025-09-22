import type { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="bg-amber-300 flex-1">{children}</div>
}
