import TodoItem from '../todo-item'
import S from './style.module.css'

export default function TodoList() {
  return (
    <section>
      <h2 className="sr-only">할 일 목록</h2>
      <ul className={S.todoList}>
        <TodoItem />
      </ul>
    </section>
  )
}
