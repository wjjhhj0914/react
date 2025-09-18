/**
 * 지정된 지연 시간 후에 해결되는 Promise를 생성합니다.
 *
 * @example
 * // 기본값(1초) 동안 대기
 * await wait()
 * @example
 * // 1.5초 동안 대기
 * await wait(1.5)
 */
export default function wait(
  delay = 1,
  {
    forceRejected,
    resolveMessage = '요청이 성공했습니다.',
    rejectMessage = '요청이 실패했습니다.',
  }: WaitOptions = {}
) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (forceRejected) {
        reject(rejectMessage);
      } else {
        resolve(resolveMessage);
      }
    }, delay * 1000)
  );
}

interface WaitOptions {
  forceRejected?: boolean;
  resolveMessage?: string;
  rejectMessage?: string;
}
