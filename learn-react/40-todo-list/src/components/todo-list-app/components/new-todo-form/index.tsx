import { type FormEvent } from 'react'
import { tw } from '@/utils'
import { useTodoListDispatch } from '../../context'
import S from './style.module.css'

export default function NewTodoForm() {
  const { add } = useTodoListDispatch()

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const newDoIt = formData.get('new-doit') as string

    if (newDoIt.trim().length > 0) add(newDoIt)
    form.reset()
  }

  return (
    <section>
      <div>
        <h2 className="sr-only">할 일 추가</h2>
        <form className={S.newTodoForm} onSubmit={handleAddTodo}>
          <div role="group" className="form-control grow">
            <label htmlFor="todo-input">새로운 할 일</label>
            <input type="text" id="todo-input" name="new-doit" />
          </div>
          <button className={tw('button', S.button)} type="submit">
            추가
          </button>
        </form>
      </div>
    </section>
  )
}
