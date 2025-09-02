import { useCallback, useEffect, useRef } from 'react'
import { type Draft } from 'immer'
import { useImmer } from 'use-immer'
import { type State } from '@/@types/global'

const init = <T>(): State<T> => ({
  status: 'idle',
  error: null,
  data: null,
})

export default function useQuery<T = unknown>(
  url: string,
  options?: RequestInit
) {
  const [state, setState] = useImmer<State<T>>(init)

  const abortControllerRef = useRef<AbortController>(null)

  const isLoading = state.status === 'pending'
  const hasError = !!state.error

  const fetchData = useCallback(
    async (url: string, options?: RequestInit) => {
      try {
        setState((draft) => {
          draft.status = 'pending'
          draft.error = null
        })

        const response = await fetch(url, options)
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(
            typeof responseData === 'string'
              ? responseData
              : JSON.stringify(responseData)
          )
        }

        setState((draft) => {
          draft.status = 'resolved'
          draft.data = responseData as Draft<T>
        })
      } catch (error) {
        const errorObject: Error = error as Error
        if (errorObject.name === 'AbortError') return
        setState((draft) => {
          draft.status = 'rejected'
          draft.error = errorObject
        })
      }
    },
    [setState]
  )

  const refetch = useCallback(async () => {
    abortControllerRef.current = new AbortController()
    await fetchData(url, {
      signal: abortControllerRef.current.signal,
      ...options,
    })
  }, [fetchData, url, options])

  const reset = useCallback(() => {
    setState(init)
  }, [setState])

  useEffect(() => {
    abortControllerRef.current = new AbortController()
    fetchData(url, { signal: abortControllerRef.current.signal, ...options })
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [url, options, fetchData])

  return { ...state, isLoading, hasError, refetch, reset }
}
