export type Task = {
  id: string
  title: string
  done: boolean
  createdAt: number
}

export function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: Date.now(),
  }
}
