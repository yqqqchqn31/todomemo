import { parseISO } from 'date-fns'

type DateChoiceButtonProps = {
  label: string
  subLabel?: string
  isSelected: boolean
  onClick: () => void
}

type DateInputButtonProps = {
  label: string
  isSelected: boolean
  min: string
  value: string | null
  onPick: (date: Date) => void
}

const DATE_BUTTON_CLASS =
  'relative flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface-raised px-4 text-sm'

export const DateChoiceButton = ({ label, subLabel, isSelected, onClick }: DateChoiceButtonProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    onClick={onClick}
    className={`${DATE_BUTTON_CLASS} aria-pressed:border-content aria-pressed:bg-surface`}
  >
    {label}
    {subLabel && <small className="text-xs text-content-muted">{subLabel}</small>}
  </button>
)

export const DateInputButton = ({ label, isSelected, min, value, onPick }: DateInputButtonProps) => (
  <label
    data-selected={isSelected}
    className={`${DATE_BUTTON_CLASS} data-[selected=true]:border-content data-[selected=true]:bg-surface`}
  >
    {label}
    <input
      type="date"
      min={min}
      value={value ?? ''}
      onClick={(event) => event.currentTarget.showPicker()}
      onChange={(event) => {
        if (event.target.value === '') return
        onPick(parseISO(event.target.value))
      }}
      className="absolute inset-0 opacity-0"
    />
  </label>
)
