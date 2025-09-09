import { useCallback } from 'react'
import { Child } from '@/components'

export default function App() {
  const makeHandleClick = useCallback(
    (message: string) => () => console.log(message),
    []
  )

  return (
    <div
      role="presentation"
      className="p-5 bg-indigo-600 text-white"
      onClickCapture={makeHandleClick('부모 div - Capture 단계')}
      onClick={makeHandleClick('부모 div - Bubble 단계')}
    >
      <h2 className="m-0">부모</h2>
      <Child
        onClickCapture={makeHandleClick('자식 div - Capture 단계')}
        onClick={makeHandleClick('자식 div - Bubble 단계')}
      >
        자식
      </Child>
    </div>
  )
}
