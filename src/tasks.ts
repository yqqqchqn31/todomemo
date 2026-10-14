export type Task = {
  id: string
  title: string
  createdAt: number
}

export const createTask = (title: string): Task => ({
  id: crypto.randomUUID(),
  title,
  createdAt: Date.now(),
})
