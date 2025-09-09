import { Minus, Plus } from 'lucide-react'
import { useCounter } from './hooks'

interface Props {
  count?: number
  step?: number
  min?: number
  max?: number
}

export default function Counter({
  count = 0,
  min = 0,
  max = 10,
  step = 1,
}: Props) {
  const countStore = useCounter({ count, min, max, step })

  return (
    <div className="flex space-x-6 items-center">
      <button
        type="button"
        aria-label="카운트 감소"
        disabled={countStore.isMin}
        onClick={countStore.minus}
        className={countStore.buttonStyles}
      >
        <Minus />
      </button>

      <output className="text-9xl text-white select-none">
        {countStore.count}
      </output>

      <button
        type="button"
        aria-label="카운트 증가"
        disabled={countStore.isMax}
        onClick={countStore.plus}
        className={countStore.buttonStyles}
      >
        <Plus />
      </button>
    </div>
  )
}
