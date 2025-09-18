import { startTransition, useEffect, useState } from 'react'
import navigate from '../utils/navigate'

export default function usePageQuery<T = string>(initialValue: T) {
  const [page, setPage] = useState<T>(initialValue)

  useEffect(() => {
    const handler = () => {
      const params = new URLSearchParams(globalThis.location.search)
      const value = params.get('page')

      startTransition(() => {
        if (!value) {
          setPage(initialValue)
          navigate(initialValue)
        } else {
          setPage(value as T)
        }
      })
    }

    handler() // 최초 한 번 실행

    globalThis.addEventListener('popstate', handler)

    return () => {
      globalThis.removeEventListener('popstate', handler)
    }
  }, [initialValue])

  return page
}
