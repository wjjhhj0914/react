import { createFileRoute } from '@tanstack/react-router'

function Page() {
  return (
    <>
      <title>use 함수</title>
      <section className="my-2">
        <h2 className="text-[22px] font-semibold">use 함수</h2>
        <p className="my-2">
          React의 use 함수는 Promise, Context 등 다양한 리소스를 컴포넌트 내에서
          직접 사용할 수 있게 해주는 새로운 Hook입니다.
        </p>
        <p className="my-2">
          이를 통해 비동기 데이터를 더 간결하게 처리하고 컴포넌트 트리 깊은
          곳까지 데이터를 전달하는 작업을 단순화할 수 있습니다.
        </p>

        {/* <Users /> */}
      </section>
    </>
  )
}

export const Route = createFileRoute('/use-function')({
  component: Page,
})
