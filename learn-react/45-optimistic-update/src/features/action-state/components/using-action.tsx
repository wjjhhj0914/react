import { type FormEvent, useId, useState, useTransition } from 'react'
import { tw, wait } from '@/utils'

// [이전 방식]
// 아래 작성된 예시 코드처럼
// 비동기 작업(예: 서버 요청)을 처리할 때,
// 직접 loading, error, data 상태 관리 필요
// 코드가 복잡하고 실수 여지도 많음

// [실습]
// 리액트 19에서 도입된 액션(Action)을 사용해 새로운 비동기 작업 처리
// - 폼의 action 속성에 액션 함수 설정
// - 트랜지션을 사용해 로딩 상태와 트랜지션 시작 설정
// - 액션을 트랜지션과 함께 사용하면
//   비동기 작업이 진행되는 동안 부드럽게 UI 작동

export default function UsingAction() {
  const id = useId()

  const [data, setData] = useState<string>('10')
  const [isPending, startTransition] = useTransition()

  const actionFunc = async (formData: FormData) => {
    const age = formData.get('age')

    startTransition(async () => {
      await wait(1)
      if (typeof age === 'string') setData(age)
    })
  }

  return (
    <form
      // action={actionFunc}
      className={tw('max-w-xs mt-2 p-6 bg-white rounded-lg shadow space-y-4')}
    >
      <label htmlFor={id} className="block text-slate-800 font-semibold">
        나이 변경
      </label>
      <input
        type="number"
        name="age"
        id={id}
        className={tw(
          'w-full px-3 py-2',
          'border border-gray-300 rounded',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500'
        )}
        defaultValue={data}
        min={1}
      />
      <button
        type="submit"
        formAction={actionFunc}
        disabled={isPending}
        className={tw(
          'w-full py-2 px-4 rounded font-bold transition',
          isPending && 'bg-gray-300 text-gray-500 cursor-not-allowed',
          isPending || 'bg-indigo-600 text-white hover:bg-indigo-700'
        )}
      >
        {isPending ? '저장 중...' : '저장'}
      </button>
      {isPending || (
        <div
          className={tw('text-center text-sm font-semibold text-indigo-700')}
        >
          나이 = {data}
        </div>
      )}
    </form>
  )
}
