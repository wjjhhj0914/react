import { useCallback, useMemo, useReducer } from 'react'
import counterReducer, {
  decrementAction,
  incrementAction,
  init,
  resetAction,
} from '@/reducers/guides/ts/counter'
import { tw } from '@/utils'

export default function useCounterReducer({
  count = 0,
  step = 1,
  min = 0,
  max = 10,
} = {}) {
  const [state, dispatch] = useReducer(counterReducer, count, init)

  const handleDecrement = useCallback(
    () => dispatch(decrementAction(step, min)),
    [min, step]
  )

  const handleIncrement = useCallback(
    () => dispatch(incrementAction(step, max)),
    [max, step]
  )

  const handleReset = useCallback(() => dispatch(resetAction()), [])

  const isMin = state.count === min
  const isMax = state.count === max

  const buttonStyles = useMemo(
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

  return {
    state,
    buttonStyles,
    minus: handleDecrement,
    plus: handleIncrement,
    reset: handleReset,
    isMin,
    isMax,
  }
}
