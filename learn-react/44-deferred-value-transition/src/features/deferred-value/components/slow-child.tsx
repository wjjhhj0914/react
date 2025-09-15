import { type ComponentProps } from 'react'
import { performanceDelay, tw } from '@/utils'

// [실습]
// 사용자 입력이 즉각 반응하지 않아 UI가 버벅이는 것처럼 느껴집니다.
// 렌더링이 느린 컴포넌트 업데이트를 지연시켜, 사용자 입력에
// 즉각 반응할 수 있게 구성하여 사용자 경혐을 향상시키세요.
function SlowChild({
  query,
  className,
  ...restProps
}: ComponentProps<'p'> & { query: string }) {
  // 성능 지연(0.1s) 시뮬레이션
  performanceDelay(100)

  return (
    <p
      className={tw(
        'flex flex-col space-y-1',
        'text-slate-950 bg-slate-50 p-2',
        'w-xs md:w-sm rounded border-slate-300 border-1',
        className
      )}
      {...restProps}
    >
      <b className="text-base">검색어</b>
      <span className="text-sm">{query}</span>
    </p>
  )
}

export default SlowChild
