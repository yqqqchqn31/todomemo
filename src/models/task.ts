import { format, isToday } from 'date-fns'

export type Task = {
  id: string
  title: string
  createdAt: number
  completedAt: number | null
  plannedDate: string | null
  isSomeday: boolean
  isHighlighted: boolean
}

export type Destination = 'today' | 'someday' | 'unsorted'
export type Placement = Destination | 'upcoming'

const TASK_DEFAULTS = {
  completedAt: null,
  plannedDate: null,
  isSomeday: false,
  isHighlighted: false,
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

export const isCompleted = (task: Task) => task.completedAt !== null

export const isCompletedToday = (task: Task) => task.completedAt !== null && isToday(task.completedAt)

const isOpenOrCompletedToday = (task: Task) => !isCompleted(task) || isCompletedToday(task)

export const getPlacement = (task: Task, todayKey: string): Placement => {
  if (task.plannedDate !== null && task.plannedDate > todayKey) return 'upcoming'
  if (task.plannedDate !== null) return 'today'
  if (task.isSomeday) return 'someday'
  return 'unsorted'
}

export const fieldsForDate = (dateKey: string): Partial<Task> => ({ plannedDate: dateKey, isSomeday: false })
export const SOMEDAY_FIELDS: Partial<Task> = { plannedDate: null, isSomeday: true }
export const UNSORTED_FIELDS: Partial<Task> = { plannedDate: null, isSomeday: false }

export const fieldsForDestination = (destination: Destination, todayKey: string) => {
  if (destination === 'today') return fieldsForDate(todayKey)
  if (destination === 'someday') return SOMEDAY_FIELDS
  return UNSORTED_FIELDS
}

export const isTodayTask = (task: Task, todayKey: string) =>
  task.plannedDate !== null && task.plannedDate <= todayKey && isOpenOrCompletedToday(task)

export const isUpcomingTask = (task: Task, todayKey: string) =>
  task.plannedDate !== null && task.plannedDate > todayKey && !isCompleted(task)

export const groupByPlannedDate = (tasks: Task[]) => {
  const dateKeys = [...new Set(tasks.flatMap((task) => task.plannedDate ?? []))].sort()
  return dateKeys.map((dateKey) => ({ dateKey, tasks: tasks.filter((task) => task.plannedDate === dateKey) }))
}

export const isSomedayTask = (task: Task) =>
  task.plannedDate === null && task.isSomeday && isOpenOrCompletedToday(task)

export const isUnsortedTask = (task: Task) =>
  task.plannedDate === null && !task.isSomeday && isOpenOrCompletedToday(task)
