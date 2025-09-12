import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useImmerReducer } from 'use-immer';
import { useAuth } from '@/contexts/auth';
import type { Todo } from '@/libs/supabase';
import { readTodos } from '@/libs/supabase/api/todos';
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
} from './reducer';

interface TodoListDispatchContextValueValue {
  // 서버 측 데이터(server data) 상태
  addTodo: (newTodo: Todo) => void;
  removeTodo: (removeId: Todo['id']) => void;
  editTodo: (editTodo: Todo) => void;
  // 클라이언트 측 데이터(client data) 상태
  searchTodos: (search: State['search']) => void;
  toggleDone: () => void;
}

const TodoListContext = createContext<State | null>(null);
TodoListContext.displayName = 'TodoListContext';

const TodoListDispatchContext =
  createContext<TodoListDispatchContextValueValue | null>(null);
TodoListDispatchContext.displayName = 'TodoListDispatchContext';

export default function TodoListProvider({
  children,
  persist = false,
}: PropsWithChildren<{ persist?: boolean }>) {
  const [state, dispatch] = useImmerReducer(reducer, initialState, init);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('로그인');
    } else {
      console.log('로그아웃');
    }
  }, [dispatch, isAuthenticated, user]);

  // [부수효과] Supabase 데이터베이스의 Todos 테이블 행(rows) 데이터 조회 요청
  useEffect(() => {
    readTodos().then(todos => {
      dispatch(setTodosAction(todos));
    });
  }, [dispatch]);

  useEffect(() => {
    if (persist) {
      setTodoListStorageData(state);
    } else {
      removeTodoListStorageData();
    }
  }, [state, persist]);

  const actions = useMemo(
    () => ({
      addTodo: (newTodo: Todo) => {
        dispatch(addTodoAction(newTodo));
      },
      removeTodo: (removeId: Todo['id']) => {
        dispatch(removeTodoAction(removeId));
      },
      editTodo: (editTodo: Todo) => {
        dispatch(editTodoAction(editTodo));
      },
      searchTodos: (search: State['search']) => {
        dispatch(searchTodosAction(search));
      },
      toggleDone: () => {
        dispatch(toggleDoneAction());
      },
    }),
    [dispatch]
  );

  return (
    <TodoListContext value={state}>
      <TodoListDispatchContext value={actions}>
        {children}
      </TodoListDispatchContext>
    </TodoListContext>
  );
}

/* eslint-disable react-refresh/only-export-components */
export const useTodoList = () => {
  const state = useContext(TodoListContext);

  if (!state) {
    throw new Error(
      'useTodoList 훅은 TodoListProvider 내부에서만 사용 가능합니다.'
    );
  }

  return state;
};

export const useTodoListDispatch = () => {
  const actions = useContext(TodoListDispatchContext);

  if (!actions) {
    throw new Error(
      'useTodoListDispatch 훅은 TodoListProvider 내부에서만 사용 가능합니다.'
    );
  }

  return actions;
};
