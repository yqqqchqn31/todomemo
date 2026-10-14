import { useEffect, useState } from 'react'
import { createTask } from './tasks.ts'
import { loadTasks, saveTasks } from './taskStorage.ts'

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (title: string) => {
    setTasks((currentTasks) => [...currentTasks, createTask(title)])
  }

  return { tasks, addTask }
}
