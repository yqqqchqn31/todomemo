import type { Label } from '../../models/label.ts'
import { CheckIcon } from '../icons/CheckIcon.tsx'
import { LABEL_COLOR_CLASS } from '../labelColorClass.ts'
import { NewLabelInput } from './NewLabelInput.tsx'

type LabelFieldProps = {
  labels: Label[]
  selectedIds: string[]
  onToggle: (labelId: string) => void
  onCreate: (name: string) => void
}

const LABEL_BUTTON_CLASS =
  'flex min-h-11 items-center gap-1 rounded-full border border-transparent px-4 text-sm aria-pressed:border-current'

export const LabelField = ({ labels, selectedIds, onToggle, onCreate }: LabelFieldProps) => (
  <section>
    <h2 className="mb-2 text-xs text-content-muted">ラベル</h2>
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => {
        const isSelected = selectedIds.includes(label.id)

        return (
          <button
            key={label.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(label.id)}
            className={`${LABEL_BUTTON_CLASS} ${LABEL_COLOR_CLASS[label.color]}`}
          >
            {label.name}
            {isSelected && <CheckIcon className="size-3.5" />}
          </button>
        )
      })}
      <NewLabelInput onCreate={onCreate} />
    </div>
  </section>
)
