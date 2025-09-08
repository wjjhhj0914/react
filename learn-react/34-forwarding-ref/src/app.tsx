import { type FormEvent, useRef, version } from 'react'
import { Send } from 'lucide-react'
import { LearnSection } from '@/components'
import EmailInputHOC from './components/form/email-input-hoc'

// import EmailInput from '@/components/form/email-input'

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 브라우저 기본 작동 방지
    e.preventDefault()

    // <form> 요소
    const form = e.currentTarget

    // 입력된 이메일 값 출력
    console.log(inputRef.current?.value)

    // 폼 초기화
    form.reset()
  }

  return (
    <LearnSection
      title="참조 객체 전달하기 (Forwarding Ref Object)"
      className="p-10"
    >
      <h2 className="text-3xl font-extrabold">
        리액트 {version} 버전으로 렌더링
      </h2>

      <form noValidate onSubmit={handleSubmit} className="flex gap-1">
        {/* 하위 커스텀 컴포넌트에 ref 전달하기 (React 18 실패 ❌) */}
        {/* 리액트가 말하길, React.forwardRef 고차 컴포넌트를 사용해야 해! */}
        {/* <EmailInput ref={inputRef} /> */}
        <EmailInputHOC ref={inputRef} />
        <button type="submit" className="button flex gap-1 items-center">
          <Send
            ref={(elem) => {
              console.log(elem)
            }}
            size={16}
          />{' '}
          제출
        </button>
      </form>
    </LearnSection>
  )
}
