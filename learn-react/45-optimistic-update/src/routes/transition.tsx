import { createFileRoute } from '@tanstack/react-router'
import { Pagination, SlowList, Tabs } from '@/features/transition'
import { tw } from '@/utils'

// 트랜지션이 필요한 이유
// - 입력 즉시 반응 vs. 느린 작업 분리
// - UI 멈춤 방지
// - 로딩 표시

function Page() {
  return (
    <>
      <title>트랜지션 (Transition)</title>
      <section className="my-2">
        <h2 className="text-[22px] font-semibold">트랜지션 (Transition)</h2>
        <div className="my-2 flex flex-col gap-y-2 text-gray-700">
          <p>
            트랜지션은 사용자 입력에 즉시 반응하면서도 느린 작업을 분리하여 UI가
            멈추는 것을 방지하고, 로딩 상태를 적절히 표시하기 위해 필요합니다.
          </p>
        </div>

        <div className={tw`flex flex-col lg:flex-row flex-wrap gap-10`}>
          <Pagination />
          <SlowList />
          <Tabs />
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/transition')({
  component: Page,
})
