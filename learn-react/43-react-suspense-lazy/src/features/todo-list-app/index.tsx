// import { memo } from 'react'
import FilterForm from './components/filter-form/index-throttle'
import NewTodoForm from './components/new-todo-form'
import TodoList from './components/todo-list'
import TodoListProvider from './context'
import './style.css'

export default function TodoListApp() {
  return (
    <TodoListProvider>
      <section>
        <FilterForm />
      </section>
      <NewTodoForm />
      <TodoList />
    </TodoListProvider>
  )
}

// export default memo(TodoListApp)
