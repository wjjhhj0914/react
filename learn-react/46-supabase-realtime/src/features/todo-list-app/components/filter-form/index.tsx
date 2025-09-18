import { ChangeEvent, KeyboardEvent } from 'react'
import { useTodoList, useTodoListDispatch } from '../../context'
import S from './style.module.css'

export default function FilterForm() {
  const { hiddenDoneTodos, search } = useTodoList()
  const { searchTodos, toggleDone } = useTodoListDispatch()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchTodos(e.target.value)
  }

  const handleEscape = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') searchTodos('')
  }

  const handleToggleDone = () => {
    toggleDone()
  }

  return (
    <form className={S.filterForm}>
      <h2 className={S.title}>할 일 검색</h2>
      <div role="group" className="form-control grow">
        <label htmlFor="todo-name" className="sr-only">
          할 일
        </label>
        <input
          type="search"
          id="todo-name"
          defaultValue={search}
          onChange={handleSearch}
          onKeyDown={handleEscape}
        />
      </div>
      <div role="group" className="form-control row">
        <input
          type="checkbox"
          id="hide-completed"
          defaultChecked={hiddenDoneTodos}
          onChange={handleToggleDone}
        />
        <label htmlFor="hide-completed" className="select-none">
          완료된 할 일 감추기
        </label>
      </div>
    </form>
  )
}
