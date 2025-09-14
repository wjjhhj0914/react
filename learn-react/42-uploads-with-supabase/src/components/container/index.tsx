import { type PropsWithChildren, memo } from 'react'
import { tw } from '@/utils'
import S from './style.module.css'

function Container({
  className,
  children,
}: PropsWithChildren<{ className: string }>) {
  return <div className={tw(S.container, className)}>{children}</div>
}

export default memo(Container)
