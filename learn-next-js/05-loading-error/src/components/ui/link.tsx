'use client'

import { type ComponentProps, type ReactNode, useState } from 'react'
import NextLink from 'next/link'

type Props = ComponentProps<typeof NextLink> & {
  href: string
  children: ReactNode
  'aria-label'?: string
  'aria-current'?:
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
    | 'false'
  'aria-describedby'?: string
  'aria-details'?: string
  'aria-disabled'?: boolean | 'true' | 'false'
  'aria-hidden'?: boolean | 'true' | 'false'
}

export default function Link({ href, children, ...props }: Props) {
  const [active, setActive] = useState<boolean>(false)

  return (
    <NextLink
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
      {...props}
    >
      {children}
    </NextLink>
  )
}
