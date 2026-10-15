import { fillMissingFields, type Task } from '../models/task.ts'
import { readVersioned, writeVersioned } from './versionedStorage.ts'

const STORAGE_KEY = 'todomemo'
const CURRENT_VERSION = 1

type SavedData = {
  version: typeof CURRENT_VERSION
  tasks: Task[]
}

export const loadTasks = (): Task[] =>
  readVersioned<SavedData>(STORAGE_KEY, CURRENT_VERSION)?.tasks.map(fillMissingFields) ?? []

export const saveTasks = (tasks: Task[]) => writeVersioned<SavedData>(STORAGE_KEY, { version: CURRENT_VERSION, tasks })
