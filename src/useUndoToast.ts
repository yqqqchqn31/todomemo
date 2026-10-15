import { useEffect, useState } from 'react'

const TOAST_DURATION_MS = 4000

export type UndoToastContent = {
  message: string
  undo: () => void
}

export const useUndoToast = () => {
  const [toast, setToast] = useState<UndoToastContent | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS)
    return () => clearTimeout(timer)
  }, [toast])

  const closeToast = () => setToast(null)

  return { toast, showToast: setToast, closeToast }
}
