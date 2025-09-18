import {
  ChangeEvent,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import type { Todo } from '@/libs/supabase';
import { tw } from '@/utils';
import { useTodoListDispatch } from '../../context';
import S from './style.module.css';

function TodoItem({ todo }: { todo: Todo }) {
  const { removeTodo, editTodo } = useTodoListDispatch();
  const [isPending, startTransition] = useTransition();

  // 할 일 삭제 기능
  const handleRemove = () => {
    startTransition(async () => {
      await removeTodo(todo.id);
    });
  };

  // 할 일 완료 여부 토글 기능
  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      const updateTodo = { ...todo, done: e.target.checked };
      await editTodo(updateTodo);
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState(false);

  const handleEditModeOn = () => {
    setEditMode(true);
    setTimeout(() => {
      const input = inputRef.current;
      if (input) input.select();
    }, 0);
  };

  const handleEditModeOff = useCallback(() => setEditMode(false), []);

  if (editMode) {
    return (
      <EditMode ref={inputRef} todo={todo} onEditModeOff={handleEditModeOff} />
    );
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
        {isPending ? '수정 중...' : '수정'}
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
  );
}

export default memo(TodoItem);

// --------------------------------------------------------------------------

function EditMode({
  ref,
  todo,
  onEditModeOff,
}: {
  ref: RefObject<HTMLInputElement | null>;
  todo: Todo;
  onEditModeOff: () => void;
}) {
  const { editTodo } = useTodoListDispatch();
  const [isPending, startTransition] = useTransition();

  const handleEdit = useCallback(() => {
    const input = ref.current;

    if (input) {
      // 트랜지션으로 관리
      startTransition(async () => {
        // 옵티미스틱 업데이트
        // 서버에 요청/응답
        // 실제 서버의 상태 관리
        const updateTodo = { ...todo, doit: input.value };
        await editTodo(updateTodo);

        // 편집 모드 종료 (일반 모드로 변경)
        onEditModeOff();
      });
    }
  }, [ref, todo, editTodo, onEditModeOff]);

  useEffect(() => {
    const input = ref.current;
    if (!input) return;

    const handleActions = ({ key }: globalThis.KeyboardEvent) => {
      if (key === 'Enter') handleEdit();
      if (key === 'Escape') onEditModeOff();
    };

    input.addEventListener('keydown', handleActions);

    return () => {
      input.removeEventListener('keydown', handleActions);
    };
  }, [handleEdit, onEditModeOff, ref]);

  return (
    <li className={S.listItem} data-list-item-edit-mode>
      <div className={tw(S.formControl, 'form-control row')}>
        <input ref={ref} type="text" id={todo.id} defaultValue={todo.doit} />
      </div>
      <button
        type="button"
        onClick={handleEdit}
        disabled={isPending}
        className={tw(
          'button',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
        data-button-save
      >
        {isPending ? '저장 중...' : '저장'}
      </button>
    </li>
  );
}
