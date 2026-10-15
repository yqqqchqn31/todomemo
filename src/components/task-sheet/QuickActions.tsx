import { HighlighterIcon } from '../icons/HighlighterIcon.tsx'

type QuickActionsProps = {
  isHighlighted: boolean
  onToggleHighlight: () => void
}

const QUICK_BUTTON =
  'flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-surface-raised text-sm font-bold aria-pressed:border-content'

export const QuickActions = ({ isHighlighted, onToggleHighlight }: QuickActionsProps) => (
  <section>
    <h2 className="mb-2 text-xs text-content-muted">すぐできること</h2>
    <div className="grid grid-cols-3 gap-2">
      <button
        type="button"
        aria-pressed={isHighlighted}
        onClick={onToggleHighlight}
        className={`${QUICK_BUTTON} aria-pressed:bg-highlight`}
      >
        <HighlighterIcon className="size-6" />
        蛍光ペン
        <small className="text-xs font-normal text-content-muted">忘れちゃダメ</small>
      </button>
    </div>
  </section>
)
