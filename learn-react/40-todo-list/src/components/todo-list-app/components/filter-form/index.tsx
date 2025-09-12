import { type ChangeEvent } from 'react'
import { useTodoList, useTodoListDispatch } from '../../context'
import S from './style.module.css'

export default function FilterForm() {
  const { hiddenDoneTodos } = useTodoList()
  const { search, hidden } = useTodoListDispatch()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    search(e.target.value)
  }

  const handleHiddenDoneTodos = (e: ChangeEvent<HTMLInputElement>) => {
    hidden(e.target.checked)
  }

  return (
    <form className={S.filterForm}>
      <h2 className={S.title}>할 일 검색</h2>
      <div role="group" className="form-control grow">
        <label htmlFor="todo-name" className="sr-only">
          할 일
        </label>
        <input type="search" id="todo-name" onChange={handleSearch} />
      </div>
      <div role="group" className="form-control row">
        <input
          type="checkbox"
          id="hide-completed"
          checked={hiddenDoneTodos}
          onChange={handleHiddenDoneTodos}
        />
        <label htmlFor="hide-completed" className="select-none">
          완료된 할 일 감추기
        </label>
      </div>
    </form>
  )
}
