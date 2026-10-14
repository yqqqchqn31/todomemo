export type Task = {
  id: string
  title: string
  createdAt: number
  completedAt: number | null
}

const TASK_DEFAULTS = {
  completedAt: null,
} satisfies Partial<Task>

export const createTask = (title: string): Task => ({
  ...TASK_DEFAULTS,
  id: crypto.randomUUID(),
  title,
  createdAt: Date.now(),
})

export const fillMissingFields = (savedTask: Task): Task => ({ ...TASK_DEFAULTS, ...savedTask })

export const isCompleted = (task: Task) => task.completedAt !== null
