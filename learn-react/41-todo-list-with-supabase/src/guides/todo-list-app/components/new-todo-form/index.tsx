import { FormEvent } from 'react';
import { tw } from '@/utils';
import { useTodoListDispatch } from '../../context';
import S from './style.module.css';
import { Todo } from '@/libs/supabase';
import { createTodo } from '@/libs/supabase/api/todos';

export default function NewTodoForm() {
  // 클라이언트 앱 화면 업데이트 함수
  const { addTodo } = useTodoListDispatch();

  // form 제출 함수를 비동기 함수로 변경 (Supabase에 비동기 요청하기 위해!)
  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const doit = formData.get('todo-input') as Todo['doit'];

    // Client -> Server 데이터 생성 요청
    // [비동기 요청/응답]
    // Supabase 서버의 데이터베이스에 새로운 행(row) 데이터 추가 요청 함수
    // 생성된 데이터임
    const createdTodo: Todo = await createTodo({ doit });

    // 비동기 요청 기다리는 중....

    // [동기 처리]
    // TodoList Context의 todos 상태에 새로운 Server에서 응답 받은 새로운 할 일을 추가
    addTodo(createdTodo);

    form.reset();
  };

  return (
    <section>
      <div>
        <h2 className="sr-only">할 일 추가</h2>
        <form className={S.newTodoForm} onSubmit={handleAddTodo}>
          <div role="group" className="form-control grow">
            <label htmlFor="todo-input">새로운 할 일</label>
            <input type="text" id="todo-input" name="todo-input" />
          </div>
          <button className={tw('button', S.button)} type="submit">
            추가
          </button>
        </form>
      </div>
    </section>
  );
}
