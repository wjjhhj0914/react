// --------------------------------------------------------------------------
// ✅ Supabase의 Todos 테이블용 클라이언트 API(함수)
// --------------------------------------------------------------------------
import { toast } from 'sonner'
import supabase, { type Todo, type TodoInsert, TodoUpdate } from '../index'
import requiredUser from './required-user'

// --------------------------------------------------------------------------
// 생성(Create)

export const createTodo = async (newTodo: TodoInsert): Promise<Todo> => {
  // 서버에 요청하기 전에 인증된 사용자인지 검증!
  const user = await requiredUser()

  const { error, data: createdTodo } = await supabase
    .from('todos')
    .insert([
      /* 생성할 새로운 할 일 */
      { ...newTodo, user_id: user.id },
    ])
    .select('*')
    .single()

  if (error) {
    const errorMessage = '할 일(Todo) 생성 실패!'
    toast.error(`${errorMessage} ${error.message}`)
    throw new Error(errorMessage)
  }

  return createdTodo
}

// --------------------------------------------------------------------------
// 조회(Read)

export const readTodos = async (): Promise<Todo[]> => {
  const user = await requiredUser()

  const { error, data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    const errorMessage = '할 일 목록(Todos) 조회 실패!'
    toast.error(`${errorMessage} ${error.message}`)
    throw new Error(errorMessage)
  }

  return todos ?? []
}

// --------------------------------------------------------------------------
// 수정(Update)

export const updateTodo = async (
  updateTodo: Omit<TodoUpdate, 'id' | 'created_at'> & { id: Todo['id'] }
): Promise<Todo> => {
  const user = await requiredUser()

  const { error, data: updatedTodo } = await supabase
    .from('todos')
    .update({ ...updateTodo, updated_at: new Date().toISOString() })
    .eq('id', updateTodo.id)
    .eq('user_id', user.id)
    .select('*')
    .single()

  if (error) {
    const errorMessage = '할 일(Todo) 수정 실패!'
    toast.error(`${errorMessage} ${error.message}`)
    throw new Error(errorMessage)
  }

  return updatedTodo
}

// --------------------------------------------------------------------------
// 삭제(Delete)

export const deleteTodo = async (deleteTodoId: Todo['id']): Promise<Todo> => {
  const user = await requiredUser()

  const { error, data: deletedTodo } = await supabase
    .from('todos')
    .delete()
    .eq('id', deleteTodoId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    const errorMessage = '할 일(Todo) 삭제 실패!'
    toast.error(`${errorMessage} ${error.message}`)
    throw new Error(errorMessage)
  }

  return deletedTodo
}
