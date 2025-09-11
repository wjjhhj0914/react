import { tw } from '@/utils'
import S from './style.module.css'

export default function TodoItem() {
  return (
    <li className={S.listItem}>
      <div className={tw(S.formControl, 'form-control row h-11')}>
        <input id="todo-item-cisdk" type="checkbox" data-list-item-checkbox />
        <label
          htmlFor="todo-item-cisdk"
          className={S.listItemLabel}
          data-list-item-label
        >
          할 일 1
        </label>
      </div>
      <button className="button" type="button" data-button-edit>
        수정
      </button>
      <button className="button" type="button" data-button-delete>
        삭제
      </button>
    </li>
  )
}

function EditMode() {
  return (
    <li className={S.listItem} data-list-item-edit-mode>
      <div className={tw(S.formControl, 'form-control row')}>
        <input id="todo-item-cjsue" type="text" defaultValue="할 일 1" />
      </div>
      <button className="button" type="button" data-button-save>
        저장
      </button>
    </li>
  )
}
