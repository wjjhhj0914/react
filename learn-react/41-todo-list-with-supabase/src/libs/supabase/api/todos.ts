// 🚀 Supabase의 Todos 테이블용 클라이언트 API
// ---------------------------------------------------------

import { toast } from 'sonner';
import supabase, { type Todo, TodoInsert, TodoUpdate } from '../index';

// Create
export const createTodo = async (newTodo: TodoInsert): Promise<Todo> => {
  const { error, data: createTodo } = await supabase
    .from('todos')
    .insert([newTodo])
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
  const { error, data: updatedTodo } = await supabase
    .from('todos')
    .update(updateTodo)
    .eq('id', updateTodo.id)
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
  const { error, data: deletedTodo } = await supabase
    .from('todos')
    .delete()
    .eq('id', deleteTodoId)
    .select()
    .single();

  if (error) {
    const errorMessage = '할 일 삭제 실패!';
    toast.error(`${errorMessage} $${error.message}`);
    throw new Error(errorMessage);
  }

  return deletedTodo;
};
