// --------------------------------------------------------------------------
// ✅ Supabase의 Todos 테이블용 클라이언트 API(함수)
// --------------------------------------------------------------------------
import { type RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { toast } from 'sonner';
import supabase, { type Todo, type TodoInsert, TodoUpdate } from '../index';
import requiredUser from './required-user';

// --------------------------------------------------------------------------
// 리얼타임(Realtime)

export const realtimeTodos = <T>(
  callback: (
    payload: RealtimePostgresChangesPayload<{ [key: string]: T }>
  ) => void
) => {
  // 리얼타임 데이터베이스의 테이블을 구독(서브스크립션)
  // 채널 생성
  const todosChannel = supabase.channel('public.todos');

  // 생성된 채널의 이벤트 설정
  todosChannel
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'todos' },
      payload => {
        console.log('실시간 데이터베이스 변경 이벤트', payload.eventType);
        console.log('변경된 새로운 데이터', payload.new);
        console.log('변경 이전 데이터', payload.old);
        callback(payload);
      }
    )
    .subscribe(status => {
      console.log('실시간 todos 데이터베이스 구독 상태:', status);
    });

  // 구독 중인 데이터베이스 테이블을 구독 해제 함수
  const unsubscribe = async () => {
    const result = await supabase.removeChannel(todosChannel);
    console.log('실시간 todos 데이터베이스 구독 해제 상태:', result);
  };

  return unsubscribe;
};

// --------------------------------------------------------------------------
// 생성(Create)

export const createTodo = async (newTodo: TodoInsert): Promise<Todo> => {
  // 서버에 요청하기 전에 인증된 사용자인지 검증!
  const user = await requiredUser();

  const { error, data: createdTodo } = await supabase
    .from('todos')
    .insert([
      /* 생성할 새로운 할 일 */
      { ...newTodo, user_id: user.id },
    ])
    .select('*')
    .single();

  if (error) {
    const errorMessage = '할 일(Todo) 생성 실패!';
    toast.error(`${errorMessage} ${error.message}`);
    throw new Error(errorMessage);
  }

  return createdTodo;
};

// --------------------------------------------------------------------------
// 조회(Read)

export const readTodos = async (): Promise<Todo[]> => {
  const user = await requiredUser();

  const { error, data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    const errorMessage = '할 일 목록(Todos) 조회 실패!';
    toast.error(`${errorMessage} ${error.message}`);
    throw new Error(errorMessage);
  }

  return todos ?? [];
};

// --------------------------------------------------------------------------
// 수정(Update)

export const updateTodo = async (
  updateTodo: Omit<TodoUpdate, 'id' | 'created_at'> & { id: Todo['id'] }
): Promise<Todo> => {
  const user = await requiredUser();

  const { error, data: updatedTodo } = await supabase
    .from('todos')
    .update({ ...updateTodo, updated_at: new Date().toISOString() })
    .eq('id', updateTodo.id)
    .eq('user_id', user.id)
    .select('*')
    .single();

  if (error) {
    const errorMessage = '할 일(Todo) 수정 실패!';
    toast.error(`${errorMessage} ${error.message}`);
    throw new Error(errorMessage);
  }

  return updatedTodo;
};

// --------------------------------------------------------------------------
// 삭제(Delete)

export const deleteTodo = async (deleteTodoId: Todo['id']): Promise<Todo> => {
  const user = await requiredUser();

  const { error, data: deletedTodo } = await supabase
    .from('todos')
    .delete()
    .eq('id', deleteTodoId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    const errorMessage = '할 일(Todo) 삭제 실패!';
    toast.error(`${errorMessage} ${error.message}`);
    throw new Error(errorMessage);
  }

  return deletedTodo;
};
