import type { PropsWithChildren } from 'react'
import S from './style.module.css'

export default function Container({ children }: PropsWithChildren) {
  return <div className={S.container}>{children}</div>
}
