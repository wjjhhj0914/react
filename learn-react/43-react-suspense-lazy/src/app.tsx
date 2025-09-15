import { Container, Header, LearnSection } from '@/components'
import { SuspenseAndLazy } from './features'
import Profile from './features/profiles'
import { usePageQuery } from './features/single-page-app'
import TodoListApp from './features/todo-list-app'

export default function App() {
  const page = usePageQuery<'todos' | 'profile' | 'suspense'>('todos')

  let render = null

  switch (page) {
    default:
    case 'todos':
      render = <TodoListApp />
      break
    case 'profile':
      render = <Profile />
      break
    case 'suspense':
      render = <SuspenseAndLazy />
      break
  }

  return (
    <>
      <title>Suspense & Lazy</title>
      <LearnSection title="서스펜스 & 레이지 로드">
        <Header />
        <Container className="pt-24">{render}</Container>
      </LearnSection>
    </>
  )
}
