import { type ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import { tw } from '@/utils'

const portalRoot = document.getElementById('event-demo-portal')

export default function Child({
  children,
  ...restProps
}: ComponentProps<'div'>) {
  if (!portalRoot) return null

  return createPortal(
    <div
      role="presentation"
      className={tw(
        'fixed left-0 right-0 bottom-0',
        'p-5 bg-indigo-50 text-indigo-900 text-2xl font-black'
      )}
      {...restProps}
    >
      {children}
    </div>,
    portalRoot
  )
}
