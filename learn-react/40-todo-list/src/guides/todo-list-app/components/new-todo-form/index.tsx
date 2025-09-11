import { FormEvent } from 'react'
import { tw } from '@/utils'
import { useTodoListDispatch } from '../../context'
import S from './style.module.css'

export default function NewTodoForm() {
  const { addTodo } = useTodoListDispatch()

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const doit = formData.get('todo-input') as string

    const newTodo = {
      id: crypto.randomUUID(),
      doit,
      done: false,
    }

    addTodo(newTodo)

    form.reset()
  }

  return (
    <section>
      <div>
        <h2 className="sr-only">할 일 추가</h2>
        <form className={S.newTodoForm} onSubmit={handleAddTodo}>
          <div role="group" className="form-control grow">
            <label htmlFor="todo-input">새로운 할 일</label>
            <input type="text" id="todo-input" name="todo-input" />
          </div>
          <button className={tw('button', S.button)} type="submit">
            추가
          </button>
        </form>
      </div>
    </section>
  )
}
