import { memo } from 'react'
import FilterForm from './components/filter-form/index-throttle'
import NewTodoForm from './components/new-todo-form'
import TodoList from './components/todo-list'
import TodoListProvider from './context'
import './style.css'

function TodoListApp() {
  return (
    <TodoListProvider>
      <FilterForm />
      <NewTodoForm />
      <TodoList />
    </TodoListProvider>
  )
}

export default memo(TodoListApp)
