// --------------------------------------------------------------------------
// 인터페이스 & 타입

interface State {
  count: number
}

type Action =
  | {
      type: typeof ACTION.DECREAMENT_COUNT
      payload: { step: number; min: number }
    }
  | {
      type: typeof ACTION.INCREAMENT_COUNT
      payload: { step: number; max: number }
    }
  | {
      type: typeof ACTION.RESET_COUNT
    }

// --------------------------------------------------------------------------
// 액션 타입

const ACTION = {
  INCREAMENT_COUNT: 'INCREAMENT_COUNT',
  DECREAMENT_COUNT: 'DECREAMENT_COUNT',
  RESET_COUNT: 'RESET_COUNT',
} as const

// --------------------------------------------------------------------------
// 리듀서 함수 (순수 함수)

export default function counterReducer(state: State, action: Action) {
  switch (action.type) {
    case ACTION.DECREAMENT_COUNT: {
      const { step, min } = action.payload
      let nextCount = state.count - step
      if (nextCount < min) nextCount = min
      return { count: nextCount }
    }

    case ACTION.INCREAMENT_COUNT: {
      const { step, max } = action.payload
      let nextCount = state.count + step
      if (nextCount > max) nextCount = max
      return { count: nextCount }
    }

    case ACTION.RESET_COUNT: {
      return state
    }

    default: {
      return state
    }
  }
}

// --------------------------------------------------------------------------
// 액션 크리에이터 (함수)

export const decrementAction = (step: number, min: number) => ({
  type: ACTION.DECREAMENT_COUNT,
  payload: { step, min },
})

export const incrementAction = (step: number, max: number) => ({
  type: ACTION.INCREAMENT_COUNT,
  payload: { step, max },
})

export const resetAction = () => ({
  type: ACTION.RESET_COUNT,
})

// --------------------------------------------------------------------------
// 초기화 함수

export const init = (initialValue: number): State => ({
  count: initialValue,
})
