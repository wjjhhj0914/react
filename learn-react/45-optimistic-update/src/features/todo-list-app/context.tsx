import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useOptimistic,
} from 'react';
import { useImmerReducer } from 'use-immer';
import { useAuth } from '@/contexts/auth';
import type { Todo } from '@/libs/supabase';
import {
  createTodo,
  deleteTodo,
  readTodos,
  updateTodo,
} from '@/libs/supabase/api/todos';
import { wait } from '@/utils';
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
  // --------------------------------------------------------------------------
  // 상태(State)

  const [state, dispatch] = useImmerReducer<State, Action, Init>(
    reducer,
    initialState,
    init
  );

  // 옵티미스틱 UI 상태
  const [optimisticTodos, updateOptimisticTodos] = useOptimistic<
    State['todos'],
    Action
  >(
    // 서버의 데이터베이스 todos 테이블과
    // 리액트 앱에서 동기화해야 할 상태 데이터: state.todos
    state.todos,
    // 낙관적인 화면 업데이트를 위한 리듀서 함수 (상태, 액션)
    (todos, action) => {
      switch (action.type) {
        case ACTION_TYPE.ADD_TODO: {
          const { newTodo } = action.payload;
          return [newTodo, ...todos];
        }
        case ACTION_TYPE.EDIT_TODO: {
          const { editTodo } = action.payload;
          return todos.map(todo => (todo.id === editTodo.id ? editTodo : todo));
        }
        case ACTION_TYPE.REMOVE_TODO: {
          const { removeId } = action.payload;
          return todos.filter(todo => todo.id !== removeId);
        }
        case ACTION_TYPE.OPTIMISTIC_ROLLBACK:
        default: {
          return todos;
        }
      }
    }
  );

  // 액션 함수
  // - [client / optimistic / server] 할 일 추가
  // - [client / optimistic / server] 할 일 수정
  // - [client / optimistic / server] 할 일 삭제
  // - [only client] 할 일 목록 검색
  // - [only client] 할 일 목록 완료된 할 일 감추기
  const actions = useMemo(
    () => ({
      // 서버 상태 관리 업데이트 함수
      addTodo: async (newTodo: Todo) => {
        // 낙관적인(optimistic) 업데이트 수행
        updateOptimisticTodos(addTodoAction(newTodo));

        try {
          // 서버 비동기 요청 지연 처리를 위한 유틸리티 함수
          await wait(1.2, { forceRejected: false });
          // 실제 Supabase 데이터베이스 todos 테이블에 요청
          const createdTodo = await createTodo({ doit: newTodo.doit });
          // 성공: 응답받은 실제 서버 데이터로 상태를 업데이트
          dispatch(addTodoAction(createdTodo));
        } catch {
          // 실패: 낙관적으로 변경한 상태를 롤백(rollback)
          updateOptimisticTodos(optimisticRollbackAction());
        }
      },
      removeTodo: async (removeId: Todo['id']) => {
        // 낙관적인(optimistic) 업데이트 수행
        updateOptimisticTodos(removeTodoAction(removeId));

        try {
          // 서버 비동기 요청 지연 처리를 위한 유틸리티 함수
          await wait(1.2, { forceRejected: false });
          // 실제 Supabase 데이터베이스 todos 테이블에 요청
          await deleteTodo(removeId);
          // 성공: 응답받은 실제 서버 데이터로 상태를 업데이트
          dispatch(removeTodoAction(removeId));
        } catch {
          // 실패: 낙관적으로 변경한 상태를 롤백(rollback)
          updateOptimisticTodos(optimisticRollbackAction());
        }
      },
      editTodo: async (editTodo: Todo) => {
        // 낙관적인(optimistic) 업데이트 수행
        updateOptimisticTodos(editTodoAction(editTodo));

        try {
          // 서버 비동기 요청 지연 처리를 위한 유틸리티 함수
          await wait(1.2, { forceRejected: true });
          // 실제 Supabase 데이터베이스 todos 테이블에 요청
          const updatedTodo = await updateTodo(editTodo);
          // 성공: 응답받은 실제 서버 데이터로 상태를 업데이트
          dispatch(editTodoAction(updatedTodo));
        } catch {
          // 실패: 낙관적으로 변경한 상태를 롤백(rollback)
          updateOptimisticTodos(optimisticRollbackAction());
        }
      },

      // 클라이언트 상태 관리 업데이트 함수
      searchTodos: (search: State['search']) => {
        dispatch(searchTodosAction(search));
      },
      toggleDone: () => {
        dispatch(toggleDoneAction());
      },
    }),
    [dispatch, updateOptimisticTodos]
  );

  // --------------------------------------------------------------------------
  // 인증(Auth)

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // 로그인 시, todos 데이터 가져오기
      readTodos().then(todos => {
        dispatch(setTodosAction(todos));
      });
    } else {
      // 로그아웃 시, todos 데이터 초기화
      dispatch(setTodosAction([]));
    }
  }, [dispatch, isAuthenticated]);

  // --------------------------------------------------------------------------
  // 유지(Persist)

  useEffect(() => {
    if (persist) {
      // 웹 스토리지에 데이터 저장
      setTodoListStorageData(state);
    } else {
      // 웹 스토리지에서 데이터 삭제
      removeTodoListStorageData();
    }
  }, [state, persist]);

  return (
    <TodoListDispatchContext value={actions}>
      <TodoListContext value={{ ...state, optimisticTodos }}>
        {children}
      </TodoListContext>
    </TodoListDispatchContext>
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
