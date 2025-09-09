export const init = (initialData = null) => ({
  status: 'idle',
  error: null,
  data: initialData,
})

export const ACTION = {
  PENDING: 'PENDING',
  RESOLVE: 'RESOLVE',
  REJECTED: 'REJECTED',
  RESET: 'RESET',
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTION.PENDING:
      return { ...state, status: 'pending', error: null }
    case ACTION.RESOLVE:
      return { ...state, status: 'resolved', data: action.payload }
    case ACTION.REJECTED:
      return { ...state, status: 'rejected', error: action.error }
    case ACTION.RESET:
      return init(action.initialData)
    default:
      return state
  }
}
