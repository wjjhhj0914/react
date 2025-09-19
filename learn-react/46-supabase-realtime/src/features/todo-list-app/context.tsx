import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useOptimistic,
} from 'react';
import { toast } from 'sonner';
import { useImmerReducer } from 'use-immer';
import { useAuth } from '@/contexts/auth';
import { type Todo } from '@/libs/supabase';
import {
  createTodo,
  deleteTodo,
  readTodos,
  realtimeTodos,
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

  // --------------------------------------------------------------------------
  // 낙관적인 업데이트 상태

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    state.todos,
    (todos: State['todos'], action: Action) => {
      switch (action.type) {
        case ACTION_TYPE.ADD_TODO: {
          const { newTodo } = action.payload;
          return [newTodo, ...todos];
        }
        case ACTION_TYPE.REMOVE_TODO: {
          const { removeId } = action.payload;
          return todos.filter(todo => todo.id !== removeId);
        }
        case ACTION_TYPE.EDIT_TODO: {
          const { editTodo } = action.payload;
          return todos.map(todo => (todo.id === editTodo.id ? editTodo : todo));
        }
        case ACTION_TYPE.SEARCH_TODOS:
        default: {
          return todos;
        }
      }
    }
  );

  // --------------------------------------------------------------------------
  // 액션 함수

  const actions = useMemo(
    () => ({
      addTodo: async (newTodo: Todo) => {
        // 낙관적 업데이트를 UI와 서버 상태 모두에 적용
        updateOptimisticTodos(addTodoAction(newTodo)); // 가짜 데이터로 낙관적인 상태에 추가
        dispatch(addTodoAction(newTodo)); // 가짜 데이터 추가

        try {
          await wait(1.2, { forceResolved: true });
          const createdTodo = await createTodo({ doit: newTodo.doit }); // 실제 서버 데이터
          dispatch(removeTodoAction(newTodo.id)); // 가짜 데이터 제거
          dispatch(addTodoAction(createdTodo)); // 실제 데이터로 교체
        } catch {
          updateOptimisticTodos(optimisticRollbackAction());
          dispatch(removeTodoAction(newTodo.id));
          toast.error('할 일 생성에 실패했습니다.');
        }
      },
      removeTodo: async (removeId: Todo['id']) => {
        const action = removeTodoAction(removeId);

        // 롤백 시, 복구할 todo
        const restoreTodo = optimisticTodos.find(todo => todo.id === removeId);

        // 낙관적 업데이트를 UI와 서버 상태 모두에 적용
        updateOptimisticTodos(action);
        dispatch(action);

        try {
          await wait();
          await deleteTodo(removeId);
        } catch {
          updateOptimisticTodos(optimisticRollbackAction());
          if (restoreTodo) dispatch(addTodoAction(restoreTodo));
        }
      },
      editTodo: async (editTodo: Todo) => {
        // 롤백 시, 복구할 todo
        const restoreTodo = optimisticTodos.find(
          todo => todo.id === editTodo.id
        );

        updateOptimisticTodos(editTodoAction(editTodo));
        dispatch(editTodoAction(editTodo));
        try {
          await wait();
          await updateTodo(editTodo);
        } catch {
          updateOptimisticTodos(optimisticRollbackAction());
          if (restoreTodo) dispatch(editTodoAction(restoreTodo));
        }
      },

      searchTodos: (search: State['search']) => {
        dispatch(searchTodosAction(search));
      },
      toggleDone: () => {
        dispatch(toggleDoneAction());
      },
    }),
    [dispatch, optimisticTodos, updateOptimisticTodos]
  );

  // --------------------------------------------------------------------------
  // 리얼타임 데이터베이스 변경 감지 이펙트

  // 서버 (슈퍼베이스 데이터베이스) <- -> 클라이언트 (리액트 앱)
  // 변경 ------------------------> 적용
  // 적용 <------------------------ 추가 (1)
  // 변경 ------------------------> 추가 재적용 (2)

  useEffect(() => {
    // 구독 해제 함수 <- public.todos 테이블 변경 감지 구독
    const unsubscribe = realtimeTodos(payload => {
      const { eventType, new: newData, old: oldData } = payload;

      switch (eventType) {
        case 'INSERT': {
          const createdTodo = newData as unknown as Todo;

          const isExistTodo = state.todos.some(todo => {
            if ('id' in createTodo) return todo.id === createTodo.id;
            return false;
          });

          if (!isExistTodo) {
            console.log('이미 존재하는 Todo입니다.', createdTodo.id);
            return;
          }

          dispatch(addTodoAction(createdTodo));
          break;
        }
        case 'DELETE': {
          const removedTodo = oldData as unknown as Todo;
          dispatch(removeTodoAction(removedTodo.id));
          break;
        }
        case 'UPDATE': {
          const updatedTodo = newData as unknown as Todo;
          dispatch(editTodoAction(updatedTodo));
          break;
        }
      }
    });

    // 정리(cleanup)
    return () => {
      // 구독 중인 데이터베이스 테이블을 구독 해제
      unsubscribe();
    };
  }, [dispatch, state.todos]);

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
