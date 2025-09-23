import Image from 'next/image'
import { tw } from '@/utils'
import type { Book } from '../api/types'

export default function Books({ items }: Props) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-8">
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
            <div className="relative w-24 h-32 flex-shrink-0 mr-3">
              <Image
                // src="https://images.pexels.com/photos/32314614/pexels-photo-32314614.jpeg"
                src={book.thumbnail ?? '/images/book-placeholder.jpg'}
                // src="/og_image.png"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,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"
                width={120}
                height={174}
                // fill
                className="w-full h-full object-cover rounded border-1 border-slate-500/30"
                alt=""
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
