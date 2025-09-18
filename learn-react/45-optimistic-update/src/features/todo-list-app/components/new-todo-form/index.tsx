import { memo, useId, useTransition } from 'react';
import { Todo } from '@/libs/supabase';
import { tw } from '@/utils';
import { useTodoListDispatch } from '../../context';
import S from './style.module.css';

function NewTodoForm() {
  const { addTodo } = useTodoListDispatch();
  const id = useId();

  const [isPending, startTransition] = useTransition();

  const addTodoAction = async (formData: FormData) => {
    const doit = formData.get('todo-input') as Todo['doit'];

    startTransition(async () => {
      // 서버에 요청 보내기 전에 낙관적으로 업데이트할 더미 Todo
      const optimisticNewTodo = { id: crypto.randomUUID(), doit, done: false };
      await addTodo(optimisticNewTodo as Todo);
    });
  };

  return (
    <section>
      <div>
        <h2 className="sr-only">할 일 추가</h2>
        <form action={addTodoAction} className={S.newTodoForm}>
          <div role="group" className="form-control grow">
            <label htmlFor={id}>새로운 할 일</label>
            <input type="text" id={id} name="todo-input" />
          </div>
          <button
            type="submit"
            className={tw(
              'button',
              S.button,
              isPending && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isPending ? '추가 중...' : '추가'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default memo(NewTodoForm);
