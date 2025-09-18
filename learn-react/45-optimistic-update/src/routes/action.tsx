import { createFileRoute } from '@tanstack/react-router'
import {
  OptimisticUI,
  TodoListOptimistic,
  UsingAction,
  UsingActionState,
} from '@/features/action-state'
import { tw } from '@/utils'

function Page() {
  return (
    <>
      <title>리액트 액션 (Actions)</title>
      <section className="my-2">
        <h2 className="text-[22px] font-semibold">액션 (Actions)</h2>
        <div className="mt-2 flex flex-col max-w-[600px] gap-y-2 text-gray-700">
          <p>
            리액트 액션(Actions)은 사용자 이벤트에 응답하여 상태를 업데이트하는
            함수입니다.
          </p>
          <p>
            액션을 사용하면 폼 제출, 데이터 변경과 같은 사용자 상호작용을
            효율적으로 처리할 수 있으며, 서버와의 통신이나 상태 업데이트를
            선언적으로 관리할 수 있습니다.
          </p>
        </div>
        <div
          className={tw` 
            flex flex-col
            lg:flex-row flex-wrap
            gap-x-8 items-start
            mt-5
          `}
        >
          <article hidden className="my-5 w-full lg:max-w-3/4">
            <h3 className="text-2xl text-indigo-600 flex items-center gap-x-1">
              TodoList +{' '}
              <code className="bg-indigo-100 pt-0 pb-0.5 px-2 rounded text-xl">
                useOptimistic
              </code>{' '}
              훅 사용
            </h3>
            <TodoListOptimistic />
          </article>

          <div className="flex flex-col space-y-5">
            <article className="my-5">
              <h3 className="text-2xl text-indigo-600 flex items-center gap-x-1">
                <code className="bg-indigo-100 pt-0 pb-0.5 px-2 rounded text-xl">
                  useOptimistic
                </code>{' '}
                훅 사용
              </h3>
              <OptimisticUI />
            </article>
            <article hidden className="my-5">
              <h3 className="text-2xl text-indigo-600 flex items-center gap-x-1">
                <code className="bg-indigo-100 pt-0 pb-0.5 px-2 rounded text-xl">
                  useActionState
                </code>{' '}
                훅 사용
              </h3>
              <UsingActionState />
            </article>
            <article hidden className="my-5">
              <h3 className="text-2xl text-indigo-600 flex items-center gap-x-1">
                &lt;form&gt; 요소의{' '}
                <code className="bg-indigo-100 pt-0 pb-0.5 px-2 rounded text-xl">
                  action
                </code>{' '}
                속성 사용
              </h3>
              <UsingAction />
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

export const Route = createFileRoute('/action')({
  component: Page,
})
