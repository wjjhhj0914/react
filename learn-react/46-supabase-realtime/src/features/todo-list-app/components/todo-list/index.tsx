import { useTodoList } from '../../context'
import TodoItem from '../todo-item'
import S from './style.module.css'

export default function TodoList() {
  const { optimisticTodos, search, hiddenDoneTodos } = useTodoList()

  let filteredTodos = optimisticTodos

  if (search.trim() !== '') {
    filteredTodos = optimisticTodos.filter((todo) => todo.doit.includes(search))
  }

  if (hiddenDoneTodos) {
    filteredTodos = filteredTodos.filter((todo) => !todo.done)
  }

  return (
    <section>
      <h2 className="sr-only">할 일 목록</h2>
      <ul className={S.todoList}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  )
}
