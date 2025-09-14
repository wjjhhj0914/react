import { FormEvent, memo } from 'react'
import { Todo } from '@/libs/supabase'
import { createTodo } from '@/libs/supabase/api/todos'
import { tw } from '@/utils'
import { useTodoListDispatch } from '../../context'
import S from './style.module.css'

function NewTodoForm() {
  // 클라이언트 앱 화면 업데이트 함수
  const { addTodo } = useTodoListDispatch()

  // 폼 제출 함수를 비동기 함수로 변경 (Supabase에 비동기 요청하기 위해)
  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const doit = formData.get('todo-input') as Todo['doit']

    // [비동기 요청/응답]
    // 클라이언트 -> 서버 데이터 생성 요청
    const createdTodo: Todo = await createTodo({ doit })

    // 비동기 요청 기다리는 중....

    // [동기 처리]
    // TodoList 컨텍스트의 todos 상태에 서버에서 응답받은 새로운 할 일 추가
    addTodo(createdTodo)

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

export default memo(NewTodoForm)
