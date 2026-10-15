import type { UndoToastContent } from '../useUndoToast.ts'

type UndoToastProps = {
  toast: UndoToastContent
  onClose: () => void
}

export const UndoToast = ({ toast, onClose }: UndoToastProps) => {
  const handleUndo = () => {
    toast.undo()
    onClose()
  }

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-safe-20 mx-auto flex max-w-md items-center gap-3 rounded-xl bg-content py-1 pr-1 pl-4 text-sm text-surface-raised"
    >
      <span className="min-w-0 flex-1 truncate">{toast.message}</span>
      <button type="button" onClick={handleUndo} className="h-11 flex-none px-3 font-bold text-highlight">
        元に戻す
      </button>
    </div>
  )
}
