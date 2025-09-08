// Modal Dialog 컴포넌트
// 1. Custom Modal Dialog: <div role="dialog" aria-modal="true">
// 2. Native Modal Dialog: <dialog aria-modal="true">
import {
  type MouseEvent,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { XCircleIcon } from 'lucide-react'
import { tabbableSelector, tw } from '@/utils'

type Props = PropsWithChildren<{
  open?: boolean
  onClose?: () => void
  title?: string
  describe?: string
}>

export default function CustomModalDialog({
  open = false,
  onClose,
  title,
  describe,
  children,
}: Props) {
  const opennerRef = useRef<HTMLElement>(null)
  const dialogDimRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const describeId = `${dialogId}-describe`

  const close = useCallback(() => {
    opennerRef.current?.focus()
    onClose?.()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    // 다이얼로그가 열리면
    // 모달 다이얼로그를 연 어떤 요소를 RefObject를 사용해 기억(memo)
    opennerRef.current = document.activeElement as HTMLElement

    // 다이얼로그 안에서 탭키로 탐색 가능한(tabbable) 요소들을 수집
    const tabbables = [...dialog.querySelectorAll(tabbableSelector)]
    const isExistTabbables = tabbables.length > 0

    // 첫 번째 탭 키로 이동 가능한 요소에 초점 이동 설정
    const focusingFirstTabbable = () => {
      if (isExistTabbables) {
        const firstTabbable = tabbables.at(0) as HTMLElement
        firstTabbable.focus()
      }
    }

    focusingFirstTabbable()

    // 포커스 트랩(focus-trap)
    // - 탭 이동이 가능한(tabbable) 요소들 중 마지막 요소에서
    //   Tab 키를 누르면 첫번째 요소로 초점 이동 (브라우저 기본 작동 방지)
    // - 탭 이동이 가능한(tabbable) 요소들 중 첫번째 요소에서
    //   Shift + Tab 키를 누르면 마지막 요소로 초점 이동 (브라우저 기본 작동 방지)
    // - 탈출(Escape) 키를 누르면 모달 다이어로그가 닫혀야 하고,
    //   모달 다이얼로그를 트리거(trigger)한 오프너(openner) 요소에 초점 되돌려 줘야 함
    const handleFocusTrap = (e: globalThis.KeyboardEvent) => {
      if (!isExistTabbables) return

      const { key, shiftKey } = e
      const { activeElement } = document
      const firstTabbable = tabbables.at(0) as HTMLElement
      const lastTabbable = tabbables.at(-1) as HTMLElement

      if (key === 'Escape') return close()

      if (key === 'Tab') {
        if (shiftKey && activeElement === firstTabbable) {
          // 탭 이동이 가능한(tabbable) 요소들 중 첫번째 요소에서
          // Shift + Tab 키를 누르면 마지막 요소로 초점 이동 (브라우저 기본 작동 방지)
          e.preventDefault()
          lastTabbable.focus()
        } else if (!shiftKey && activeElement === lastTabbable) {
          // 탭 이동이 가능한(tabbable) 요소들 중 마지막 요소에서
          // Tab 키를 누르면 첫번째 요소로 초점 이동 (브라우저 기본 작동 방지)
          console.log('마지막 탭 이동 가능한 요소에서 Tab 키 누름')
          e.preventDefault()
          firstTabbable.focus()
        }
      }
    }

    dialog.addEventListener('keydown', handleFocusTrap)

    // 다이얼로그가 열린 상태
    // 문서의 스크롤 바를 감춤
    document.body.style.overflowY = 'hidden'

    return () => {
      dialog.removeEventListener('keydown', handleFocusTrap)
      // 다이얼로그가 닫힌 상태
      // 문서의 스크롤 바를 표시
      setTimeout(() => {
        document.body.style.overflowY = 'visible'
      }, 0)
    }
  }, [open, onClose, close])

  const portalContainer = document.getElementById('modal-dialog-portal')
  if (!portalContainer) return null

  return createPortal(
    <div
      ref={dialogDimRef}
      role="presentation"
      onClick={(e) => dialogDimRef.current === e.target && close()}
      className={tw(
        'fixed inset-0 z-10000',
        open ? 'flex' : 'hidden',
        'justify-center items-center',
        'bg-black/20 backdrop-blur-[3px]'
      )}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={describe ? describeId : undefined}
        className={tw(
          'relative',
          'w-full max-w-lg rounded-lg shadow-xl p-10',
          'bg-white'
        )}
      >
        <h2 id={titleId}>{title && '다이얼로그 제목'}</h2>
        {describe && <p id={describeId}>{describe}</p>}
        {children}
        <button
          type="button"
          aria-label="다이얼로그 닫기"
          title="다이얼로그 닫기"
          onClick={close}
          className={tw(
            'cursor-pointer',
            'absolute -top-2.5 -right-2.5 rounded-full',
            'bg-black text-white'
          )}
        >
          <XCircleIcon size={28} />
        </button>
      </div>
    </div>,
    portalContainer
  )
}
