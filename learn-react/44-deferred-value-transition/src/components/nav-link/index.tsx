import { Link, type LinkComponent } from '@tanstack/react-router'
import { MouseEvent, type PropsWithChildren } from 'react'
import { type ClassValue } from 'clsx'
import { tw } from '@/utils'

type Props = Omit<LinkComponent<'a', string>, 'to' | 'className'> &
  PropsWithChildren<{
    href: string
    className?: ClassValue[]
    isPending?: boolean
    onNavigate?: (
      e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
    ) => void
  }>

export default function NavLink({
  href,
  className,
  isPending,
  children,
  onNavigate,
  ...restProps
}: Props) {
  return (
    <Link
      to={href}
      onClick={onNavigate}
      className={tw(
        '[&.active]:font-bold [&.active]:text-amber-300',
        isPending && 'opacity-70',
        className
      )}
      {...restProps}
    >
      {children}
    </Link>
  )
}
