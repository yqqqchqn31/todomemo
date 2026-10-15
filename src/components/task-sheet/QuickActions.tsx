import type { Destination, Placement } from '../../models/task.ts'
import { HighlighterIcon } from '../icons/HighlighterIcon.tsx'

type QuickActionsProps = {
  isHighlighted: boolean
  placement: Placement
  onToggleHighlight: () => void
  onMove: (destination: Destination) => void
}

const QUICK_BUTTON_CLASS =
  'flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-surface-raised text-sm font-bold aria-pressed:border-content'

const DESTINATION_BUTTONS = [
  { destination: 'today', label: '今日やる', hint: '今日のタブへ' },
  { destination: 'someday', label: 'いつか', hint: '急がない' },
] as const

export const QuickActions = ({ isHighlighted, placement, onToggleHighlight, onMove }: QuickActionsProps) => (
  <section>
    <h2 className="mb-2 text-xs text-content-muted">すぐできること</h2>
    <div className="grid grid-cols-3 gap-2">
      <button
        type="button"
        aria-pressed={isHighlighted}
        onClick={onToggleHighlight}
        className={`${QUICK_BUTTON_CLASS} aria-pressed:bg-highlight`}
      >
        <HighlighterIcon className="size-6" />
        蛍光ペン
        <small className="text-xs font-normal text-content-muted">忘れちゃダメ</small>
      </button>
      {DESTINATION_BUTTONS.map((button) => {
        const isCurrent = button.destination === placement

        return (
          <button
            key={button.destination}
            type="button"
            aria-pressed={isCurrent}
            onClick={() => onMove(button.destination)}
            className={`${QUICK_BUTTON_CLASS} aria-pressed:bg-surface`}
          >
            {button.label}
            <small className="text-xs font-normal text-content-muted">{isCurrent ? '今ここ' : button.hint}</small>
          </button>
        )
      })}
    </div>
    {placement !== 'unsorted' && (
      <button type="button" onClick={() => onMove('unsorted')} className="mt-1 h-11 text-sm text-content-muted underline">
        未整理に戻す
      </button>
    )}
  </section>
)
