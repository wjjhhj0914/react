import { forwardRef, useId } from 'react'

interface Props {
  label?: string
}

// 사용자 정의 컴포넌트 (Custom Component)
// - ref를 속성으로 취급하지 않았음 (문제의 시작)
// - 기본적으로 컴포넌트는 ref를 속성으로 전달받지 않음 (못 하는 게 아니라 안 하는 거였음)
// - 만약 ref 속성을 전달받고자 한다면 React.forwardRef 함수 사용
// - 개발 도구에서 ForwardRef로 표기되어 ref 포워딩된 컴포넌트임을 식별

const EmailInputRefForward = forwardRef<HTMLInputElement, Props>(
  function EmailInput({ label }, ref) {
    const inputId = useId()

    return (
      <div role="group" className="flex gap-1 items-center">
        <label htmlFor={inputId} className="sr-only">
          {label ?? '이메일'}
        </label>
        {/* HTML 컴포넌트에 ref 전달 */}
        <input
          ref={ref}
          id={inputId}
          type="email"
          name="email"
          className="p-2"
        />
      </div>
    )
  }
)

// EmailInputRefForward.displayName = 'EmailInput'

export default EmailInputRefForward
