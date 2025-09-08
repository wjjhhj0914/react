import { type RefObject, useId } from 'react'

interface Props {
  ref: RefObject<HTMLInputElement | null>
}

export default function EmailInput({ ref }: Props) {
  const inputId = useId()

  return (
    <div role="group" className="flex gap-1 items-center">
      <label htmlFor={inputId} className="sr-only">
        이메일
      </label>
      {/* HTML 컴포넌트에 ref 전달 */}
      <input ref={ref} id={inputId} type="email" name="email" className="p-2" />
    </div>
  )
}
