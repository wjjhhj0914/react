// --------------------------------------------------------------------------
// 타입

type State<T> = T[]

type Action<T> =
  | { type: typeof ACTION.SET; payload: T[] }
  | { type: typeof ACTION.PUSH; payload: T[] }
  | { type: typeof ACTION.UNSHIFT; payload: T[] }
  | { type: typeof ACTION.REPLACE; payload: { index: number; item: T } }
  | { type: typeof ACTION.FILTER; payload: FilterFunction<T> }
  | { type: typeof ACTION.REMOVE; payload: number }
  | { type: typeof ACTION.RESET }
  | { type: typeof ACTION.CLEAR }

export type FilterFunction<T> = (value: T, index: number, array: T[]) => boolean

// --------------------------------------------------------------------------
// 리듀서

export function arrayReducer<T>(state: State<T>, action: Action<T>): State<T> {
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
} as const

// --------------------------------------------------------------------------
// 액션 크리에이터

export const setAction = <T>(nextArray: T[]): Action<T> => ({
  type: ACTION.SET,
  payload: nextArray,
})

export const pushAction = <T>(newItems: T[]): Action<T> => ({
  type: ACTION.PUSH,
  payload: newItems,
})

export const unshiftAction = <T>(newItems: T[]): Action<T> => ({
  type: ACTION.UNSHIFT,
  payload: newItems,
})

export const replaceAction = <T>(index: number, item: T): Action<T> => ({
  type: ACTION.REPLACE,
  payload: { index, item },
})

export const filterAction = <T>(filterFn: FilterFunction<T>): Action<T> => ({
  type: ACTION.FILTER,
  payload: filterFn,
})

export const removeAction = <T>(index: number): Action<T> => ({
  type: ACTION.REMOVE,
  payload: index,
})

export const resetAction = <T>(): Action<T> => ({
  type: ACTION.RESET,
})

export const clearAction = <T>(): Action<T> => ({
  type: ACTION.CLEAR,
})
