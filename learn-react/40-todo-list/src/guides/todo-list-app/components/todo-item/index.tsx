import {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { tw } from '@/utils'
import { useTodoListDispatch } from '../../context'
import { type Todo } from '../../reducer'
import S from './style.module.css'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { removeTodo, editTodo } = useTodoListDispatch()
  const handleRemove = () => removeTodo(todo.id)
  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    editTodo({ ...todo, done: e.target.checked })
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const [editMode, setEditMode] = useState(false)

  const handleEditModeOn = () => {
    setEditMode(true)
    setTimeout(() => {
      const input = inputRef.current
      if (input) input.select()
    }, 0)
  }

  const handleEditModeOff = useCallback(() => setEditMode(false), [])

  if (editMode) {
    return (
      <EditMode
        ref={inputRef}
        todo={todo}
        onEdit={editTodo}
        onEditModeOff={handleEditModeOff}
      />
    )
  }

  return (
    <li className={S.listItem}>
      <div className={tw(S.formControl, 'form-control row h-11')}>
        <input
          id={todo.id}
          type="checkbox"
          checked={todo.done}
          onChange={handleToggle}
          data-list-item-checkbox
        />
        <label
          htmlFor={todo.id}
          className={S.listItemLabel}
          data-list-item-label
        >
          {todo.doit}
        </label>
      </div>
      <button
        className="button"
        type="button"
        onClick={handleEditModeOn}
        data-button-edit
      >
        수정
      </button>
      <button
        className="button"
        type="button"
        onClick={handleRemove}
        data-button-delete
      >
        삭제
      </button>
    </li>
  )
}

function EditMode({
  ref,
  todo,
  onEdit,
  onEditModeOff,
}: {
  ref: RefObject<HTMLInputElement | null>
  todo: Todo
  onEdit: (editTodo: Todo) => void
  onEditModeOff: () => void
}) {
  const handleEdit = useCallback(() => {
    const input = ref.current

    if (input) {
      const editTodo = { ...todo, doit: input.value }
      onEdit(editTodo)
      onEditModeOff()
    }
  }, [onEdit, onEditModeOff, todo, ref])

  useEffect(() => {
    const input = ref.current
    if (!input) return

    const handleActions = ({ key }: globalThis.KeyboardEvent) => {
      if (key === 'Enter') handleEdit()
      if (key === 'Escape') onEditModeOff()
    }

    input.addEventListener('keydown', handleActions)

    return () => {
      input.removeEventListener('keydown', handleActions)
    }
  }, [handleEdit, onEditModeOff, ref])

  return (
    <li className={S.listItem} data-list-item-edit-mode>
      <div className={tw(S.formControl, 'form-control row')}>
        <input ref={ref} type="text" id={todo.id} defaultValue={todo.doit} />
      </div>
      <button
        type="button"
        className="button"
        onClick={handleEdit}
        data-button-save
      >
        저장
      </button>
    </li>
  )
}
