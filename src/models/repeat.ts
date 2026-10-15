import { addBusinessDays, addDays, getDay, nextDay, parseISO, type Day } from 'date-fns'

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
