import { type Dispatch, type SetStateAction, Suspense } from 'react'
import { LucideLoaderCircle } from 'lucide-react'
import { ErrorBoundary } from '@/components'
import Child from './child'
import ChildWithSuspense from './child-suspense'

interface Props {
  cutoff: number
  setCutoff: Dispatch<SetStateAction<number>>
}

export default function Parent({ cutoff, setCutoff }: Props) {
  return (
    <>
      {/* 입력값이 변경될 때마다 cutoff 상태 업데이트 */}
      <input
        type="number"
        className="input"
        value={cutoff}
        onChange={(e) => setCutoff(Number(e.currentTarget.value))}
      />

      <div className="flex gap-x-16">
        <Child cutoff={cutoff} />

        {/* [실습] 에러 발생 시 보여줄 UI를 ErrorBoundary로 관리 */}
        <ErrorBoundary>
          {/* [실습] 데이터 로딩 중일 때 보여줄 UI를 Suspense로 관리 */}
          <Suspense fallback={<LoadingSpinner />}>
            {/* 실제 데이터 조회 및 리스트 렌더링 */}
            <ChildWithSuspense cutoff={cutoff} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}

function LoadingSpinner() {
  return (
    <div role="status">
      <h2 className="flex gap-x-2 items-center text-emerald-600 text-xs mt-4">
        <LucideLoaderCircle size={24} className=" animate-spin duration-600" />
        데이터 로딩 중...
      </h2>
    </div>
  )
}
