import type { Draft } from 'immer'
import type { Todo } from '@/libs/supabase'

// --------------------------------------------------------------------------
// 타입

export interface State {
  // 서버 측 데이터(server data) 상태
  todos: Todo[]
  optimisticTodos: Todo[]
  // 클라이언트 측 데이터(client data) 상태
  search: string
  hiddenDoneTodos: boolean
}

export type Action =
  | { type: typeof ACTION_TYPE.SET_TODOS; payload: { todos: Todo[] } }
  | { type: typeof ACTION_TYPE.ADD_TODO; payload: { newTodo: Todo } }
  | { type: typeof ACTION_TYPE.REMOVE_TODO; payload: { removeId: Todo['id'] } }
  | { type: typeof ACTION_TYPE.EDIT_TODO; payload: { editTodo: Todo } }
  | {
      type: typeof ACTION_TYPE.SEARCH_TODOS
      payload: { search: State['search'] }
    }
  | { type: typeof ACTION_TYPE.TOGGLE_DONE }
  | { type: typeof ACTION_TYPE.OPTIMISTIC_ROLLBACK }

// --------------------------------------------------------------------------

// 액션 타입
export const ACTION_TYPE = {
  SET_TODOS: '@todolist/set-todos',
  ADD_TODO: '@todolist/add',
  REMOVE_TODO: '@todolist/remove',
  EDIT_TODO: '@todolist/edit',
  SEARCH_TODOS: '@todolist/search-todos',
  TOGGLE_DONE: '@todolist/toggle-done-todos',
  OPTIMISTIC_ROLLBACK: '@todolist/optimistic-rollback',
} as const

// --------------------------------------------------------------------------
// 액션 크리에이터

export const setTodosAction = (todos: Todo[]): Action => ({
  type: ACTION_TYPE.SET_TODOS,
  payload: { todos },
})

export const addTodoAction = (newTodo: Todo): Action => ({
  type: ACTION_TYPE.ADD_TODO,
  payload: { newTodo },
})

export const removeTodoAction = (removeId: Todo['id']): Action => ({
  type: ACTION_TYPE.REMOVE_TODO,
  payload: { removeId },
})

export const editTodoAction = (editTodo: Todo): Action => ({
  type: ACTION_TYPE.EDIT_TODO,
  payload: { editTodo },
})

export const searchTodosAction = (search: State['search']): Action => ({
  type: ACTION_TYPE.SEARCH_TODOS,
  payload: { search },
})

export const toggleDoneAction = (): Action => ({
  type: ACTION_TYPE.TOGGLE_DONE,
})

export const optimisticRollbackAction = (): Action => ({
  type: ACTION_TYPE.OPTIMISTIC_ROLLBACK,
})

// --------------------------------------------------------------------------
// 리듀서

export function reducer(draft: Draft<State>, action: Action) {
  switch (action.type) {
    case ACTION_TYPE.SET_TODOS: {
      const { todos } = action.payload
      draft.todos = todos
      break
    }

    case ACTION_TYPE.ADD_TODO: {
      const { newTodo } = action.payload
      draft.todos.unshift(newTodo)
      break
    }

    case ACTION_TYPE.REMOVE_TODO: {
      const { removeId } = action.payload
      const index = draft.todos.findIndex((todo) => todo.id === removeId)
      draft.todos.splice(index, 1)
      break
    }

    case ACTION_TYPE.EDIT_TODO: {
      const { editTodo } = action.payload
      const index = draft.todos.findIndex((todo) => todo.id === editTodo.id)
      draft.todos[index] = editTodo
      break
    }

    case ACTION_TYPE.SEARCH_TODOS: {
      const { search } = action.payload
      draft.search = search
      break
    }

    case ACTION_TYPE.TOGGLE_DONE: {
      draft.hiddenDoneTodos = !draft.hiddenDoneTodos
      break
    }

    case ACTION_TYPE.OPTIMISTIC_ROLLBACK:
    default: {
      return draft
    }
  }
}

// --------------------------------------------------------------------------
// 초기화 함수

export const init = (initialState: State) => {
  return getTodoListStorageData() ?? initialState
}

export type Init = ReturnType<typeof init>

// --------------------------------------------------------------------------
// 초깃값

export const initialState: State = {
  todos: [],
  optimisticTodos: [],
  search: '',
  hiddenDoneTodos: false,
}

// --------------------------------------------------------------------------
// 스토리지 데이터 관리

const TODOLIST_KEY = '@todolist'
const { localStorage } = globalThis

const getTodoListStorageData = () => {
  const storageData = localStorage.getItem(TODOLIST_KEY)
  return storageData ? JSON.parse(storageData) : null
}

export const setTodoListStorageData = (newState: State) => {
  localStorage.setItem(TODOLIST_KEY, JSON.stringify(newState))
}

export const removeTodoListStorageData = () => {
  if (!getTodoListStorageData()) return
  localStorage.removeItem(TODOLIST_KEY)
}
