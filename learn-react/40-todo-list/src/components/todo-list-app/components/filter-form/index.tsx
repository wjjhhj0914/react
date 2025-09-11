import S from './style.module.css'

export default function FilterForm() {
  return (
    <form className={S.filterForm}>
      <h2 className={S.title}>할 일 검색</h2>
      <div role="group" className="form-control grow">
        <label htmlFor="todo-name" className="sr-only">
          할 일
        </label>
        <input type="search" id="todo-name" />
      </div>
      <div role="group" className="form-control row">
        <input type="checkbox" id="hide-completed" />
        <label htmlFor="hide-completed">완료된 할 일 감추기</label>
      </div>
    </form>
  )
}
