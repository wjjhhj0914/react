import { tw } from '@/utils'

const BIG_LIST = Array.from({ length: 10000 }, (_, i) => `아이템 ${i + 1}`)

// [실습]
// 사용자 입력이 즉각 반응하지 않아 UI가 상당히 버벅이는 것처럼 느껴집니다.
// 많은 항목을 필터링하는데 렌더링이 느린 컴포넌트를 지연시켜, 사용자 입력에
// 즉각 반응할 수 있게 구성하여 사용자 경혐을 향상시키세요.
export default function FilterList({ query }: { query: string }) {
  const filtered = BIG_LIST.filter((item) => item.includes(query))

  return (
    <ul
      className={tw(
        'overflow-y-scroll h-50 p-2',
        'flex flex-col space-y-1',
        'w-xs md:w-sm rounded border-slate-300 border-1'
      )}
    >
      {filtered.map((item) => (
        <li key={item} className="text-sm text-slate-600">
          {item}
        </li>
      ))}
    </ul>
  )
}
