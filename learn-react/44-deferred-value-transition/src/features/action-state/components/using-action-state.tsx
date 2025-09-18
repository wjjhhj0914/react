import {
  useActionState,
  useId,
  // type FormEvent,
  // useState,
  // useTransition,
} from 'react';
import { useFormStatus } from 'react-dom';
import { tw, wait } from '@/utils';

export default function UsingActionState() {
  const id = useId();

  // --------------------------------------------------------------------------
  // 리액트에서 이전에 사용되던 코드

  // const [data, setData] = useState<string>('1')
  // const [isPending, setIsPending] = useState<boolean>(false)

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setIsPending(true)

  //   const form = e.currentTarget
  //   const formData = new FormData(form)
  //   const age = formData.get('age') as string

  //   await wait(1)

  //   setData(age)
  //   setIsPending(false)
  //   form.reset()
  // }

  // --------------------------------------------------------------------------
  // [실습]

  // <form> 요소의 action 속성 + useState + useTransition 코드

  // const [data, setData] = useState<string>('1')
  // const [isPending, startTransition] = useTransition()

  // const formAction = async (formData: FormData) => {
  //   const age = formData.get('age') as string
  //   startTransition(async () => {
  //     await wait(1.2)
  //     setData(age)
  //   })
  // }

  // --------------------------------------------------------------------------
  // [실습]
  // useActionState 코드
  // 폼 상태, 폼 액션(함수), 팬딩 상태

  const [data, formAction, isPending] = useActionState(
    async (_prevData: string, formData: FormData) => {
      const age = formData.get('age') as string;
      await wait(1.2);
      return age;
    },
    '1'
  );

  return (
    <form
      action={formAction}
      // onSubmit={handleSubmit}
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
        defaultValue={data}
        min={1}
        className={tw`
          w-full px-3 py-2
          border border-gray-300 rounded
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        `}
      />
      <SubmitButton />
      <PrintData data={data} />
    </form>
  );
}

function PrintData({ data }: { data: string }) {
  const { pending } = useFormStatus();

  return (
    pending || (
      <div className={tw`text-center text-sm font-semibold text-indigo-700`}>
        나이 = {data}
      </div>
    )
  );
}

function SubmitButton() {
  const { pending: isPending } = useFormStatus();

  return (
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
  );
}
