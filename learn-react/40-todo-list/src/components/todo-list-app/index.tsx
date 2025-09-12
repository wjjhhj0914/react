import FilterForm from './components/filter-form'
import NewTodoForm from './components/new-todo-form'
import TodoList from './components/todo-list'
import TodoListProvider from './context'
import './style.css'

export default function TodoListApp() {
  return (
    <TodoListProvider>
      <FilterForm />
      <NewTodoForm />
      <TodoList />
    </TodoListProvider>
  )
}
