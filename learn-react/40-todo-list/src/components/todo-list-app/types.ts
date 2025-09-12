// 할 일 인터페이스 선언
export interface Todo {
  id: string
  doit: string
  done: boolean
}

// 상태 관리 컨텍스트 값 인터페이스 선언
export interface TodoListContextValue {
  todos: Todo[]
  search: string
  hiddenDoneTodos: boolean
}

// 상태 업데이트 함수 관리 컨텍스트 값 인터페이스 선언
export interface TodoListDispatchContextValue {
  add: (newDoIt: Todo['doit']) => void
  remove: (removeTodoId: string) => void
  toggle: (toggleTodoId: Todo['id']) => void
  edit: (editTodoId: string, newDoIt: string) => void
  search: (searchTerm: string) => void
  hidden: (hiddenDoneTodos: boolean) => void
}
