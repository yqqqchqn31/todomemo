import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  label: string
  children: ReactNode
}

const SHEET_LAYOUT = 'mx-auto mt-auto mb-0 max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-surface-raised text-content'
const SLIDE_UP =
  'translate-y-full open:translate-y-0 starting:open:translate-y-full transition-[translate,display,overlay] transition-discrete duration-300'
const BACKDROP_FADE =
  'backdrop:bg-content/0 open:backdrop:bg-content/35 starting:open:backdrop:bg-content/0 backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete backdrop:duration-300'
const NO_MOTION = 'motion-reduce:transition-none motion-reduce:backdrop:transition-none'

export const BottomSheet = ({ isOpen, onClose, label, children }: BottomSheetProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!isOpen) {
      dialog.close()
      return
    }

    dialog.showModal()
  }, [isOpen])

  const closeOnBackdropTap = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onClick={closeOnBackdropTap}
      className={`${SHEET_LAYOUT} ${SLIDE_UP} ${BACKDROP_FADE} ${NO_MOTION}`}
    >
      <div className="px-5 pt-2.5 pb-safe-6">
        <button
          type="button"
          aria-label="閉じる"
          autoFocus
          onClick={onClose}
          className="mx-auto mb-1 flex h-6 w-16 items-start justify-center"
        >
          <span className="h-1.5 w-10 rounded-full bg-border" />
        </button>
        {children}
      </div>
    </dialog>
  )
}
