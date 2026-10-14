import { useEffect, useState } from 'react'
import { createTask, isCompleted } from './tasks.ts'
import { loadTasks, saveTasks } from './taskStorage.ts'

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (title: string) => {
    setTasks((currentTasks) => [...currentTasks, createTask(title)])
  }

  const toggleCompleted = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) return task

        const completedAt = isCompleted(task) ? null : Date.now()
        return { ...task, completedAt }
      }),
    )
  }

  return { tasks, addTask, toggleCompleted }
}
