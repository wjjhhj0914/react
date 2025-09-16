import {
  Suspense,
  use,
  useMemo,
  // useEffect,
  // useState
} from 'react';
import { ErrorBoundary } from '@/components';
import { tw, wait } from '@/utils';

interface User {
  id: string;
  name: string;
}

export default function Users() {
  // [실습]
  // use 함수는 Promise를 직접 받아 해결된 값을 반환합니다.
  // Suspense 경계 내에서만 사용할 수 있습니다.

  // const [loading, setLoading] = useState<boolean>(false)
  // const [data, setData] = useState<null | User[]>(null)

  // useEffect(() => {
  //   setLoading(true)
  //   fetchUsers().then((data) => {
  //     setData(data)
  //     setLoading(false)
  //   })
  // }, [])

  const usersPromise = useMemo(() => fetchUsers(), []);

  return (
    <section className="mt-6 p-6 max-w-xl bg-gray-50 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center text-indigo-700">
        사용자 목록
      </h3>
      {/* {loading && <Loading />} */}
      {/* {!loading && data && <UserList items={data} />} */}

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <UserList fetchUsersPromise={usersPromise} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

function UserList({
  fetchUsersPromise,
}: {
  fetchUsersPromise: Promise<User[]>;
}) {
  // use 함수는 Promise 인스턴스를 전달 받아
  // 결과가 해결(resolved)된 값을 반환합니다.
  // 오류가 발생한 경우, ErrorBoundary
  // 컴포넌트에서 에러 처리합니다.

  const items = use(fetchUsersPromise);
  console.log(items);

  // use 함수는 훅 함수가 아니므로,
  // if문 또는 for문 내부에서 사용이 가능!
  // let items: User[] = []
  // if (fetchUsersPromise) {
  //   items = use(fetchUsersPromise)
  // }

  return (
    <ul className="space-y-2">
      {items.map(user => (
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
  );
}

function Loading() {
  return (
    <div role="status" className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <p className="ml-3 text-indigo-600 font-medium">
        사용자 데이터를 불러오는 중...
      </p>
    </div>
  );
}

async function fetchUsers(): Promise<User[]> {
  await wait(1.2);

  throw new Error('데이터 가져오기에 실패했습니다.');

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
  ];
}
