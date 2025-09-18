import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useDeferredValue, useState } from 'react'
import {
  FilterList,
  MemoizedSlowList,
  SearchForm,
  SlowChild,
  SlowList,
  SlowListPlaceholder,
} from '@/features/deferred-value'

// import { tw } from '@/utils'

function Page() {
  // 즉각 반응하는 상태
  const [query1, setQuery1] = useState<string>('')
  const [query2, setQuery2] = useState<string>('')
  // 지연된 값 (즉각 반응하는 상태에 의존)
  const deferredQuery2 = useDeferredValue(query2, '')
  // 파생된 상태
  const isPending = query2 !== deferredQuery2

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

        {/* <SearchForm query={query} setQuery={setQuery} /> */}

        <div className="flex flex-col space-y-5">
          {/* <SlowChild query={deferredQuery} isPending={isPending} /> */}
          {/* <FilterList
            query={deferredQuery}
            className={tw({ 'bg-slate-100 text-slate-600': isPending })}
          /> */}

          {/* 지연된 값과 Suspense를 결합해 이전 값을 표시 */}
          <div className="flex flex-col lg:flex-row gap-x-8">
            <div className="space-y-2">
              <SearchForm query={query1} setQuery={setQuery1} />
              <h2>지연값 사용 안함 / 메모 안됨</h2>
              <Suspense fallback={<SlowListPlaceholder />}>
                {isPending || <SlowList query={query1} />}
                {/* <SlowList query={query1} /> */}
              </Suspense>
            </div>

            <div className="space-y-2">
              <SearchForm query={query2} setQuery={setQuery2} />
              <h2>지연값 사용 / 메모됨 {isPending ? '(지연 처리 중)' : ''}</h2>
              <Suspense fallback={<SlowListPlaceholder />}>
                <MemoizedSlowList query={deferredQuery2} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/deferred-value')({
  component: Page,
})
