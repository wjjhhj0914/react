import { type Dispatch, type SetStateAction, Suspense } from 'react'
import Child from './child'

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

      {/* [실습] 에러 발생 시 보여줄 UI를 ErrorBoundary로 관리 */}

      {/* [실습] 데이터 로딩 중일 때 보여줄 UI를 Suspense로 관리 */}

      {/* 실제 데이터 조회 및 리스트 렌더링 */}
      <Child cutoff={cutoff} />
    </>
  )
}
