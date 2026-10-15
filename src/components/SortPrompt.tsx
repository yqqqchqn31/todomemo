type SortPromptProps = {
  count: number
  onStart: () => void
}

export const SortPrompt = ({ count, onStart }: SortPromptProps) => {
  if (count === 0) return null

  return (
    <div className="mb-2 flex items-center gap-3 rounded-xl bg-highlight/40 px-4 py-3">
      <p className="flex-1 text-sm">
        とりあえずが{count}こ
        <span className="block text-xs text-content-muted">気が向いたときだけでOK</span>
      </p>
      <button
        type="button"
        onClick={onStart}
        className="min-h-11 rounded-full bg-content px-4 text-sm text-surface-raised"
      >
        整理する
      </button>
    </div>
  )
}
