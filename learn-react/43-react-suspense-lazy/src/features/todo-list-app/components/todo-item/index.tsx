import {
  ChangeEvent,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { Todo } from '@/libs/supabase'
import { deleteTodo, updateTodo } from '@/libs/supabase/api/todos'
import { tw } from '@/utils'
import { useTodoListDispatch } from '../../context'
import S from './style.module.css'

function TodoItem({ todo }: { todo: Todo }) {
  const { removeTodo, editTodo } = useTodoListDispatch()

  // 할 일 삭제 기능 (비동기 함수로 변경)
  const handleRemove = async () => {
    // 비동기 처리
    const deletedTodo = await deleteTodo(todo.id)

    // 동기 처리
    removeTodo(deletedTodo.id)
  }

  // 할 일 완료 여부 토글 기능 (비동기 함수로 변경)
  const handleToggle = async (e: ChangeEvent<HTMLInputElement>) => {
    // 비동기 처리 (Superbase 단에서 처리)
    const updatedTodo = await updateTodo({
      id: todo.id,
      done: e.target.checked,
    })

    // 동기 처리 (UI 단에서 처리)
    editTodo(updatedTodo)
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

export default memo(TodoItem)

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
  // 비동기 함수로 변경
  const handleEdit = useCallback(async () => {
    const input = ref.current

    if (input) {
      // 비동기 요청
      // Supabase 데이터베이스인 Todos 테이블의 행 데이터 업데이트
      const updatedTodo = await updateTodo({ id: todo.id, doit: input.value })

      // 동기 요청
      // TodoList 컨텍스트 상태 업데이트
      onEdit(updatedTodo)

      // 편집 모드 종료 (일반 모드로 변경)
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
