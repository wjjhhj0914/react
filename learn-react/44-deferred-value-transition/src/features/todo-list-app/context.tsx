import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useImmerReducer } from 'use-immer'
import { useAuth } from '@/contexts/auth'
import type { Todo } from '@/libs/supabase'
import { readTodos } from '@/libs/supabase/api/todos'
import {
  type State,
  addTodoAction,
  editTodoAction,
  init,
  initialState,
  reducer,
  removeTodoAction,
  removeTodoListStorageData,
  searchTodosAction,
  setTodoListStorageData,
  setTodosAction,
  toggleDoneAction,
} from './reducer'

interface TodoListDispatchContextValueValue {
  // 서버 측 데이터(server data) 상태
  addTodo: (newTodo: Todo) => void
  removeTodo: (removeId: Todo['id']) => void
  editTodo: (editTodo: Todo) => void
  // 클라이언트 측 데이터(client data) 상태
  searchTodos: (search: State['search']) => void
  toggleDone: () => void
}

const TodoListContext = createContext<State | null>(null)
TodoListContext.displayName = 'TodoListContext'

const TodoListDispatchContext =
  createContext<TodoListDispatchContextValueValue | null>(null)
TodoListDispatchContext.displayName = 'TodoListDispatchContext'

export default function TodoListProvider({
  children,
  persist = false,
}: PropsWithChildren<{ persist?: boolean }>) {
  const [state, dispatch] = useImmerReducer(reducer, initialState, init)

  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      // 로그인 시, todos 데이터 가져오기
      readTodos().then((todos) => {
        dispatch(setTodosAction(todos))
      })
    } else {
      // 로그아웃 시, todos 데이터 초기화
      dispatch(setTodosAction([]))
    }
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    if (persist) {
      // 웹 스토리지에 데이터 저장
      setTodoListStorageData(state)
    } else {
      // 웹 스토리지에서 데이터 삭제
      removeTodoListStorageData()
    }
  }, [state, persist])

  const actions = useMemo(
    () => ({
      addTodo: (newTodo: Todo) => {
        dispatch(addTodoAction(newTodo))
      },
      removeTodo: (removeId: Todo['id']) => {
        dispatch(removeTodoAction(removeId))
      },
      editTodo: (editTodo: Todo) => {
        dispatch(editTodoAction(editTodo))
      },
      searchTodos: (search: State['search']) => {
        dispatch(searchTodosAction(search))
      },
      toggleDone: () => {
        dispatch(toggleDoneAction())
      },
    }),
    [dispatch]
  )

  return (
    <TodoListDispatchContext value={actions}>
      <TodoListContext value={state}>{children}</TodoListContext>
    </TodoListDispatchContext>
  )
}

/* eslint-disable react-refresh/only-export-components */
export const useTodoList = () => {
  const state = useContext(TodoListContext)

  if (!state) {
    throw new Error(
      'useTodoList 훅은 TodoListProvider 내부에서만 사용 가능합니다.'
    )
  }

  return state
}

export const useTodoListDispatch = () => {
  const actions = useContext(TodoListDispatchContext)

  if (!actions) {
    throw new Error(
      'useTodoListDispatch 훅은 TodoListProvider 내부에서만 사용 가능합니다.'
    )
  }

  return actions
}
