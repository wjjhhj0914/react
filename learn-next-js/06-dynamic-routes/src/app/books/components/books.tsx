/* eslint-disable @next/next/no-img-element */

import { tw } from '@/utils'
import type { Book } from '../api/types'

export default function Books({ items }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-8">
      {items.map((book) => (
        <article
          key={book.isbn}
          className={tw`
            overflow-hidden transition-transform 
            bg-white rounded-lg shadow-md 
            border-1 border-slate-100
            hover:scale-102  
          `}
        >
          <div className="flex p-4">
            <div className="w-24 h-32 flex-shrink-0 mr-3">
              <img
                src={book.thumbnail ?? '/images/book-placeholder.jpg'}
                alt=""
                className="w-full h-full object-cover rounded border-1 border-slate-500/30"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl line-clamp-1 mb-1">
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900"
                >
                  {book.title}
                </a>
              </h3>
              <p className="text-slate-600 text-sm mb-2">
                {book.authors.join(', ')}
              </p>
              <p className="text-slate-500 text-xs mb-2">
                {book.publisher} | {new Date(book.datetime).getFullYear()}
              </p>
            </div>
          </div>

          <div className="px-4 pb-4">
            <p className="text-sm line-clamp-3 leading-normal text-slate-600 mb-3">
              {book.contents}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-1">
                <span
                  className={tw`
                    text-xs px-2 py-1 rounded
                    bg-slate-100 text-slate-800
                  `}
                >
                  {book.status}
                </span>
                <span
                  className={tw`
                    text-xs px-2 py-1 rounded
                    bg-primary-100 text-primary-800
                    font-bold
                  `}
                >
                  {book.sale_price > 0
                    ? `${book.sale_price.toLocaleString()}원`
                    : '가격정보 없음'}
                </span>
              </div>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className={tw`
                  border-1 border-slate-200 px-1.5 py-0.5 rounded
                  text-primary-600 hover:text-primary-800 text-sm font-medium  
                  hover:bg-slate-50 hover:border-slate-300
                `}
                aria-label={`${book.title} 상세보기`}
              >
                상세보기
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

interface Props {
  items: Book[]
}
