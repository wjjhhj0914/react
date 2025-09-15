import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SearchForm } from '@/features/deferred-value'

function Page() {
  const [query, setQuery] = useState<string>('')

  return (
    <>
      <title>지연된 값 (Deferred Value)</title>
      <section className="my-2">
        <h2 className="text-[22px] font-semibold">
          지연된 값 (Deferred Value)
        </h2>
        <div className="my-2 flex flex-col gap-y-2 text-gray-700">
          <p>
            지연된 값(Deferred Value)은 UI 응답성을 유지하면서 무거운 연산이나
            렌더링을 지연시켜, 사용자 입력에 즉각적으로 반응하게 해주는
            패턴입니다.
          </p>
          <p>
            특히 검색이나 필터링 같은 실시간 업데이트가 필요한 기능에서 UI가
            버벅거리는 것을 방지합니다.
          </p>
        </div>

        <SearchForm query={query} setQuery={setQuery} />

        <div className="flex flex-col space-y-5">
          {/* <SlowChild query={query} /> */}
          {/* <FilterList query={query} /> */}
          {/* 지연된 값과 Suspense를 결합해 이전 값을 표시 */}
          {/* <SlowList query={query} /> */}
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/deferred-value')({
  component: Page,
})
