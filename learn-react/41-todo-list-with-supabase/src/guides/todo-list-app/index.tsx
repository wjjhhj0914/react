import FilterForm from './components/filter-form/index';
import FilterFormDebounce from './components/filter-form/index-debounce';
import FilterFormThrottle from './components/filter-form/index-throttle';
import NewTodoForm from './components/new-todo-form';
import TodoList from './components/todo-list';
import TodoListProvider from './context';
import './style.css';

export default function TodoListApp() {
  return (
    <TodoListProvider>
      <section>
        <h2>일반 버전</h2>
        <FilterForm />
      </section>
      <section className="hidden">
        <h2>쓰로틀 버전</h2>
        <FilterFormThrottle />
      </section>
      <section className="hidden">
        <h2>디바운스 버전</h2>
        <FilterFormDebounce />
      </section>
      <NewTodoForm />
      <TodoList />
    </TodoListProvider>
  );
}
