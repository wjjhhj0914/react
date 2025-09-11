import { Container, LearnSection, TodoListApp } from '@/components'

export default function App() {
  return (
    <LearnSection title="할 일 목록 (리듀서 + 컨텍스트)" className="p-10">
      <Container>
        <TodoListApp />
      </Container>
    </LearnSection>
  )
}
