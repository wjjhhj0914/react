import { type ComponentProps, memo } from 'react'
import { performanceDelay, tw } from '@/utils'

type Props = ComponentProps<'p'> & {
  query: string
  isPending?: boolean
}

// [실습]
// 사용자 입력이 즉각 반응하지 않아 UI가 버벅이는 것처럼 느껴집니다.
// 렌더링이 느린 컴포넌트 업데이트를 지연시켜, 사용자 입력에
// 즉각 반응할 수 있게 구성하여 사용자 경혐을 향상시키세요.
//
// useDeferredValue() + memo() 조합 = 즉각적인 UI / 지연된 렌더링 UI 분리 관리

function SlowChild({ query, className, isPending, ...restProps }: Props) {
  // 성능 지연(0.1s) 시뮬레이션
  performanceDelay(100)

  return (
    <p
      className={tw(
        'flex flex-col space-y-1',
        'text-slate-950 bg-slate-50 p-2',
        'w-xs md:w-sm rounded border-slate-300 border-1',
        // isPending && 'opacity-50',
        className
      )}
      {...restProps}
    >
      <b className="text-base">검색어 {isPending && '(지연됨)'}</b>
      <span className="text-sm">{query}</span>
    </p>
  )
}

// 이전에 전달된 props와 현재 전달된 props 비교
// 비교한 결과 변화가 없다면 렌더링 안함
// 다만, 얕은 비교를 수행하므로
// props가 깊은 비교를 요하는 객체 또는
// 배열인 경우, 고급 비교가 필요
// export default SlowChild
export default memo(SlowChild)
