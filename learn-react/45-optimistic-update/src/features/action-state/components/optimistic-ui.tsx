import { useOptimistic, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { tw, wait } from '@/utils';

export default function OptimisticUI() {
  // 사용자에게 보여질 UI 상태 (서버의 응답 결과를 상태에 동기화)
  const [messages, setMessages] = useState<string[]>(['낙관적인 UI 업데이트']);

  // [실습]
  // - 낙관적인 업데이트가 가능하도록 구성 (옵티미스틱 UI)
  const [optimisticMessages, updateOptimisticMessages] =
    useOptimistic(messages);

  // - 낙관적인 업데이트 상황을 화면에 표시 (트랜지션 활용)
  // - 서버의 응답 결과가 실패한 경우에는 낙관적인 업데이트를 다시 이전으로 복원

  // - 사용자에게 더 나은 피드백을 주기 위해 로딩 상태 적용을 위해 useState 훅 시도 ❌
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // 명시적으로 트랜지션(전환) 시작/끝의 상태를 알 수 있게 useTransition 훅 사용 ✅
  const [isPending, startTransition] = useTransition();

  // 폼 요소에 연결된 이벤트 핸들러 vs. 폼 요소의 action 속성에 연결된 액션 함수
  // - 이벤트 객체 (e: FormEvent<HTMLFormElement>)      vs. (formData: FormData)
  // - e.preventDefault()                            vs. 별도 설정 없음 (자동 브라우저 기본 작동 방지)
  // - form.reset()                                  vs. 별도 설정 없음 (자동 폼 초기화)
  // - 비동기 함수 코드 (상태 업데이트 요청 시, 렌더링 우선 순위) vs. 자동 트랜지션(Transition) 시작/끝 처리 (렌더링 우선순위가 낮아짐)

  const formAction = async (formData: FormData) => {
    const message = (formData.get('message') as string) ?? '';
    if (!message.trim()) return;

    // 로딩 상태 전환 (상태 업데이트 요청: render trigger)
    // 폼 액션 함수이므로 트래지션 시작된 상태 (렌더링 우선순위가 낮음)
    // 업데이트 요청을 업데이트 큐(대기열)에 쌓아둠 (실제 실행하지 않음 : 리액트 렌더링 없음)
    // setIsLoading(true)

    // [실습]
    // 낙관적인 업데이트
    updateOptimisticMessages([...optimisticMessages, message]);

    // updateOptimisticMessages((optimisticMessages) => [
    //   ...optimisticMessages,
    //   message,
    // ])

    // 명시적으로 트랜지셕 시작/끝 상태 확인
    startTransition(async () => {
      // 내부의 로직을 별도의 함수로 분리하면 함수 이름 접미사에 Action을 붙이길 권장! (컨벤션)
      // 서버 요청 시뮬레이션
      await wait(1.5);

      // 실제 상태 업데이트
      setMessages(prevMessages => [...prevMessages, message]);

      // 사용자 알림
      toast.success('실제 데이터가 업데이트 되었습니다!');
    });

    // 다시 로딩 상태 전환 (상태 업데이트 요청: render trigger)
    // 업데이트 큐(대기열)에 쌓였던 이전의 setIsLoading(true)와
    // 지금의 setIsLoading(false)가 동시에 큐에 쌓임
    // 그러면 리액트는 마지막에 isLoading 상태를 false 설정하려 하는데
    // 이미 false이므로 리액트는 반응하지 않습니다.
    // setIsLoading(false)
  };

  return (
    <div className={tw`flex items-center justify-center mt-2`}>
      <div className={tw`w-full max-w-md p-6 bg-white rounded-lg shadow`}>
        <form action={formAction} className={tw`flex gap-2 items-center`}>
          <input
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
              ${isPending && 'opacity-50 cursor-not-allowed'}
            `}
          >
            {isPending ? '추가 중...' : '추가'}
          </button>
        </form>
        <div className={tw`mt-4 mb-0 space-y-2`}>
          {optimisticMessages.map((message, index) => (
            <div
              key={`message-${index}-${message}`}
              className={tw`
                px-3 py-2 rounded bg-blue-50 text-indigo-800 font-mono
              `}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
