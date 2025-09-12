// 🚀 Supabase의 Todos 테이블용 클라이언트 API
// ---------------------------------------------------------

import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import supabase, { type Todo, TodoInsert, TodoUpdate } from '../index';

// 사용자 (세션) 정보 가져오기
const requiredUser = async (): Promise<User> => {
  const { error, data } = await supabase.auth.getUser();

  if (error) {
    const errorMessage = '로그인이 필요합니다!';
    toast.error(`${errorMessage} ${error.message}`);
    throw new Error(errorMessage);
  }

  const { user } = data;
  return user;
};

// Create
export const createTodo = async (newTodo: TodoInsert): Promise<Todo> => {
  // 서버에 요청하기 전에 인증된 사용자인지 검증!
  const user = await requiredUser();

  const { error, data: createTodo } = await supabase
    .from('todos')
    .insert([/* 생성할 새로운 할 일 */ { ...newTodo, user_id: user.id }])
    .select('*')
    .single();

  if (error) {
    const errorMessage = '할 일 생성 실패!';
    toast.error(`${errorMessage} ${error.message}`);
    throw new Error(errorMessage);
  }

  return createTodo;
};

// Read
export const readTodos = async (): Promise<Todo[]> => {
  const user = await requiredUser();

  const { error, data: todos } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    const errorMessage = '할 일 조회 실패!';
    toast.error(`${errorMessage} $${error.message}`);
    throw new Error(errorMessage);
  }

  return todos;
};

// Update
export const updateTodo = async (
  updateTodo: Omit<TodoUpdate, 'id' | 'created_at'> & { id: Todo['id'] }
): Promise<Todo | void> => {
  const user = await requiredUser();

  const { error, data: updatedTodo } = await supabase
    .from('todos')
    .update({ ...updateTodo, updated_at: new Date().toISOString() })
    .eq('id', updateTodo.id)
    .eq('user_id', user.id)
    .select('*')
    .single();

  if (error) {
    const errorMessage = '할 일 수정 실패!';
    toast.error(`${errorMessage} $${error.message}`);
    throw new Error(errorMessage);
  }

  return updatedTodo;
};

// Delete
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
    const errorMessage = '할 일 삭제 실패!';
    toast.error(`${errorMessage} $${error.message}`);
    throw new Error(errorMessage);
  }

  return deletedTodo;
};
