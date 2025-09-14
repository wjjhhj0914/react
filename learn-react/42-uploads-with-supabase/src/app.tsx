import { Container, Header, LearnSection } from '@/components'
import Profile from '@/features/profiles'
import { usePageQuery } from '@/features/single-page-app'
import TodoListApp from '@/features/todo-list-app'

export default function App() {
  // 페이지 쿼리
  const page = usePageQuery('todos')
  const isHomePage = page?.includes('todos')

  return (
    <>
      <title>할 일 목록 앱</title>
      <LearnSection title="할 일 목록 앱 + Supabase 인증 / 데이터베이스 연동">
        <Header />
        <Container className="pt-24">
          {isHomePage ? <TodoListApp /> : <Profile />}
        </Container>
      </LearnSection>
    </>
  )
}
