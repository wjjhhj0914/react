import { useState } from 'react'
import { performanceDelay, tw } from '@/utils'

export default function Pagination() {
  const [page, setPage] = useState(1)

  // [실습]
  // 다음 페이지 버튼을 눌러도 렌더링이 느리므로
  // 사용자는 즉각적인 반응을 기대하기 어렵습니다.
  // 트랜지션을 사용해 사용자 경험(UX)을 개선해봅니다.
  //
  // 사용자가 다음 버튼을 여러 번 클릭할 경우,
  // 상태 업데이트가 중복되어 큐(대기열)에 쌓인 후
  // 나중에 쌓인 것들이 순차적으로 실행되므로
  // 사용자 경험이 좋지 않습니다.
  //
  // 트랜지션 중에는 버튼을 비활성화하여
  // 중복 클릭을 방지하는 것이 좋습니다.

  const nextPage = () => {
    setPage((p) => p + 1)
  }

  return (
    <div>
      <button
        type="button"
        className={tw(
          'cursor-pointer',
          'my-2 px-3 py-1 rounded',
          'bg-black text-white',
          'text-sm transition-transform'
        )}
        onClick={nextPage}
      >
        다음 페이지
      </button>
      <Page page={page} />
    </div>
  )
}

function Page({ page }: { page: number }) {
  const items = Array.from(
    { length: 2000 },
    (_, i) => `페이지 ${page} - 항목 ${i + 1}`
  )

  return (
    <ul
      className={tw(
        'overflow-y-scroll h-50 p-2',
        'flex flex-col space-y-1',
        'w-xs md:w-sm rounded border-slate-300 border-1',
        'transition-opacity'
      )}
    >
      {items.slice(0, 20).map((item) => (
        <PageItem key={item} item={item} />
      ))}
    </ul>
  )
}

function PageItem({ item }: { item: string }) {
  performanceDelay(30)
  return <li>{item}</li>
}
