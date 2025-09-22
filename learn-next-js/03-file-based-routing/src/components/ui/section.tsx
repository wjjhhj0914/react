import type { ComponentProps, ReactNode } from 'react'

import { tw } from '../../utils'

type Props = Omit<ComponentProps<'section'>, 'title' | 'className'> & {
  title: ReactNode
  className?: string
}

export default function Section({
  title,
  className,
  children,
  ...restProps
}: Props) {
  return (
    <section
      className={tw(
        'container mx-auto p-5 flex flex-col gap-y-2 items-start',
        className
      )}
      {...restProps}
    >
      <h1 className="text-3xl font-light">{title}</h1>
      {children}
    </section>
  )
}
