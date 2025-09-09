import { Minus, Plus } from 'lucide-react'
import useCounterReducer from './hooks/use-counter.reducer'

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
  const counterStore = useCounterReducer({ count, min, max, step })

  return (
    <div className="flex space-x-6 items-center">
      <button
        type="button"
        aria-label="카운트 감소"
        disabled={counterStore.isMin}
        onClick={counterStore.minus}
        className={counterStore.buttonStyles}
      >
        <Minus />
      </button>

      <output
        role="none"
        onClick={counterStore.reset}
        className="text-9xl text-white"
      >
        {counterStore.state.count}
      </output>

      <button
        type="button"
        aria-label="카운트 증가"
        disabled={counterStore.isMax}
        onClick={counterStore.plus}
        className={counterStore.buttonStyles}
      >
        <Plus />
      </button>
    </div>
  )
}
