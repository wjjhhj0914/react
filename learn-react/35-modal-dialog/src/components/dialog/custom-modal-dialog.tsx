// Modal Dialog 컴포넌트
// 1. Custom Modal Dialog: <div role="dialog" aria-modal="true">
// 2. Native Modal Dialog: <dialog aria-modal="true">
import { type MouseEvent, type PropsWithChildren, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { XCircleIcon } from 'lucide-react'
import { tw } from '@/utils'

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
  const dialogDimRef = useRef<HTMLDivElement>(null)

  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const describeId = `${dialogId}-describe`

  const portalContainer = document.getElementById('modal-dialog-portal')
  if (!portalContainer) return null

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (dialogDimRef.current === e.target) {
      onClose?.()
    }
  }

  return createPortal(
    <div
      ref={dialogDimRef}
      role="presentation"
      onClick={handleClose}
      className={tw(
        'fixed inset-0 z-10000',
        open ? 'flex' : 'hidden',
        'justify-center items-center',
        'bg-black/20 backdrop-blur-[3px]'
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={describe ? describeId : undefined}
        className={tw(
          'relative w-full max-w-lg rounded-lg shadow-xl p-10',
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
          onClick={onClose}
          className={tw(
            'cursor-pointer',
            'absolute -top-2.5 -right-2.5 bg-black text-white rounded-full'
          )}
        >
          <XCircleIcon size={28} />
        </button>
      </div>
    </div>,
    portalContainer
  )
}
