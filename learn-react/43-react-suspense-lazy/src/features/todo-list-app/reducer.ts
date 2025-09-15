import type { Draft } from 'immer'
import type { Todo } from '@/libs/supabase'

// --------------------------------------------------------------------------
// 타입

export interface State {
  // 서버 측 데이터(server data) 상태
  todos: Todo[]
  // 클라이언트 측 데이터(client data) 상태
  search: string
  hiddenDoneTodos: boolean
}

export type Action =
  | { type: typeof ACTION.SET_TODOS; payload: { todos: Todo[] } }
  | { type: typeof ACTION.ADD_TODO; payload: { newTodo: Todo } }
  | { type: typeof ACTION.REMOVE_TODO; payload: { removeId: Todo['id'] } }
  | { type: typeof ACTION.EDIT_TODO; payload: { editTodo: Todo } }
  | { type: typeof ACTION.SEARCH_TODOS; payload: { search: State['search'] } }
  | { type: typeof ACTION.TOGGLE_DONE }

// --------------------------------------------------------------------------

// 액션 타입
const ACTION = {
  SET_TODOS: '@todolist/set-todos',
  ADD_TODO: '@todolist/add',
  REMOVE_TODO: '@todolist/remove',
  EDIT_TODO: '@todolist/edit',
  SEARCH_TODOS: '@todolist/search-todos',
  TOGGLE_DONE: '@todolist/toggle-done-todos',
} as const

// --------------------------------------------------------------------------
// 액션 크리에이터

export const setTodosAction = (todos: Todo[]): Action => ({
  type: ACTION.SET_TODOS,
  payload: { todos },
})

export const addTodoAction = (newTodo: Todo): Action => ({
  type: ACTION.ADD_TODO,
  payload: { newTodo },
})

export const removeTodoAction = (removeId: Todo['id']): Action => ({
  type: ACTION.REMOVE_TODO,
  payload: { removeId },
})

export const editTodoAction = (editTodo: Todo): Action => ({
  type: ACTION.EDIT_TODO,
  payload: { editTodo },
})

export const searchTodosAction = (search: State['search']): Action => ({
  type: ACTION.SEARCH_TODOS,
  payload: { search },
})

export const toggleDoneAction = (): Action => ({
  type: ACTION.TOGGLE_DONE,
})

// --------------------------------------------------------------------------
// 리듀서

export function reducer(draft: Draft<State>, action: Action) {
  switch (action.type) {
    case ACTION.SET_TODOS: {
      const { todos } = action.payload
      draft.todos = todos
      break
    }

    case ACTION.ADD_TODO: {
      const { newTodo } = action.payload
      draft.todos.unshift(newTodo)
      break
    }

    case ACTION.REMOVE_TODO: {
      const { removeId } = action.payload
      const index = draft.todos.findIndex((todo) => todo.id === removeId)
      draft.todos.splice(index, 1)
      break
    }

    case ACTION.EDIT_TODO: {
      const { editTodo } = action.payload
      const index = draft.todos.findIndex((todo) => todo.id === editTodo.id)
      draft.todos[index] = editTodo
      break
    }

    case ACTION.SEARCH_TODOS: {
      const { search } = action.payload
      draft.search = search
      break
    }

    case ACTION.TOGGLE_DONE: {
      draft.hiddenDoneTodos = !draft.hiddenDoneTodos
      break
    }

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

// --------------------------------------------------------------------------
// 초깃값

export const initialState: State = {
  todos: [],
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
