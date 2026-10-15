import { format, isToday } from 'date-fns'

export type Task = {
  id: string
  title: string
  createdAt: number
  completedAt: number | null
  plannedDate: string | null
}

const TASK_DEFAULTS = {
  completedAt: null,
  plannedDate: null,
} satisfies Partial<Task>

export const toDateKey = (date: Date) => format(date, 'yyyy-MM-dd')

export const createTask = (title: string, fields: Partial<Task> = {}): Task => ({
  ...TASK_DEFAULTS,
  ...fields,
  id: crypto.randomUUID(),
  title,
  createdAt: Date.now(),
})

export const fillMissingFields = (savedTask: Task): Task => ({ ...TASK_DEFAULTS, ...savedTask })

export const updateTaskById = (tasks: Task[], id: string, changes: Partial<Task>) =>
  tasks.map((task) => (task.id === id ? { ...task, ...changes } : task))

export const isCompleted = (task: Task) => task.completedAt !== null

export const isCompletedToday = (task: Task) => task.completedAt !== null && isToday(task.completedAt)

const isOpenOrCompletedToday = (task: Task) => !isCompleted(task) || isCompletedToday(task)

export const isTodayTask = (task: Task, todayKey: string) =>
  task.plannedDate !== null && task.plannedDate <= todayKey && isOpenOrCompletedToday(task)

export const isUnsortedTask = (task: Task) => task.plannedDate === null && isOpenOrCompletedToday(task)
