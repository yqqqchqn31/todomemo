import type { Label } from '../models/label.ts'
import { LABEL_COLOR_CLASS } from './labelColorClass.ts'

type LabelChipsProps = {
  labels: Label[]
}

export const LabelChips = ({ labels }: LabelChipsProps) =>
  labels.map((label) => (
    <span
      key={label.id}
      className={`ml-1.5 inline-block rounded px-1.5 align-middle text-xs leading-5 ${LABEL_COLOR_CLASS[label.color]}`}
    >
      {label.name}
    </span>
  ))
