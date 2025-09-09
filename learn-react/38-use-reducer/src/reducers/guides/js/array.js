// --------------------------------------------------------------------------
// 리듀서

export function arrayReducer(state, action) {
  switch (action.type) {
    case ACTION.SET: {
      return action.payload
    }

    case ACTION.PUSH: {
      const newItems = action.payload
      return [...state, ...newItems]
    }

    case ACTION.UNSHIFT: {
      const newItems = action.payload
      return [...newItems, ...state]
    }

    case ACTION.REPLACE: {
      const { index, item } = action.payload
      return state.map((arrayItem, i) => (index === i ? item : arrayItem))
    }

    case ACTION.FILTER: {
      return state.filter(action.payload)
    }

    case ACTION.REMOVE: {
      return state.filter((_, i) => i !== action.payload)
    }

    case ACTION.RESET: {
      return state
    }

    case ACTION.CLEAR: {
      return []
    }

    default: {
      return state
    }
  }
}

// --------------------------------------------------------------------------
// 액션

export const ACTION = {
  SET: 'SET',
  PUSH: 'PUSH',
  UNSHIFT: 'UNSHIFT',
  REPLACE: 'REPLACE',
  FILTER: 'FILTER',
  REMOVE: 'REMOVE',
  RESET: 'RESET',
  CLEAR: 'CLEAR',
}

// --------------------------------------------------------------------------
// 액션 크리에이터

export const setAction = (nextArray) => ({
  type: ACTION.SET,
  payload: nextArray,
})

export const pushAction = (newItems) => ({
  type: ACTION.PUSH,
  payload: newItems,
})

export const unshiftAction = (newItems) => ({
  type: ACTION.UNSHIFT,
  payload: newItems,
})

export const replaceAction = (index, item) => ({
  type: ACTION.REPLACE,
  payload: { index, item },
})

export const filterAction = (filterFn) => ({
  type: ACTION.FILTER,
  payload: filterFn,
})

export const removeAction = (index) => ({
  type: ACTION.REMOVE,
  payload: index,
})

export const resetAction = () => ({
  type: ACTION.RESET,
})

export const clearAction = () => ({
  type: ACTION.CLEAR,
})
