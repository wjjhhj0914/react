import { useCallback, useState } from 'react'

export default function useArray<Type = unknown>(initialValue: Type[]) {
  const [array, setArray] = useState(initialValue)

  const set = useCallback((nextArray: Type[]) => {
    setArray(nextArray)
  }, [])

  const push = useCallback((...items: Type[]) => {
    setArray((array) => [...array, ...items])
  }, [])

  const unshift = useCallback((...items: Type[]) => {
    setArray((array) => [...items, ...array])
  }, [])

  const replace = useCallback((index: number, item: Type) => {
    setArray((array) =>
      array.map((arrayItem, i) => (i === index ? item : arrayItem))
    )
  }, [])

  const filter = useCallback(
    (fn: (item: Type, index: number, array: Type[]) => boolean) => {
      setArray((array) => array.filter(fn))
    },
    []
  )

  const remove = useCallback((index: number) => {
    return setArray((array) => array.filter((_, i) => i !== index))
  }, [])

  const clear = useCallback(() => setArray([]), [])

  const reset = useCallback(() => setArray(initialValue), [initialValue])

  return { array, set, push, unshift, replace, filter, remove, reset, clear }
}
