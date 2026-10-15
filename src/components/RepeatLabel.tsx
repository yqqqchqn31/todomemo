import { describeRepeat, type RepeatRule } from '../models/repeat.ts'
import { RepeatIcon } from './icons/RepeatIcon.tsx'

type RepeatLabelProps = {
  repeat: RepeatRule
  plannedDate: string | null
}

export const RepeatLabel = ({ repeat, plannedDate }: RepeatLabelProps) => (
  <span className="ml-1.5 inline-flex items-center gap-0.5 align-middle text-xs text-content-muted">
    <RepeatIcon className="size-3.5" />
    {describeRepeat(repeat, plannedDate)}
  </span>
)
