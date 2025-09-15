import { ComponentProps, MouseEvent } from 'react'
import { tw } from '@/utils'
import navigate from '../utils/navigate'

export default function Link({
  href,
  className,
  children,
  ...restProps
}: ComponentProps<'a'>) {
  const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(href?.replace(/^\//, '') ?? 'todos')
  }

  return (
    <a
      href={href}
      className={tw(
        'flex items-center gap-x-1 p-1.5',
        'no-underline text-inherit',
        'hover:bg-gray-100 rounded',
        className
      )}
      onClick={handleLink}
      {...restProps}
    >
      {children}
    </a>
  )
}
