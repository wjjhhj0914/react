import type { Metadata } from 'next'
import { Link, Section } from '@/components'
import { gothicA1 } from '@/fonts'
import { tw } from '@/utils'

export const metadata: Metadata = {
  title: '도서 목록',
  description: '런메이트(LearnMate)가 추천하는 도서 목록을 확인하세요.',
}

export default async function BooksPage() {
  const bookList = [
    { title: 'Next.js', href: '/books/next.js' },
    { title: 'React', href: '/books/리액트' },
    { title: 'Tailwind CSS', href: '/books/테일윈드' },
    { title: 'Shandcn/ui', href: '/books/shadcn' },
    { title: 'JavaScript', href: '/books/javascript' },
    { title: 'HTML', href: '/books/html' },
    { title: 'CSS', href: '/books/css' },
  ]

  return (
    <Section title="도서 목록 페이지" className={tw(gothicA1.className)}>
      <p>도서 목록 페이지 방문</p>
      <nav className="w-full mt-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookList.map((book, index) => (
            <li
              key={index}
              className="transform transition-all duration-300 hover:scale-102"
            >
              <Link
                href={book.href}
                className={tw`
                  block p-4
                  rounded shadow-sm
                  hover:shadow-md border border-gray-100
                  text-center text-lg text-slate-700
                  font-black
                `}
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  )
}
