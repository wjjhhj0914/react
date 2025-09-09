// --------------------------------------------------------------------------
// 타입

type Status = 'idle' | 'pending' | 'resolved' | 'rejected'

type State<T> = {
  status: Status
  error: null | Error
  data: null | T
}

type Action<T> =
  | { type: typeof ACTION.PENDING }
  | { type: typeof ACTION.RESOLVED; payload: { data: T } }
  | { type: typeof ACTION.REJECTED; payload: { error: Error } }
  | { type: typeof ACTION.RESET; payload: { initialData: T | null } }

// --------------------------------------------------------------------------
// 리듀서

export function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case ACTION.PENDING: {
      return {
        ...state,
        status: 'pending',
      }
    }

    case ACTION.RESOLVED: {
      return {
        ...state,
        status: 'resolved',
        data: action.payload.data,
      }
    }

    case ACTION.REJECTED: {
      return {
        ...state,
        status: 'rejected',
        error: action.payload.error,
      }
    }

    case ACTION.RESET: {
      return init(action.payload.initialData)
    }

    default: {
      return state
    }
  }
}

// --------------------------------------------------------------------------
// 초기화 함수

export const init = <T = null>(initialData: T | null = null): State<T> => ({
  status: 'idle',
  error: null,
  data: initialData,
})

export const initialState = init()

// --------------------------------------------------------------------------
// 액션

export const ACTION = {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
  RESET: 'RESET',
} as const

// --------------------------------------------------------------------------
// 액션 크리에이터

export const pendingAction = () => ({
  type: ACTION.PENDING,
})

export const resolvedAction = <T>(data: T) => ({
  type: ACTION.RESOLVED,
  payload: { data },
})

export const rejectedAction = <T = Error>(error: T) => ({
  type: ACTION.REJECTED,
  payload: { error },
})

export const resetAction = <T>(initialData: T | null) => ({
  type: ACTION.RESET,
  payload: { initialData },
})
