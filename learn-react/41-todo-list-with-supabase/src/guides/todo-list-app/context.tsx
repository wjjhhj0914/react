/* eslint-disable react-refresh/only-export-components */
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useImmerReducer } from 'use-immer'
import {
  type State,
  Todo,
  addTodoAction,
  editTodoAction,
  init,
  initialState,
  reducer,
  removeTodoAction,
  removeTodoListStorageData,
  searchTodosAction,
  setTodoListStorageData,
  toggleDoneAction,
} from './reducer'

interface DispatchContextValue {
  addTodo: (newTodo: Todo) => void
  removeTodo: (removeId: string) => void
  editTodo: (editTodo: Todo) => void
  searchTodos: (search: State['search']) => void
  toggleDone: () => void
}

const TodoListContext = createContext<State | null>(null)
TodoListContext.displayName = 'TodoListContext'

const TodoListDispatchContext = createContext<DispatchContextValue | null>(null)
TodoListDispatchContext.displayName = 'TodoListDispatchContext'

export default function TodoListProvider({
  children,
  persist = false,
}: PropsWithChildren<{ persist?: boolean }>) {
  const [state, dispatch] = useImmerReducer(reducer, initialState, init)

  useEffect(() => {
    if (persist) {
      setTodoListStorageData(state)
    } else {
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
    <TodoListContext value={state}>
      <TodoListDispatchContext value={actions}>
        {children}
      </TodoListDispatchContext>
    </TodoListContext>
  )
}

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
