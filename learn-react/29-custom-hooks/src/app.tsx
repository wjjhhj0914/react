import { useCallback, useState } from 'react'
import { LearnSection } from '@/components'
import { useArray, useInput, useToggleState } from '@/hooks'
import { tw } from './utils'

export default function App() {
  const arrayData = useArray<number>([3, 6, 9])

  return (
    <div className="p-20">
      <div role="group" className="my-10 flex gap-3 flex-wrap">
        <button type="button" onClick={() => arrayData.set([9, 36, 81])}>
          [9, 36, 81]로 설정
        </button>
        <button type="button" onClick={() => arrayData.push(12)}>
          뒤에 12 추가
        </button>
        <button type="button" onClick={() => arrayData.unshift(11, 73)}>
          앞에 11, 73 추가
        </button>
        <button type="button" onClick={() => arrayData.replace(1, 16)}>
          두 번째 요소를 16으로 교체
        </button>
        <button type="button" onClick={() => arrayData.replace(2, 100)}>
          세 번째 요소를 100으로 교체
        </button>
        <button type="button" onClick={() => arrayData.filter((n) => n < 24)}>
          24보다 작은 수만 필터링
        </button>
        <button type="button" onClick={() => arrayData.remove(2)}>
          세 번째 요소 제거
        </button>
        <button type="button" onClick={arrayData.clear}>
          모두 제거
        </button>
        <button type="button" onClick={arrayData.reset}>
          초기화
        </button>
      </div>
      <output className="text-3xl">{arrayData.array?.join(', ')}</output>
    </div>
  )
}

// --------------------------------------------------------------------------

function UsingCustomHooksDemo() {
  const inputProps = useInput<number>(99)

  const [darkTheme, toggleDarkTheme] = useToggleState(true)

  const themeClassNames = darkTheme ? 'bg-slate-950 text-white' : ''
  const checkeboxLabel = darkTheme ? '라이트 테마 전환' : '다크 테마 전환'

  return (
    <LearnSection
      title="사용자 정의 훅 (Custom Hooks)"
      showTitle
      className={tw('p-10 h-screen', themeClassNames)}
    >
      <div role="group" className="flex gap-1 items-center">
        <input
          type="checkbox"
          id="theme-checkbox"
          checked={darkTheme}
          onChange={toggleDarkTheme}
        />
        <label htmlFor="theme-checkbox" className="select-none">
          {checkeboxLabel}
        </label>
      </div>
      <div role="group" className="flex flex-col gap-2 my-4">
        <label htmlFor="number-input">숫자</label>
        <input
          type="number"
          id="number-input"
          className="my-2"
          min={0}
          max={10}
          {...inputProps}
        />
      </div>
      <output>{inputProps.value}</output>
      <CustomHookDemo />
    </LearnSection>
  )
}

function CustomHookDemo() {
  const inputProps = useInput<string>('reusable logic')

  const [toggle, setToggle] = useToggleState(true)
  const language = toggle ? 'ko' : 'en'
  const isKorean = language.includes('ko')

  return (
    <>
      <div role="group" className="flex flex-col gap-2 my-4">
        <label htmlFor="user-input">이름</label>
        <input type="text" id="user-input" className="my-2" {...inputProps} />
        <output>{inputProps.value || '이름 값 출력'}</output>
      </div>
      <button
        type="button"
        className="select-none cursor-pointer bg-black text-white p-2"
        lang={isKorean ? 'en' : 'ko'}
        onClick={setToggle}
      >
        {isKorean ? 'change english' : '한국어 전환'}
      </button>
    </>
  )
}

function Parent() {
  const [count, setCount] = useState(0)
  const update = useCallback(
    function () {
      // setCount(count + 1)
      setCount((c) => c + 1)
    },
    // [count]
    []
  )

  // useEffect(() => {
  //   update()
  // }, [update])

  return <Child count={count} update={update} />
}

interface ChildProps {
  count: number
  update: () => void
}

function Child({ count, update }: ChildProps) {
  return (
    <div className="p-12">
      <button type="button" className="text-xl" onClick={update}>
        {count}
      </button>
    </div>
  )
}
