import { useActionState, useId } from 'react'
import { tw, wait } from '@/utils'

export default function UsingActionState() {
  const id = useId()

  // 이전에 작성된 코드
  // const [data, setData] = useState<string>('1')
  // const [isPending, startTransition] = useTransition()

  // const formAction = async (formData: FormData) => {
  //   startTransition(async () => {
  //     const age = formData.get('age') as string
  //     await wait(1)
  //     setData(age)
  //   })
  // }

  // useActionState 훅을 사용한 코드
  const [age, formAction, isPending] = useActionState(
    async (_state: string, formData: FormData) => {
      await wait(1)
      return formData.get('age') as string
    },
    '1'
  )

  return (
    <form
      action={formAction}
      className={tw('max-w-xs mt-2 p-6 bg-white rounded-lg shadow space-y-4')}
    >
      <label htmlFor={id} className="block text-slate-800 font-semibold">
        나이 변경
      </label>
      <input
        type="number"
        name="age"
        id={id}
        disabled={isPending}
        className={tw(
          'w-full px-3 py-2',
          'border border-gray-300 rounded',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500'
        )}
        defaultValue={age}
        min={1}
      />
      <button
        type="submit"
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
          나이 = {age}
        </div>
      )}
    </form>
  )
}
