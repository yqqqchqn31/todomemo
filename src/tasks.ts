export type Task = {
  id: string
  title: string
  done: boolean
  createdAt: number
}

export const createTask = (title: string): Task => ({
  id: crypto.randomUUID(),
  title,
  done: false,
  createdAt: Date.now(),
})
