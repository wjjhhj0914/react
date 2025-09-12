import type { PropsWithChildren } from 'react'
import { tw } from '@/utils'
import S from './style.module.css'

export default function Container({
  className,
  children,
}: PropsWithChildren<{ className: string }>) {
  return <div className={tw(S.container, className)}>{children}</div>
}
