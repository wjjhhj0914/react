import {
  Suspense,
  use,
  useMemo,
  // useEffect,
  // useState,
  // useEffect,
  // useState
} from 'react'
import { ErrorBoundary } from '@/components'
import { tw, wait } from '@/utils'

interface User {
  id: string
  name: string
}

// use 함수(API)
// 특징: 훅이 아님. 그러므로 조건문 또는 반복문 내부에서 사용 가능
// 용도 1. useContext 훅을 대신할 수 있음 (Context로부터 값을 가져올 수 있음)
// 용도 2. Promise 인스턴스를 전달받아 Promise의 보류/해결/거절 등 상태에 따른 처리 가능
//        보류 중일 때는 Suspense의 fallback이 대체 UI로 화면에 렌더링 (로딩)
//        해결될 때까지 use 함수는 컴포넌트 렌더링을 차단(진행하지 않음) - 동기 코드인 것처럼
//        해결되면 use 함수는 Promise의 데이터를 반환한다. (컴포넌트 내부에서 사용) - 컴포넌트 렌더링
//        이전 코드 대비 깔끔하게 코드베이스 유지할 수 있음. (loading, error, data 상태 선언 필요 ❌, 부수 효과 필요 ❌)
//        거절될 때는 ErrorBoundary의 fallback이 대체 UI로 화면에 렌더링 (오류)

export default function Users() {
  // [실습]
  // use 함수는 Promise를 직접 받아 해결된 값을 반환합니다.
  // Suspense 경계 내에서만 사용할 수 있습니다.

  // const [loading, setLoading] = useState<boolean>(false)
  // const [error, setError] = useState<null | Error>(null)
  // const [data, setData] = useState<null | User[]>(null)

  // useEffect(() => {
  //   setLoading(true)
  //   setError(null)
  //
  //   fetchUsers()
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  //     .catch((error) => {
  //       setError(error)
  //       setLoading(false)
  //     })
  // }, [])

  // [안전] Promise 인스턴스를 기억하고 있으므로 렌더링과 상관없이 동일한 참조를 하위 컴포넌트에 전달
  const usersPromise = useMemo(() => {
    // [방법 2] Promise.catch() 오류 처리
    // fetchUsers().catch((error) => setError(error)),
    return fetchUsers()
  }, [])

  // [위험] 컴포넌트가 리렌더링 되면 무한 반복에 빠질 수 있다.
  // const [message, setMessage] = useState<string>('')

  // useEffect(() => {
  //   if (!message) {
  //     console.log('Users 렌더링: 메시지 업데이트')
  //     setMessage((m) => m + '!')
  //   }
  // }, [message])

  // const usersPromise = fetchUsers() // ... Promise 2

  // 오류 처리 [2]
  // Promise 거절될 경우,
  // catch() 메서드를 사용해 컴포넌트 내부에서 오류 처리
  // const [error, setError] = useState<null | Error>(null)

  // if (error) {
  //   return (
  //     <div
  //       role="alert"
  //       className={tw`
  //         text-red-600 bg-red-50 rounded
  //         p-2 border-2 border-red-700
  //       `}
  //     >
  //       {error.message}
  //     </div>
  //   )
  // }

  return (
    <section className="mt-6 p-6 max-w-xl bg-gray-50 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center text-indigo-700">
        사용자 목록 {/* ({message}) */}
      </h3>

      {/* {loading && <Loading />} */}
      {/* {!loading && data && <UserList items={data} />} */}

      {/* 오류 처리 [1] */}
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <UserList fetchUsersPromise={usersPromise} />
          {/* <UserList /> */}
        </Suspense>
      </ErrorBoundary>
    </section>
  )
}

function UserList({
  fetchUsersPromise,
}: {
  fetchUsersPromise: Promise<User[] | void>
}) {
  // use 함수는 Promise 인스턴스를 전달 받아
  // 결과가 해결(resolved)된 값을 반환합니다.
  // 오류가 발생한 경우, ErrorBoundary
  // 컴포넌트에서 에러 처리합니다.

  const items = use(fetchUsersPromise)
  // console.log(items)

  // 아래처럼 사용하면 무한 루프에 빠짐!! ❌
  // const usersPromise = fetchUsers()
  // const items = use(fetchUsers())

  // use 함수는 훅 함수가 아니므로,
  // if문 또는 for문 내부에서 사용이 가능!
  // let items: User[] = []
  // if (fetchUsersPromise) {
  //   items = use(fetchUsersPromise)
  // }

  return (
    <ul className="space-y-2">
      {items?.map((user) => (
        <li
          key={user.id}
          className={tw(
            'bg-white shadow-md rounded-lg p-4',
            'hover:bg-gray-50 transition-colors duration-200 flex items-center'
          )}
        >
          <span
            className={tw(
              'bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center',
              'text-indigo-600 font-bold mr-4'
            )}
          >
            {user.name.charAt(0)}
          </span>
          <span className="text-gray-800 font-medium">{user.name}</span>
        </li>
      ))}
    </ul>
  )
}

function Loading() {
  return (
    <div role="status" className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <p className="ml-3 text-indigo-600 font-medium">
        사용자 데이터를 불러오는 중...
      </p>
    </div>
  )
}

async function fetchUsers(): Promise<User[]> {
  await wait(1.2)

  // 오류 상황 체크
  // throw new Error('데이터 가져오기에 실패했습니다.')

  return [
    { id: '1', name: '김민준' },
    { id: '2', name: '이서연' },
    { id: '3', name: '박지호' },
    { id: '4', name: '최수아' },
    { id: '5', name: '정도윤' },
    { id: '6', name: '강하은' },
    { id: '7', name: '윤준서' },
    { id: '8', name: '임지민' },
    { id: '9', name: '한소율' },
    { id: '10', name: '오태현' },
  ]
}
