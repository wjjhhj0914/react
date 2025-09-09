import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorFallbackUI, { type FallbackRenderProps } from './error-fallback-ui'

interface Props {
  fallbackRender?: ({ error, errorInfo }: FallbackRenderProps) => ReactNode
  fallback?: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

// 컴포넌트
// - 속성(props)
// - 상태(state)
// - 생명주기(lifecycles) : 오류 감지를 위한 생명주기
export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  // [1]
  // 컴포넌트 렌더링 전에, 오류가 발생하면 파생된 상태 설정(추가)
  static getDerivedStateFromError(error: Error) {
    return error
      ? {
          hasError: true,
          error,
        }
      : null
  }

  // [2], [4]
  // ErrorBoundary 컴포넌트 렌더링
  render() {
    const { fallbackRender, fallback: FallbackComponent, children } = this.props // 속성
    const { hasError, error, errorInfo } = this.state // 상태

    // 컴포넌트 렌더링에 오류가 발생한 경우
    if (hasError) {
      return fallbackRender
        ? fallbackRender({ error, errorInfo })
        : (FallbackComponent ?? (
            <ErrorFallbackUI error={error} errorInfo={errorInfo} />
          ))
    }

    // 컴포넌트 렌더링에 오류가 발생하지 않은 경우, 자식 컴포넌트를 그대로 렌더링
    return children
  }

  // [3]
  // 컴포넌트 마운트 이후, 오류를 잡아 오류 정보를 상태로 제공
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }
}
