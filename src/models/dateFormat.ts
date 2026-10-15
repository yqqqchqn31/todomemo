import { format, isTomorrow, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

export const formatMonthDayWeekday = (date: Date) => format(date, 'M月d日(E)', { locale: ja })

export const formatShortDate = (date: Date) => format(date, 'M/d(E)', { locale: ja })

export const formatDayLabel = (dateKey: string) => {
  const date = parseISO(dateKey)
  if (isTomorrow(date)) return `明日 ${formatShortDate(date)}`
  return formatShortDate(date)
}
