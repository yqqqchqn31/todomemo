import { addBusinessDays, addDays, format, getDay, nextDay, parseISO, type Day } from 'date-fns'
import { ja } from 'date-fns/locale'

export const REPEAT_RULES = ['daily', 'weekdays', 'weekly'] as const

export type RepeatRule = (typeof REPEAT_RULES)[number]

export const REPEAT_LABEL: Record<RepeatRule, string> = {
  daily: '毎日',
  weekdays: '平日',
  weekly: '毎週',
}

export const getNextRepeatDate = (rule: RepeatRule, plannedDate: string | null, today: Date) => {
  if (rule === 'daily') return addDays(today, 1)
  if (rule === 'weekdays') return addBusinessDays(today, 1)

  const weekday = getDay(plannedDate == null ? today : parseISO(plannedDate)) as Day
  return nextDay(today, weekday)
}

export const describeRepeat = (rule: RepeatRule, plannedDate: string | null) => {
  if (rule !== 'weekly' || plannedDate == null) return REPEAT_LABEL[rule]
  return `毎週${format(parseISO(plannedDate), 'E', { locale: ja })}`
}
