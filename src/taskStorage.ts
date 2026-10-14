import type { Task } from './tasks.ts'

const STORAGE_KEY = 'todomemo'
const CURRENT_VERSION = 1

type SavedData = {
  version: typeof CURRENT_VERSION
  tasks: Task[]
}

export const loadTasks = (): Task[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as SavedData | null
    if (saved?.version !== CURRENT_VERSION) return []
    return saved.tasks
  } catch {
    return []
  }
}

export const saveTasks = (tasks: Task[]) => {
  const data: SavedData = { version: CURRENT_VERSION, tasks }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // 容量不足やプライベートブラウズの制限で保存できなくても、アプリは使い続けられるようにする
  }
}
