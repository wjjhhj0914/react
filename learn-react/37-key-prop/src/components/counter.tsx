import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div
      role="none"
      onClick={() => console.log('[Bubble] 부모 div 클릭')}
      onClickCapture={() => console.log('[Capture] 부모 div 클릭')}
      className="py-1 px-2 bg-neutral-950 text-neutral-50 rounded-full flex gap-2 items-center"
    >
      <button
        type="button"
        className={buttonClass}
        onClickCapture={() => console.log('[Capture] 카운트 감소 버튼 클릭')}
        onClick={() => {
          console.log('[Bubble] 카운트 감소 버튼 클릭')
          setCount(count - 1)
        }}
        aria-label="카운트 감소"
      >
        -
      </button>
      <output>{count}</output>
      <button
        type="button"
        className={buttonClass}
        onClickCapture={() => console.log('[Capture] 카운트 증가 버튼 클릭')}
        onClick={() => {
          console.log('[Bubble] 카운트 증가 버튼 클릭')
          setCount(count + 1)
        }}
        aria-label="카운트 증가"
      >
        +
      </button>
    </div>
  )
}

const buttonClass = `cursor-pointer bg-neutral-800 text-white leading-0 size-5 rounded-full grid place-content-center`
