import { type Dispatch, type SetStateAction, useId } from 'react'
import { tw } from '@/utils'

interface Props {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export default function SearchForm({ query, setQuery }: Props) {
  const id = useId()
  return (
    <form role="search">
      <div className="flex flex-col gap-y-1 my-5">
        <label htmlFor={id}>검색어</label>
        <input
          id={id}
          type="search"
          className={tw(
            'p-2 w-xs md:w-sm',
            'bg-white rounded border-slate-300 border-1'
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어를 입력하세요."
        />
      </div>
    </form>
  )
}
