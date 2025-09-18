import { ReactNode, useState, useTransition } from 'react'
import { performanceDelay, tw } from '@/utils'

type Tab = 'posts' | 'comments' | 'authors'

export default function Tabs() {
  const [tab, setTab] = useState<Tab>('posts')

  // [실습]
  // 탭 전환 시, 사용자 입력과 컴포넌트 렌더링을 분리해
  // 사용자 경험을 향상시켜 봅니다.
  const [isPending, startTransition] = useTransition()

  function handleTabChange(nextTab: Tab) {
    // 즉각적인 상태 업데이트 리액트에 요청
    // setTab(nextTab)

    // 트랜지션 시작
    startTransition(() => {
      // [1] 사용자와의 즉각적인 상호작용 우선순위
      // [2] 렌더링 우선순위를 낮춰서 진행
      setTab(nextTab)
    })
  }

  return (
    <div className={tw('w-full max-w-3xl p-4')}>
      <div className={tw('flex border-b border-gray-200 mb-4')}>
        <TabButton
          tab="posts"
          currentTab={tab}
          onClick={handleTabChange}
          isPending={isPending}
        >
          게시물
        </TabButton>
        <TabButton
          tab="comments"
          currentTab={tab}
          onClick={handleTabChange}
          isPending={isPending}
        >
          댓글
        </TabButton>
        <TabButton
          tab="authors"
          currentTab={tab}
          onClick={handleTabChange}
          isPending={isPending}
        >
          작성자
        </TabButton>
      </div>

      <TabWrapper isPending={isPending}>
        <TabPanel key={tab} tab={tab} />
      </TabWrapper>
    </div>
  )
}

function TabPanel({ tab }: { tab: Tab }) {
  // 탭에 따라 다른 콘텐츠 렌더링
  let render

  switch (tab) {
    case 'posts':
      render = <Posts />
      break
    case 'comments':
      render = <Comments />
      break
    case 'authors':
      render = <Authors />
      break
    default:
      render = null
  }

  return (
    <div className={tw('tab-panel bg-white rounded-lg shadow overflow-hidden')}>
      <h2
        className={tw(
          'text-xl font-semibold p-4 bg-gray-50 border-b border-gray-200'
        )}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </h2>
      <div className={tw('max-h-96 overflow-y-auto')}>{render}</div>
    </div>
  )
}

function TabButton({
  tab,
  currentTab,
  isPending,
  onClick,
  children,
}: {
  tab: Tab
  currentTab: Tab
  isPending?: boolean
  onClick: (tab: Tab) => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(tab)}
      className={tw(
        'cursor-pointer',
        'py-2 px-4 text-sm font-medium transition-colors duration-200',
        tab === currentTab
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700',
        isPending && 'opacity-50'
      )}
    >
      {children}
    </button>
  )
}

function Posts() {
  return (
    <ul className={tw('divide-y divide-gray-200')}>
      {Array(16)
        .fill(null)
        .map((_, i) => (
          <li key={i} className={tw('py-2 px-4 hover:bg-gray-50')}>
            게시물 {i + 1}
          </li>
        ))}
    </ul>
  )
}

function Authors() {
  return (
    <ul className={tw('divide-y divide-gray-200')}>
      {Array(22)
        .fill(null)
        .map((_, i) => (
          <li key={i} className={tw('py-2 px-4 hover:bg-gray-50')}>
            작성자 {i + 1}
          </li>
        ))}
    </ul>
  )
}

function Comments() {
  return (
    <ul className={tw('divide-y divide-gray-200')}>
      {Array(200)
        .fill(null)
        .map((_, i) => (
          <Comment key={i}>{i}</Comment>
        ))}
    </ul>
  )
}

function Comment({ children }: { children: number }) {
  performanceDelay(5)

  return (
    <li className={tw('py-2 px-4 hover:bg-gray-50')}>댓글 {children + 1}</li>
  )
}

function TabWrapper({
  isPending,
  children,
}: {
  isPending?: boolean
  children: ReactNode
}) {
  return (
    <div className={tw('relative')}>
      {isPending && (
        <div
          className={tw(
            'absolute inset-0 bg-white/70 z-10 flex items-center justify-center'
          )}
        >
          <Loading />
        </div>
      )}
      {children}
    </div>
  )
}

function Loading() {
  return (
    <div className={tw('flex justify-center my-2')}>
      <span
        role="status"
        className={tw('text-sm text-blue-500 flex items-center')}
      >
        <svg
          className={tw('animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className={tw('opacity-25')}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className={tw('opacity-75')}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        로딩 중...
      </span>
    </div>
  )
}
