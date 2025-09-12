/* eslint-disable react-refresh/only-export-components */
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useImmerReducer } from 'use-immer'
import todoListReducer, {
  addAction,
  editAction,
  hiddenAction,
  init,
  removeAction,
  removeTodoListStorageData,
  searchAction,
  setTodoListStorageData,
  toggleAction,
} from './reducer'
import {
  Todo,
  type TodoListContextValue,
  type TodoListDispatchContextValue,
} from './types'

// 상태 관리 컨텍스트
const TodoListContext = createContext<null | TodoListContextValue>(null)
TodoListContext.displayName = 'TodoListContext'

// 상태 업데이트 함수 관리 컨텍스트
const TodoListDispatchContext =
  createContext<null | TodoListDispatchContextValue>(null)
TodoListDispatchContext.displayName = 'TodoListDispatchContext'

// 초깃값
const initialState: TodoListContextValue = {
  todos: [
    {
      id: 'todo-1',
      doit: '할 일을 추가해보세요.',
      done: false,
    },
    {
      id: 'todo-2',
      doit: '두 번째 할 일을 추가해보세요.',
      done: true,
    },
  ],
  search: '',
  hiddenDoneTodos: false,
}

// 프로바이더 래퍼 컴포넌트
export default function TodoListProvider({
  persist = false,
  children,
}: PropsWithChildren<{ persist?: boolean }>) {
  // 리듀서(Reducer)를 사용해 컨텍스트 상태 및 상태 업데이트 로직
  const [state, dispatch] = useImmerReducer(todoListReducer, initialState, init)

  // 컨텍스트를 사용해 컨텍스트 내부의 모든 컴포넌트에 컨텍스트 값으로 공급
  const actions: TodoListDispatchContextValue = useMemo(
    () => ({
      add: (newDoIt: Todo['doit']) => {
        dispatch(addAction(newDoIt))
      },
      remove: (removeTodoId: Todo['id']) => {
        dispatch(removeAction(removeTodoId))
      },
      toggle: (toggleTodoId: Todo['id']) => {
        dispatch(toggleAction(toggleTodoId))
      },
      edit: (editTodoId: Todo['id'], newDoIt: Todo['doit']) => {
        dispatch(editAction(editTodoId, newDoIt))
      },
      search: (searchTerm: string) => {
        dispatch(searchAction(searchTerm))
      },
      hidden: (hiddenDoneTodos: boolean) => {
        dispatch(hiddenAction(hiddenDoneTodos))
      },
    }),
    [dispatch]
  )

  // 컨텍스트 상태가 변경될 때 마다, 스토리지에 데이터 저장
  useEffect(() => {
    if (persist) {
      setTodoListStorageData(state)
    } else {
      removeTodoListStorageData()
    }
  }, [state, persist])

  return (
    <TodoListDispatchContext value={actions}>
      <TodoListContext value={state}>{children}</TodoListContext>
    </TodoListDispatchContext>
  )
}

// 컨텍스트 상태 값을 제공하는 커스텀 훅
// (상태를 관리하는 컨텍스트 값 가져오기)
export const useTodoList = () => {
  const state = useContext(TodoListContext)

  if (!state) {
    throw new Error(
      'useTodoList 훅은 TodoListProvider 내부에서 사용해야 합니다.'
    )
  }

  return state
}

// 컨텍스트 상태 업데이트 함수를 포함하는 객체 값을 제공하는 커스텀 훅
// (상태 업데이트 함수를 관리하는 컨텍스트 값 가져오기)
export const useTodoListDispatch = () => {
  const actions = useContext(TodoListDispatchContext)

  if (!actions) {
    throw new Error(
      'useTodoListDispatch 훅은 TodoListProvider 내부에서 사용해야 합니다.'
    )
  }

  return actions
}
