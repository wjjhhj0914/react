import { useState } from 'react'

interface Props {
  count: number
  targetCount: number
}

export default function Output({ count, targetCount }: Props) {
  const isCompleted = count >= targetCount
  const classNames = `${baseClass} ${isCompleted ? '' : animateClass}`.trim()

  const [error, setError] = useState<Error | null>(null)

  // 변수 또는 함수명 오타
  // 특정한 상황에서 렌더링에 오류 유발
  // try ~ catch를 사용해서 오류를 잡을 수 있지 않을까?
  try {
    tryFn()
  } catch (error) {
    setError(error as Error)
  }

  if (error) {
    return <p role="alert">{error.message}</p>
  }

  return <output className={classNames}>{count}</output>
}

const baseClass = `select-none [cursor:inherit] text-[30vh] font-['Spoqa_Han_Sans_Neo'] font-thin leading-none`
const animateClass = 'animate-[wiggle_600ms_infinite_alternate]'

const tryFn = () => {
  throw new Error('렌더링 오류')
}
