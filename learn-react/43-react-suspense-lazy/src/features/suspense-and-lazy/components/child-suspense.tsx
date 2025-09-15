import { useSuspenseQuery } from '@tanstack/react-query';
import { tw } from '@/utils';
import { getData } from '../api';

export default function ChildWithSuspense({ cutoff }: { cutoff: number }) {
  // [실습]
  // Suspense를 지원하는 쿼리 훅을 사용
  // - queryKey: ['data', cutoff]
  // - queryFn: getData(cutoff)
  // - retry: false
  const { data } = useSuspenseQuery({
    // 가져온 데이터를 클라이언트 측에 캐싱하기 위한 키
    queryKey: ['data', cutoff], // ['data', 4]
    // 비동기 함수
    queryFn: () => getData(cutoff),
    retry: false,
  });

  return (
    <ul className="list-none pl-0 flex flex-col gap-y-1">
      {data.map((item, i) => (
        <li
          key={i}
          className={tw(
            'size-8 grid place-content-center',
            'p-1 bg-emerald-600 text-white font-bold text-xs rounded'
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
