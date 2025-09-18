import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useOptimistic,
} from 'react'
import { useImmerReducer } from 'use-immer'
import { useAuth } from '@/contexts/auth'
import type { Todo } from '@/libs/supabase'
import {
  createTodo,
  deleteTodo,
  readTodos,
  updateTodo,
} from '@/libs/supabase/api/todos'
import { wait } from '@/utils'
import {
  ACTION_TYPE,
  type Action,
  type Init,
  type State,
  addTodoAction,
  editTodoAction,
  init,
  initialState,
  optimisticRollbackAction,
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
  // --------------------------------------------------------------------------
  // 상태(State)

  const [state, dispatch] = useImmerReducer<State, Action, Init>(
    reducer,
    initialState,
    init
  )

  // 낙관적인 업데이트 상태
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    state.todos,
    (todos: State['todos'], action: Action) => {
      switch (action.type) {
        case ACTION_TYPE.ADD_TODO: {
          const { newTodo } = action.payload
          return [newTodo, ...todos]
        }
        case ACTION_TYPE.REMOVE_TODO: {
          const { removeId } = action.payload
          return todos.filter((todo) => todo.id !== removeId)
        }
        case ACTION_TYPE.EDIT_TODO: {
          const { editTodo } = action.payload
          return todos.map((todo) =>
            todo.id === editTodo.id ? editTodo : todo
          )
        }
        case ACTION_TYPE.SEARCH_TODOS:
        default: {
          return todos
        }
      }
    }
  )

  // 액션 함수
  const actions = useMemo(
    () => ({
      addTodo: async (newTodo: Todo) => {
        updateOptimisticTodos(addTodoAction(newTodo))
        try {
          await wait(1.2, { forceResolved: true })
          const createdTodo = await createTodo({ doit: newTodo.doit })
          dispatch(addTodoAction(createdTodo))
        } catch {
          updateOptimisticTodos(optimisticRollbackAction())
        }
      },
      removeTodo: async (removeId: Todo['id']) => {
        const action = removeTodoAction(removeId)
        updateOptimisticTodos(action)
        try {
          await wait()
          await deleteTodo(removeId)
          dispatch(removeTodoAction(removeId))
        } catch {
          updateOptimisticTodos(optimisticRollbackAction())
        }
      },
      editTodo: async (editTodo: Todo) => {
        updateOptimisticTodos(editTodoAction(editTodo))
        try {
          await wait()
          const updatedTodo = await updateTodo(editTodo)
          dispatch(editTodoAction(updatedTodo))
        } catch {
          updateOptimisticTodos(optimisticRollbackAction())
        }
      },
      searchTodos: (search: State['search']) => {
        dispatch(searchTodosAction(search))
      },
      toggleDone: () => {
        dispatch(toggleDoneAction())
      },
    }),
    [dispatch, updateOptimisticTodos]
  )

  // --------------------------------------------------------------------------
  // 인증(Auth)

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

  // --------------------------------------------------------------------------
  // 유지(Persist)

  useEffect(() => {
    if (persist) {
      // 웹 스토리지에 데이터 저장
      setTodoListStorageData(state)
    } else {
      // 웹 스토리지에서 데이터 삭제
      removeTodoListStorageData()
    }
  }, [state, persist])

  return (
    <TodoListDispatchContext value={actions}>
      <TodoListContext value={{ ...state, optimisticTodos }}>
        {children}
      </TodoListContext>
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
