import { type PropsWithChildren } from 'react'
// createPortal은 react-dom에서 꺼내오는 API임!
import { createPortal } from 'react-dom'

export default function AlertPortal({
  message,
  children,
}: PropsWithChildren<{
  message?: string
}>) {
  // Next.js에는 Rendering Boundary(Server / Client Component)가 있음
  // 지금 작성한 것은 server side에 대한 대응인 코드 (SSR)
  // 클라이언트 측에 대한 대비!
  // if (typeof document === 'undefined') return null

  // 문서에 없을 가능성에 대한 대비!
  const alertPortal = document.getElementById('alert-portal')
  if (!alertPortal) return null

  return createPortal(
    <div className="p-6 border-2 border-indigo-600 text-indigo-700 font-semibold">
      <h2>{children}</h2>
    </div>,
    // null일 가능성이 있다. index.html에 있다는 보장을 어떻게 하냐?
    alertPortal
  )
}
