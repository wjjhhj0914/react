'use client'

import { useState } from 'react'

// 클라이언트 컴포넌트
export default function Counter() {
  const [count, setCount] = useState(0)
  const handleCountUp = () => setCount((c) => c + 1)

  return (
    <button type="button" onclick={handleCountUp}>
      {count}
    </button>
  )
}
