import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  label: string
  children: ReactNode
}

const CLOSE_DRAG_PX = 80
const SLIDE_MS = 250
const SLIDE_EASING = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

const DIALOG_CLASS =
  'mx-auto mt-auto mb-0 max-h-[85dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-2xl bg-surface-raised px-5 pt-2.5 pb-safe-6 text-content backdrop:bg-content/35'

const slideDuration = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : SLIDE_MS)

const slide = (element: HTMLElement, from: string, to: string) =>
  element.animate([{ transform: from }, { transform: to }], {
    duration: slideDuration(),
    easing: SLIDE_EASING,
  }).finished

const isInside = (element: HTMLElement, x: number, y: number) => {
  const rect = element.getBoundingClientRect()
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

export const BottomSheet = ({ isOpen, onClose, label, children }: BottomSheetProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isClosingRef = useRef(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const slideOutAndClose = async (fromY = 0) => {
    const dialog = dialogRef.current
    if (dialog == null || isClosingRef.current) return

    isClosingRef.current = true
    await slide(dialog, `translateY(${fromY}px)`, 'translateY(100%)').catch(() => {})
    dialog.style.transform = ''
    onCloseRef.current()
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog == null) return

    if (!isOpen) {
      dialog.close()
      return
    }

    isClosingRef.current = false
    dialog.showModal()
    dialog.scrollTop = 0
    void slide(dialog, 'translateY(100%)', 'none')
  }, [isOpen])

  // Android の「引っぱって再読み込み」を止めるため、指の動きを自分で受け取る（passive にしない）
  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog == null) return

    let startY = 0
    let dragY = 0
    let isOnBackdrop = false
    let canDrag = false
    let isDragging = false

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      startY = touch.clientY
      dragY = 0
      isOnBackdrop = !isInside(dialog, touch.clientX, touch.clientY)
      canDrag = !isOnBackdrop && dialog.scrollTop <= 0
      isDragging = false
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (isOnBackdrop) {
        event.preventDefault()
        return
      }
      if (!canDrag) return

      dragY = Math.max(event.touches[0].clientY - startY, 0)
      if (dragY === 0 && !isDragging) return

      isDragging = true
      event.preventDefault()
      dialog.style.transform = `translateY(${dragY}px)`
    }

    const handleTouchEnd = () => {
      if (!isDragging) return

      isDragging = false
      if (dragY > CLOSE_DRAG_PX) {
        void slideOutAndClose(dragY)
        return
      }

      dialog.style.transform = ''
      void slide(dialog, `translateY(${dragY}px)`, 'none')
    }

    dialog.addEventListener('touchstart', handleTouchStart, { passive: true })
    dialog.addEventListener('touchmove', handleTouchMove, { passive: false })
    dialog.addEventListener('touchend', handleTouchEnd)
    dialog.addEventListener('touchcancel', handleTouchEnd)
    return () => {
      dialog.removeEventListener('touchstart', handleTouchStart)
      dialog.removeEventListener('touchmove', handleTouchMove)
      dialog.removeEventListener('touchend', handleTouchEnd)
      dialog.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [])

  const closeIfBackdropClicked = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current
    if (dialog == null || event.target !== dialog) return
    if (isInside(dialog, event.clientX, event.clientY)) return
    void slideOutAndClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={onClose}
      onClick={closeIfBackdropClicked}
      className={DIALOG_CLASS}
    >
      <button
        type="button"
        aria-label="閉じる"
        autoFocus
        onClick={() => void slideOutAndClose()}
        className="mx-auto mb-1 flex h-6 w-16 items-start justify-center"
      >
        <span className="h-1.5 w-10 rounded-full bg-border" />
      </button>
      {children}
    </dialog>
  )
}
