import { useState } from 'react'
import Parent from './components/parent'

// [실습]
// React Query의 클라이언트 객체 생성 (전역적으로 쿼리 캐시 관리)

// 최상위 App 컴포넌트
export default function SuspenseAndLazy() {
  // 사용자 입력값(커트오프 기준 숫자) 상태 관리
  const [cutoff, setCutoff] = useState<number>(1)

  return (
    // React Query의 컨텍스트로 하위 컴포넌트에서 쿼리 사용 가능
    <>
      <section className="p-5">
        <h2>Suspense 실습</h2>
        <Parent cutoff={cutoff} setCutoff={setCutoff} />
      </section>
    </>
  )
}
