type ResetDataButtonProps = {
  onReset: () => void
}

export const ResetDataButton = ({ onReset }: ResetDataButtonProps) => (
  <button type="button" onClick={onReset} className="mt-10 min-h-11 text-xs text-content-muted underline">
    データをすべて消して、最初の状態に戻す
  </button>
)
