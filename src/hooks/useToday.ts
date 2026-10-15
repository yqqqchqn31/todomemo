import { differenceInMilliseconds, isSameDay, startOfTomorrow } from 'date-fns'
import { useEffect, useState } from 'react'

export const useToday = () => {
  const [today, setToday] = useState(() => new Date())

  useEffect(() => {
    const refreshIfDateChanged = () => {
      const now = new Date()
      if (isSameDay(now, today)) return
      setToday(now)
    }

    const timerId = setTimeout(refreshIfDateChanged, differenceInMilliseconds(startOfTomorrow(), new Date()))
    document.addEventListener('visibilitychange', refreshIfDateChanged)

    return () => {
      clearTimeout(timerId)
      document.removeEventListener('visibilitychange', refreshIfDateChanged)
    }
  }, [today])

  return today
}
