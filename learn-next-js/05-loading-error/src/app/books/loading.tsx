import { LucideLoaderPinwheel } from 'lucide-react'
import { tw } from '@/utils'

export default function Loading() {
  return (
    <div
      role="status"
      className={tw`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1000
        flex flex-col items-center gap-y-1
        text-slate-700
      `}
    >
      <LucideLoaderPinwheel
        aria-hidden={true}
        strokeWidth={0.5}
        size={64}
        className="animate-spin"
      />
      <p>도서 데이터 로딩 중...</p>
    </div>
  )
}
