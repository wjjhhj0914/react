import { ComponentProps } from 'react'
import { tw } from '@/utils'
import usePageQuery from '../hooks/use-page-query'
import Link from './link'

export default function NavLink({
  href,
  className,
  ...restProps
}: ComponentProps<'a'>) {
  const page = usePageQuery('suspense')

  const isActivePage = page === href?.replace(/^\//, '')

  return (
    <Link
      href={href}
      className={tw(className, isActivePage && 'text-emerald-700 font-medium')}
      {...restProps}
    />
  )
}
