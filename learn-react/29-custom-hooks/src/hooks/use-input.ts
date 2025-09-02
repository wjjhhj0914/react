import { type ChangeEvent, useCallback, useEffect, useState } from 'react'

export default function useInput<T = string>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T)
  }, [])

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return { value, onChange }
}
