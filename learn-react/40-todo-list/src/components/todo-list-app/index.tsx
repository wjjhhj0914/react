import NewTodoForm from './components/new-todo-form'
import TodoList from './components/todo-list'
import './style.css'

export default function TodoListApp() {
  return (
    <>
      <NewTodoForm />
      <TodoList />
    </>
  )
}
