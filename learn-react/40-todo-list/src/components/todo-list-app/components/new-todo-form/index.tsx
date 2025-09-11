import { tw } from '@/utils'
import S from './style.module.css'

export default function NewTodoForm() {
  return (
    <section>
      <div>
        <h2 className="sr-only">할 일 추가</h2>
        <form className={S.newTodoForm}>
          <div role="group" className="form-control grow">
            <label htmlFor="todo-input">새로운 할 일</label>
            <input type="text" id="todo-input" />
          </div>
          <button className={tw('button', S.button)} type="submit">
            추가
          </button>
        </form>
      </div>
    </section>
  )
}
