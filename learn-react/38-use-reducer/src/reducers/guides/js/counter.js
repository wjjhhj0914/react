// --------------------------------------------------------------------------
// 액션 타입

const ACTION = {
  INCREAMENT_COUNT: 'INCREAMENT_COUNT',
  DECREAMENT_COUNT: 'DECREAMENT_COUNT',
  RESET_COUNT: 'RESET_COUNT',
}

// --------------------------------------------------------------------------
// 리듀서 함수 (순수 함수)

export default function counterReducer({ count }, { type, payload }) {
  switch (type) {
    case ACTION.DECREAMENT_COUNT: {
      const { step, min } = payload
      let nextCount = count - step
      if (nextCount < min) nextCount = min
      return { count: nextCount }
    }

    case ACTION.INCREAMENT_COUNT: {
      const { step, max } = payload
      let nextCount = count + step
      if (nextCount > max) nextCount = max
      return { count: nextCount }
    }

    case ACTION.RESET_COUNT: {
      return payload
    }

    default: {
      return { count }
    }
  }
}

// --------------------------------------------------------------------------
// 액션 크리에이터 (함수)

export const incrementAction = (payload) => ({
  type: ACTION.INCREAMENT_COUNT,
  payload: payload,
})

export const decrementAction = (payload) => ({
  type: ACTION.DECREAMENT_COUNT,
  payload: payload,
})

export const resetAction = () => ({
  type: ACTION.RESET_COUNT,
})

// --------------------------------------------------------------------------
// 초기화 함수

export const init = (initialValue) => ({
  count: initialValue,
})
