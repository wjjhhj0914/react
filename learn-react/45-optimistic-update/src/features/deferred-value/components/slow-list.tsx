import { memo } from 'react'
import { performanceDelay, tw } from '@/utils'

// 슬로우리스트
export function SlowList({ query }: { query: string }) {
  const resource = getResource(query)
  // 데이터가 준비될 때까지 Suspense fallback이 뜸
  const items = resource.read()

  // 일부러 100ms 동안 느리게 처리
  performanceDelay(100)

  return (
    <ul
      className={tw(
        'overflow-y-scroll h-50 p-2',
        'flex flex-col space-y-1',
        'w-xs md:w-sm rounded border-slate-300 border-1'
      )}
    >
      {items.map((item) => (
        <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ul>
  )
}

export const MemoizedSlowList = memo(SlowList)

// 슬로우리스트 플레이스홀더
export function SlowListPlaceholder() {
  return (
    <ul
      className={tw(
        'overflow-y-scroll h-50 p-2',
        'flex flex-col space-y-1',
        'w-xs md:w-sm rounded border-slate-300 border-1'
      )}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <li
          key={index}
          className="h-6 bg-gradient-to-r from-slate-50 to-slate-200 rounded animate-pulse"
        ></li>
      ))}
    </ul>
  )
}

// 쿼리별로 결과를 캐싱
// 검색어로 결과를 찾아서 캐시에 넣어줌
const getResource = (() => {
  const resourceCache: Record<string, { read(): string[] }> = {}

  return (query: string) => {
    if (!resourceCache[query]) {
      resourceCache[query] = wrapPromise(getFakeList(query))
    }
    return resourceCache[query]
  }
})()

// 느린 데이터 fetch 시뮬레이션 함수
// 검색어로 100개의 결과를 1초 후에 만들어줌
const getFakeList = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 쿼리와 관련된 결과 세 개 반환
      resolve(
        Array.from({ length: 100 }).map(
          (_, i) => `아이템 ${i + 1} "<strong>${query}</strong>"`
        )
      )
    }, 1000) // 1초 후 결과 반환
  })
}

// Suspense에서 사용할 수 있도록 Promise를 래핑
// 데이터가 준비될 때까지 기다렸다가, 준비되면 보여줌
function wrapPromise<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let result: T | Error
  const suspender = promise.then(
    (response) => {
      status = 'success'
      result = response // 데이터가 화면에 표시됨
    },
    (error: Error) => {
      status = 'error'
      result = error
    }
  )

  // 외부에서 read()를 호출할 때
  // 준비 중이면: suspender throw → Suspense에서 로딩 화면
  // 에러가 발생하면: 에러 throw → 에러 화면
  // 성공이면: 결과 반환 → 데이터 화면

  return {
    read(): T {
      if (status === 'pending') throw suspender // Suspense가 이걸 받아서 "로딩 중" 화면을 보여줌
      if (status === 'error') throw result // 컴포넌트가 에러를 처리할 수 있음
      return result as T
    },
  }
}
