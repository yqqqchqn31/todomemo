import { differenceInCalendarDays, parseISO } from 'date-fns'
import { formatSlashDate } from './dateFormat.ts'

export const DUE_DATE_SOON_DAYS = 3

export type DueDateText = {
  main: string
  sub?: string
  isOverdue: boolean
}

export const getDueDateText = (dueDate: string, today: Date): DueDateText => {
  const date = parseISO(dueDate)
  const daysLeft = differenceInCalendarDays(date, today)
  const until = `${formatSlashDate(date)}まで`

  if (daysLeft < 0) return { main: until, isOverdue: true }
  if (daysLeft === 0) return { main: '今日まで', isOverdue: false }
  if (daysLeft <= DUE_DATE_SOON_DAYS) return { main: `あと${daysLeft}日`, sub: until, isOverdue: false }
  return { main: until, isOverdue: false }
}
