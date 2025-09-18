import { useActionState, useOptimistic, useRef } from 'react'
import { LucideLoader2 } from 'lucide-react'
import { tw, wait } from '@/utils'

interface Message {
  id: string
  text: string
  pending?: boolean
}

const initialState: Message[] = [
  { id: crypto.randomUUID(), text: '낙관적인 UI 업데이트' },
]

export default function OptimisticUI() {
  const newMessageRef = useRef<HTMLInputElement>(null)

  const [messages, formAction] = useActionState(
    async (messages: Message[], formData: FormData) => {
      const text = formData.get('message') as string

      if (!text) {
        alert('메시지를 입력하세요!')
        newMessageRef.current?.focus()
        return messages
      }

      const newMessage = {
        id: crypto.randomUUID(),
        text,
        pending: true,
      }

      updateOptimisticMessages({ type: 'add', payload: { newMessage } })

      try {
        await wait(1.1, { forceResolved: false })
        const { id, text } = newMessage
        return [{ id, text }, ...messages]
      } catch {
        updateOptimisticMessages({ type: 'rollback' })
        return messages
      }
    },
    initialState
  )

  const [optimisticMessages, updateOptimisticMessages] = useOptimistic<
    Message[],
    { type: 'add'; payload: { newMessage: Message } } | { type: 'rollback' }
  >(messages, (messages, action) => {
    if (action.type === 'add') {
      const { newMessage } = action.payload
      return [newMessage, ...messages]
    }

    if (action.type === 'rollback') {
      return messages
    }

    return messages
  })

  return (
    <div className={tw`flex items-center justify-center mt-2`}>
      <div className={tw`w-full max-w-md p-6 bg-white rounded-lg shadow`}>
        <form
          noValidate
          action={formAction}
          className={tw`flex gap-2 items-center`}
        >
          <input
            ref={newMessageRef}
            type="text"
            name="message"
            className={tw`
              flex-1 px-3 py-2
              border border-gray-300 rounded
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            `}
            placeholder="메시지 입력"
            required
          />
          <button
            type="submit"
            className={tw`
              cursor-pointer
              px-4 py-2 bg-indigo-600 text-white font-bold rounded 
              hover:bg-indigo-700 transition
              disabled:cursor-not-allowed disabled:opacity-50
            `}
          >
            추가
          </button>
        </form>
        <div className={tw`mt-4 mb-0 space-y-2`}>
          {optimisticMessages.map((message) => (
            <div
              key={message.id}
              className={tw`
                flex items-center gap-x-1
                px-3 py-2 rounded 
              bg-blue-50 text-indigo-800 font-mono
              `}
            >
              {message.text}{' '}
              {message.pending && (
                <LucideLoader2
                  role="status"
                  size={16}
                  className="animate-spin"
                  aria-label="낙관적으로 업데이트한 후, 응답을 기다리는 중..."
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
