import { Section } from '@/components'
import { tw } from '@/utils'

export default function FetchingDataFromDatabase() {
  const users = []

  return (
    <Section title="데이터베이스에서 가져오기">
      <div
        className={tw`
          overflow-hidden
          w-lg
        bg-white shadow-lg rounded-lg 
        `}
      >
        <div role="grid" aria-label="사용자 목록 테이블">
          <div
            role="row"
            className="grid grid-cols-[80px_120px_1fr] bg-slate-50 font-semibold p-4"
          >
            <div role="columnheader">ID</div>
            <div role="columnheader">이름</div>
            <div role="columnheader">이메일</div>
          </div>

          {users.map((user) => (
            <div
              key={user.id}
              role="row"
              className={tw`
                grid grid-cols-[80px_120px_1fr] 
                p-4 border-b border-slate-100 
                hover:bg-slate-50 transition-colors
              `}
            >
              <div role="gridcell" className="text-slate-500">
                #{user.id}
              </div>
              <div role="gridcell" className="font-medium">
                {user.name}
              </div>
              <div role="gridcell" className="text-slate-600">
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-500 hover:text-blue-800"
                >
                  {user.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-slate-500 text-sm">
        총 {users.length}명의 사용자가 있습니다.
      </p>
    </Section>
  )
}
