import { REPEAT_LABEL, REPEAT_RULES, type RepeatRule } from '../../models/repeat.ts'
import { DateChoiceButton } from './DateButtons.tsx'

type RepeatFieldProps = {
  repeat: RepeatRule | null
  onChangeRepeat: (repeat: RepeatRule | null) => void
}

export const RepeatField = ({ repeat, onChangeRepeat }: RepeatFieldProps) => (
  <section>
    <h2 className="mb-2 text-xs text-content-muted">くり返し</h2>
    <div className="flex flex-wrap gap-2">
      <DateChoiceButton label="なし" isSelected={repeat == null} onClick={() => onChangeRepeat(null)} />
      {REPEAT_RULES.map((rule) => (
        <DateChoiceButton
          key={rule}
          label={REPEAT_LABEL[rule]}
          isSelected={repeat === rule}
          onClick={() => onChangeRepeat(rule)}
        />
      ))}
    </div>
  </section>
)
