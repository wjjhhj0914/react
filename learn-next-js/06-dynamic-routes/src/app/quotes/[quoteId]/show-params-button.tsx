'use client'

import { useParams } from 'next/navigation'

export default function ShowParamsButton() {
  const { quoteId } = useParams<{ quoteId: string }>()

  const handleShow = () => alert(`quoteId = ${quoteId}`)

  return (
    <button
      type="button"
      className="bg-emerald-700 text-white p-2 rounded"
      onClick={handleShow}
    >
      라우트 매개변수 quoteId 보기
    </button>
  )
}
