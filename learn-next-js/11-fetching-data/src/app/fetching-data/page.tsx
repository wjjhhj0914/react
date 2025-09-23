import { Link, Section } from '@/components'

export default function FetcingDataPage() {
  return (
    <Section title="Next.js에서 데이터 가져오기">
      <nav className="mt-4">
        <ul className="flex flex-col space-y-3">
          <li className="transition-transform hover:translate-x-1">
            <Link
              href="/fetching-data/server-component"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">→</span>
              서버 컴포넌트에서 가져오기
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link
              href="/fetching-data/database"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">→</span>
              데이터베이스에서 가져오기
            </Link>
          </li>
          <li className="transition-transform hover:translate-x-1">
            <Link
              href="/fetching-data/client-component"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">→</span>
              클라이언트 컴포넌트에서 가져오기
            </Link>
          </li>
        </ul>
      </nav>
    </Section>
  )
}
