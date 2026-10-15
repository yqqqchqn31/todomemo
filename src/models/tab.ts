import { formatMonthDayWeekday } from './dateFormat.ts'
import {
  fieldsForDate,
  isCompleted,
  isSomedayTask,
  isTodayTask,
  isUnsortedTask,
  SOMEDAY_FIELDS,
  toDateKey,
  UNSORTED_FIELDS,
  type Task,
} from './task.ts'

export type TaskTab = {
  id: string
  label: string
  caption: string
  count?: number
  tasks: Task[]
  fieldsForNewTask: Partial<Task>
}

export const createTodayTab = (tasks: Task[], today: Date): TaskTab => {
  const todayKey = toDateKey(today)

  return {
    id: 'today',
    label: '今日',
    caption: formatMonthDayWeekday(today),
    tasks: tasks.filter((task) => isTodayTask(task, todayKey)),
    fieldsForNewTask: fieldsForDate(todayKey),
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
    fieldsForNewTask: UNSORTED_FIELDS,
  }
}

export const createSomedayTab = (tasks: Task[]): TaskTab => ({
  id: 'someday',
  label: 'いつか',
  caption: '急がないもの',
  tasks: tasks.filter(isSomedayTask),
  fieldsForNewTask: SOMEDAY_FIELDS,
})
