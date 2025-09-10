// @ts-expect-error GlobalStateContext를 불러오지 않아 오류 발생 (실습 예제로 진행)
import { GlobalStateContext } from '@/app';

export default function Shortcut() {
  return (
    // 컨텍스트 수요(사용, consumer)하기
    <GlobalStateContext.Consumer>
      {/* {(globalStateValue) => {
        return (
          <p className="fixed left-0 right-0 bottom-[var(--bottom,7vh)] text-sm leading-5 text-center">
            <strong className="text-amber-300">{globalStateValue?.mood}</strong>{' '}
            <code>Shift + Enter</code> 키를 누르면 애니메이션이{' '}
            <b className="text-emerald-400">{globalStateValue?.currentYear}</b>
            년 다시 시작됩니다.
          </p>
        )
      }} */}
    </GlobalStateContext.Consumer>
  );
}
