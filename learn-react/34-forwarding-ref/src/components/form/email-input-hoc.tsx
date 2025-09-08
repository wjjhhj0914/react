import { type PropsWithChildren, forwardRef, useId } from 'react'

type Props = PropsWithChildren<{
  label?: string
}>

// 커스텀 컴포넌트 (with forwardRef 고차 컴포넌트)
// - 고차 컴포넌트 forwardRef(함수_컴포넌트) => 향상된 컴포넌트 반환
// - 컴포넌트(props, ref) 두 번째 인수로 ref 객체를 전달 받음
const EmailInputHOC = forwardRef<HTMLInputElement, Props>(
  function EmailInput(props, ref) {
    const inputId = useId()

    return (
      <div role="group" className="flex gap-1 items-center">
        <label htmlFor={inputId} className="sr-only">
          {props.label ?? '이메일'}
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

export default EmailInputHOC
