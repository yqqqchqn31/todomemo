import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { isCompleted, isTodayTask, isUnsortedTask, toDateKey, type Task } from './task.ts'

export type TaskTab = {
  id: string
  label: string
  caption: string
  count?: number
  tasks: Task[]
  fieldsForNewTask: Partial<Task>
}

const formatMonthDayWeekday = (date: Date) => format(date, 'M月d日(E)', { locale: ja })

export const createTodayTab = (tasks: Task[], today: Date): TaskTab => {
  const todayKey = toDateKey(today)

  return {
    id: 'today',
    label: '今日',
    caption: formatMonthDayWeekday(today),
    tasks: tasks.filter((task) => isTodayTask(task, todayKey)),
    fieldsForNewTask: { plannedDate: todayKey },
  }
}

export const createUnsortedTab = (tasks: Task[]): TaskTab => {
  const unsortedTasks = tasks.filter(isUnsortedTask)

  return {
    id: 'unsorted',
    label: '未整理',
    caption: '書きっぱなしでOK',
    count: unsortedTasks.filter((task) => !isCompleted(task)).length,
    tasks: unsortedTasks,
    fieldsForNewTask: { plannedDate: null },
  }
}
