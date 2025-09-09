import { useCallback, useMemo, useState } from 'react'
import { tw } from '@/utils'

export default function useCounter({
  step = 1,
  min = 0,
  max = 10,
  count: initialCount = 0,
} = {}) {
  // 상태
  const [count, setCount] = useState<number>(initialCount)

  // 상태 업데이트 감소 기능(함수)
  const handleDecrement = useCallback(() => {
    setCount((count) => {
      const nextCount = count - step
      if (nextCount < min) return min
      return nextCount
    })
  }, [min, step])

  // 상태 업데이트 증가 기능(함수)
  const handleIncrement = useCallback(() => {
    setCount((count) => {
      const nextCount = count + step
      if (nextCount > max) return max
      return nextCount
    })
  }, [max, step])

  // 버튼 스타일링(클래스 이름)
  const buttonClasses = useMemo(
    () =>
      tw(
        'cursor-pointer select-none',
        'grid place-content-center',
        'size-12 border-3 border-white',
        'text-4xl bg-transparent text-white',
        'disabled:cursor-not-allowed disabled:border-current disabled:text-gray-600'
      ),
    []
  )

  const isMin = count === min
  const isMax = count === max

  return {
    count,
    set: setCount,
    plus: handleIncrement,
    minus: handleDecrement,
    buttonStyles: buttonClasses,
    isMin,
    isMax,
  }
}
