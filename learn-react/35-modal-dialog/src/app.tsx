import CustomModalDialog from './components/dialog/custom-modal-dialog'

export default function App() {
  return (
    <div className="p-10 flex flex-col gap-5">
      <div role="group" className="flex gap-1">
        <button type="button" className="button">
          모달 다이얼로그 열기
        </button>
      </div>

      <div className="transform-3d">
        <CustomModalDialog open>
          <div className="max-w-prose [&_p]:leading-normal space-y-3">
            <p>
              다이얼로그는 사용자와 상호작용하는 모달 창으로, 정보를 표시하거나
              사용자 입력을 받는 데 사용됩니다.
            </p>
            <p>
              모달 다이얼로그는 사용자가 다른 작업을 계속하기 전에 반드시
              상호작용해야 하는 중요한 정보나 작업을 표시할 때 유용합니다.
            </p>
            <a
              href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer button no-underline"
            >
              참고
            </a>
          </div>
        </CustomModalDialog>
      </div>

      <div className="max-w-prose [&_p]:leading-normal space-y-3">
        <p>
          다이얼로그는 사용자와 상호작용하는 모달 창으로, 정보를 표시하거나
          사용자 입력을 받는 데 사용됩니다.
        </p>
        <p>
          모달 다이얼로그는 사용자가 다른 작업을 계속하기 전에 반드시
          상호작용해야 하는 중요한 정보나 작업을 표시할 때 유용합니다.
        </p>
        <a
          href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer button no-underline"
        >
          참고
        </a>
      </div>
    </div>
  )
}
