import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
}>

export default function Section({ title, children }: Props) {
  return (
    <section className="container mx-auto p-5 flex flex-col gap-y-2 items-start">
      <h1 className="text-3xl font-light">{title}</h1>
      {children}
    </section>
  )
}
