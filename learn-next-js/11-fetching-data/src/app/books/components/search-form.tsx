'use client'

import { useRef } from 'react'
import { LucideSearch } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { tw } from '@/utils'

export default function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const searchAction = async (formData: FormData) => {
    const query = formData.get('query') as string

    if (!query.trim()) {
      inputRef.current?.focus()
      return
    }

    router.push(`/books/${encodeURIComponent(query)}`)
  }

  return (
    <form action={searchAction} className="w-full max-w-xl mt-4">
      <div className="flex gap-2">
        <label
          htmlFor="book-search"
          className="sr-only text-sm font-medium text-gray-700"
        >
          도서 검색
        </label>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="search"
            id="book-search"
            name="query"
            placeholder="도서명을 입력하세요."
            className={tw`
                w-full px-4 py-2 
                pl-10 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  
              `}
          />
          <div
            className={tw`
                pointer-events-none
                absolute inset-y-0 left-0 
                flex items-center pl-3 
              `}
          >
            <LucideSearch strokeWidth={1} size={20} />
          </div>
        </div>
        <button
          type="submit"
          className={tw`
              cursor-pointer
              px-4 py-2 text-white bg-blue-600 rounded-md 
              hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  
            `}
        >
          검색하기
        </button>
      </div>
    </form>
  )
}
