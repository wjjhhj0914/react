'use client'

import NextLink from 'next/link'
import { useState, type ComponentProps } from 'react'

type Props = ComponentProps<typeof NextLink>

export default function Link({ href, children, ...restProps }: Props) {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handlePrefetchOn = () => setIsHovering(true)

  return (
    <NextLink
      href={href}
      prefetch={isHovering ? 'auto' : false}
      onMouseEnter={handlePrefetchOn}
      onFocus={handlePrefetchOn}
      {...restProps}
    >
      {children}
    </NextLink>
  )
}
