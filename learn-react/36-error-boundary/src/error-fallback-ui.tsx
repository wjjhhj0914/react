import { type ErrorInfo } from 'react'

export interface FallbackRenderProps {
  error?: Error
  errorInfo?: ErrorInfo
}

export default function ErrorFallbackUI({
  error,
  errorInfo,
}: FallbackRenderProps) {
  return (
    <div role="alert" className="bg-red-800 text-white p-10">
      <h2>오류 발생! {error?.message}</h2>
      <p>컴포넌트 스택: {errorInfo?.componentStack}</p>
      <p>컴포넌트 다이제스트: {errorInfo?.digest}</p>
    </div>
  )
}
