import { LearnSection } from '@/components'
import RandomCountUp from './demo'
import ErrorBoundary from './error-boundar'

export default function App() {
  return (
    <LearnSection title="랜덤 카운트 업" className="p-10">
      {/* fallback prop */}
      {/* <ErrorBoundary fallback={<div>오류가 발생했다!</div>}> */}
      {/* fallbackRender prop */}
      <ErrorBoundary
        fallbackRender={({ error, errorInfo }) => (
          <div role="alert">
            <h2>
              {error?.name} {error?.message}
            </h2>
            <ul>
              {errorInfo?.componentStack
                ?.split('\n')
                .filter(Boolean)
                .map((stackInfo, i) => {
                  return <li key={i}>{stackInfo}</li>
                })}
            </ul>
          </div>
        )}
      >
        <RandomCountUp />
      </ErrorBoundary>

      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    </LearnSection>
  )
}

function Child() {
  return <div>Child</div>
}
