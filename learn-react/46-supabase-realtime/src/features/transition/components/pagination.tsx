import { useState, useTransition } from 'react'
import { performanceDelay, tw, wait } from '@/utils'

export default function Pagination() {
  const [page, setPage] = useState<number>(1)

  const nextPage = () => {
    // 즉각적인 반응 처리
    // 리액트! UI에 바로 반영해라!
    setPage((p) => p + 1)
  }

  // --------------------------------------------------------------------------

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

  const [isPending, startTransition] = useTransition()

  // 사용자와 상호작용하는 기능(함수)
  // 이벤트 핸들러(리스너)
  const nextPageTransition = () => {
    // 이벤트 핸들러 = 즉각 반응하는 UI
    console.log('1. 즉시 반응')

    // 트랜지션 시작하라!
    // 액션 함수에서 처리
    startTransition(async () => {
      console.log('2. 트랜지션 시작')

      await wait(1)
      console.log('2.1 wait 함수 실행됨')

      // 렌더링 지연된 UI
      // 상태 업데이트 (리액트를 작동시킴)
      // 비동기 요청 후, 응답 데이터 처리
      setPage((p) => {
        console.log('상태 업데이트')
        return p + 1
      })
    })

    console.log('3. 트래지션 끝')
  }

  console.log('컴포넌트 렌더링: 로딩 상태', isPending)

  // [정리]
  // - startTransition 함수 안에서 실행하는 함수는 액션(Action)
  // - 액션 함수는 상태 업데이트 및 사이드 이펙트(예: 네트워크 요청) 처리 가능
  // - 트랜지션은 액션을 백그라운드에서 처리 (UI 블로킹 없음)
  // - 하나의 트랜지션에 여러 액션 포함 가능 (여러 번 클릭해도 마지막 클릭만 반영)
  // - isPending 상태 값이 true인 경우, "백그라운드에서 작업 중" 임을 나타냄
  // - 모든 액션이 끝나고 상태가 반영되면 isPending 상태 값이 false가 됨

  return (
    <div>
      <div className="flex gap-x-1">
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
          다음 페이지 ( 트랜지션 ❌ )
        </button>
        <button
          type="button"
          className={tw(
            'cursor-pointer',
            'my-2 px-3 py-1 rounded',
            'bg-black text-white',
            'text-sm transition-transform',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
          onClick={nextPageTransition}
          disabled={isPending}
        >
          다음 페이지 ( {isPending ? '트랜지션 중...' : '트랜지션 ✅'} )
        </button>
      </div>
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
  performanceDelay(15)
  return <li>{item}</li>
}
