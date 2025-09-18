import { memo, useId, useTransition } from 'react'
import { type Todo } from '@/libs/supabase'
import { tw } from '@/utils'
import { useTodoListDispatch } from '../../context'
import S from './style.module.css'

function NewTodoForm() {
  const id = useId()
  const { addTodo } = useTodoListDispatch()

  const [isPending, startTransition] = useTransition()

  const addTodoAction = async (formData: FormData) => {
    const doit = formData.get('todo-input') as string

    const newTodo = {
      id: crypto.randomUUID(),
      doit,
      done: false,
    } as Todo

    startTransition(async () => {
      await addTodo(newTodo)
    })
  }

  return (
    <section>
      <div>
        <h2 className="sr-only">할 일 추가</h2>
        <form noValidate action={addTodoAction} className={S.newTodoForm}>
          <div role="group" className="form-control grow">
            <label htmlFor={id}>새로운 할 일</label>
            <input type="text" id={id} name="todo-input" />
          </div>
          <button type="submit" className={tw('button', S.button)}>
            {isPending ? '추가 중...' : '추가'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default memo(NewTodoForm)
