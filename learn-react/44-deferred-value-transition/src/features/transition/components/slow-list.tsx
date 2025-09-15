import { useEffect, useRef, useState } from 'react'
import { performanceDelay, tw } from '@/utils'

export default function SlowListContainer() {
  const moreCount = 1000
  const [count, setCount] = useState(20)

  // [실습]
  // 트랜지션을 사용해 사용자 경험을 개선해봅니다.

  const handleClick = () => {
    setCount((c) => c + moreCount)
  }

  return (
    <div>
      <button
        type="button"
        className={tw(
          'cursor-pointer',
          'my-2 px-3 py-1 rounded',
          'bg-black text-white',
          'text-sm transition-transform'
        )}
        onClick={handleClick}
      >
        {moreCount}개 더 보기
      </button>
      <SlowList count={count} />
    </div>
  )
}

function SlowList({ count, className }: { count: number; className?: string }) {
  const items = Array.from({ length: count }, (_, i) => `항목 ${i + 1}`)
  const listRef = useRef<HTMLUListElement>(null)

  performanceDelay(500)

  useEffect(() => {
    const list = listRef.current
    if (list) {
      const lastChild = [...list.children].at(-1) as HTMLLIElement
      lastChild.scrollIntoView({ behavior: 'smooth' })
    }
  }, [count])

  return (
    <ul
      ref={listRef}
      className={tw(
        'overflow-y-scroll h-50 p-2',
        'flex flex-col space-y-1',
        'w-xs md:w-sm rounded border-slate-300 border-1',
        'transition-opacity',
        className
      )}
    >
      {items.map((item) => (
        <li key={item} className="text-slate-600">
          {item}
        </li>
      ))}
    </ul>
  )
}
