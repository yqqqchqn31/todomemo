import type { LabelColor } from '../models/label.ts'

export const LABEL_COLOR_CLASS: Record<LabelColor, string> = {
  purple: 'bg-label-purple text-label-purple-ink',
  green: 'bg-label-green text-label-green-ink',
  blue: 'bg-label-blue text-label-blue-ink',
  orange: 'bg-label-orange text-label-orange-ink',
  pink: 'bg-label-pink text-label-pink-ink',
  teal: 'bg-label-teal text-label-teal-ink',
}
