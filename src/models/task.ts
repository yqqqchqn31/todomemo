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

export const toISODateString = (date: Date) => format(date, 'yyyy-MM-dd')

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

export const getPlacement = (task: Task, todayString: string): Placement => {
  if (task.plannedDate !== null && task.plannedDate > todayString) return 'upcoming'
  if (task.plannedDate !== null) return 'today'
  if (task.isSomeday) return 'someday'
  return 'unsorted'
}

export const fieldsForDate = (dateString: string): Partial<Task> => ({ plannedDate: dateString, isSomeday: false })
export const SOMEDAY_FIELDS: Partial<Task> = { plannedDate: null, isSomeday: true }
export const UNSORTED_FIELDS: Partial<Task> = { plannedDate: null, isSomeday: false }

export const fieldsForDestination = (destination: Destination, todayString: string) => {
  if (destination === 'today') return fieldsForDate(todayString)
  if (destination === 'someday') return SOMEDAY_FIELDS
  return UNSORTED_FIELDS
}

export const isTodayTask = (task: Task, todayString: string) =>
  task.plannedDate !== null && task.plannedDate <= todayString && isOpenOrCompletedToday(task)

export const isUpcomingTask = (task: Task, todayString: string) =>
  task.plannedDate !== null && task.plannedDate > todayString && !isCompleted(task)

export const groupByPlannedDate = (tasks: Task[]) => {
  const dateStrings = [...new Set(tasks.flatMap((task) => task.plannedDate ?? []))].sort()
  return dateStrings.map((dateString) => ({
    dateString,
    tasks: tasks.filter((task) => task.plannedDate === dateString),
  }))
}

export const isSomedayTask = (task: Task) =>
  task.plannedDate === null && task.isSomeday && isOpenOrCompletedToday(task)

export const isUnsortedTask = (task: Task) =>
  task.plannedDate === null && !task.isSomeday && isOpenOrCompletedToday(task)
