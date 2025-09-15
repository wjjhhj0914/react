import { useEffect, useState } from 'react'
import { LucideLoader, LucideShieldAlert } from 'lucide-react'
import { tw } from '@/utils'
import { getData } from '../api'

export default function Child({ cutoff }: { cutoff: number }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    getData(cutoff)
      .then((data) => {
        console.log(data)
        if (!ignore) {
          setData(data)
        }
      })
      .catch((error) => {
        setError(error as Error)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [cutoff])

  if (loading) {
    return (
      <div role="status" aria-label="로딩 중...">
        <LucideLoader className="my-4 size-6 animate-spin opacity-70" />
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="flex gap-x-2 items-center text-red-600">
        <LucideShieldAlert className="my-4 size-6" />
        {error.message}
      </div>
    )
  }

  // [실습]
  // Suspense를 지원하는 쿼리 훅을 사용
  // - queryKey: ['data', cutoff]
  // - queryFn: getData(cutoff)
  // - retry: false

  return (
    <ul className="list-none pl-0 flex flex-col gap-y-1">
      {data?.map((item, i) => (
        <li
          key={i}
          className={tw(
            'size-8 grid place-content-center',
            'p-1 bg-emerald-600 text-white font-bold text-xs rounded'
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
