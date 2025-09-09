import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LearnSection } from '@/components'
import RandomCountUp from './demo'

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

      <ErrorBoundary
        // fallbackRender={errorRender}
        FallbackComponent={({ error, resetErrorBoundary }) => {
          return (
            <div role="alert">
              {error.message}{' '}
              <button type="button" onClick={resetErrorBoundary}>
                error recovery
              </button>
            </div>
          )
        }}
      >
        <Child />
      </ErrorBoundary>
    </LearnSection>
  )
}

function Child() {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments/1001')
      .then((response) => {
        if (!response.ok) {
          return Promise.reject('오류 발생!')
        }
        response.json()
      })
      .then(console.log)
      .catch((error) => console.error(error))
  })

  // throw new Error('Child 컴포넌트 렌더링 시 알 수 없는 오류 포착')

  return <div>Child</div>
}

const errorRender = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="text-red-500">
    <h2>Child 오류 발생</h2>
    <p>
      {error.message}
      <button type="button" className="button" onClick={resetErrorBoundary}>
        reset
      </button>
    </p>
  </div>
)
