import { useEffect, useRef, type ReactNode } from 'react'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  label: string
  children: ReactNode
}

const CLOSE_THRESHOLD_PX = 8
const SCROLL_SETTLE_MS = 120

const DIALOG_CLASS =
  'm-0 h-dvh max-h-none w-full max-w-none snap-y snap-mandatory overflow-y-auto overscroll-none bg-transparent [scrollbar-width:none] backdrop:bg-content/35'
const SHEET_CLASS =
  'mx-auto w-full max-w-lg snap-end rounded-t-2xl bg-surface-raised px-5 pt-2.5 pb-safe-6 text-content'

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

export const BottomSheet = ({ isOpen, onClose, label, children }: BottomSheetProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const isFullyOpenedRef = useRef(false)
  const settleTimerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog == null) return

    if (!isOpen) {
      dialog.close()
      return
    }

    isFullyOpenedRef.current = false
    dialog.showModal()
    dialog.scrollTop = 0
    sheetRef.current?.scrollIntoView({ block: 'end', behavior: scrollBehavior() })
  }, [isOpen])

  const slideDown = () => dialogRef.current?.scrollTo({ top: 0, behavior: scrollBehavior() })

  const closeIfSlidDown = () => {
    const dialog = dialogRef.current
    if (dialog == null || !isOpen) return

    const bottomScrollTop = dialog.scrollHeight - dialog.clientHeight
    if (dialog.scrollTop >= bottomScrollTop - CLOSE_THRESHOLD_PX) isFullyOpenedRef.current = true
    if (!isFullyOpenedRef.current || dialog.scrollTop > CLOSE_THRESHOLD_PX) return
    onClose()
  }

  const closeAfterScrollSettles = () => {
    window.clearTimeout(settleTimerRef.current)
    settleTimerRef.current = window.setTimeout(closeIfSlidDown, SCROLL_SETTLE_MS)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onScroll={closeAfterScrollSettles}
      className={DIALOG_CLASS}
    >
      <div aria-hidden="true" onClick={slideDown} className="h-dvh snap-start" />
      <div ref={sheetRef} className={SHEET_CLASS}>
        <button
          type="button"
          aria-label="閉じる"
          autoFocus
          onClick={slideDown}
          className="mx-auto mb-1 flex h-6 w-16 items-start justify-center"
        >
          <span className="h-1.5 w-10 rounded-full bg-border" />
        </button>
        {children}
      </div>
    </dialog>
  )
}
