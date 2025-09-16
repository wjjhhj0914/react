import { useRef, useState } from 'react';
import { tw, wait } from '@/utils';

export default function OptimisticUI() {
  const [messages, setMessages] = useState<string[]>(['낙관적인 UI 업데이트']);

  // [실습]
  // - 낙관적인 업데이트가 가능하도록 구성 (옵티미스틱 UI)
  // - 낙관적인 업데이트 상황을 화면에 표시 (트랜지션 활용)

  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    const message = (formData.get('message') as string) ?? '';
    if (!message.trim()) return;

    // [실습]
    // 낙관적인 업데이트

    // 서버 요청 시뮬레이션
    await wait();

    // 실제 상태 업데이트
    setMessages(prevMessages => [...prevMessages, message]);
  }

  return (
    <div className={tw`flex items-center justify-center mt-10`}>
      <div className={tw`w-full max-w-md p-6 bg-white rounded-lg shadow`}>
        <form
          ref={formRef}
          action={formAction}
          className={tw`flex gap-2 items-center`}
        >
          <input
            type="text"
            name="message"
            className={tw`flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            placeholder="메시지 입력"
            required
          />
          <button
            type="submit"
            className={tw`
              px-4 py-2 bg-indigo-600 text-white font-bold rounded
              hover:bg-indigo-700 transition
              disabled:cursor-not-allowed disabled:opacity-50
            `}
          >
            추가
          </button>
        </form>
        <div className={tw`mt-4 mb-0 space-y-2`}>
          {messages.map((message, index) => (
            <div
              key={`message-${index}-${message}`}
              className={tw`px-3 py-2 rounded bg-blue-50 text-indigo-800 font-mono`}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
