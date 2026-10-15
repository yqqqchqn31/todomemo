import { useEffect, useState } from 'react'
import { createTask, updateTaskById, type Task } from '../models/task.ts'
import { loadTasks, saveTasks } from '../storage/taskStorage.ts'

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (title: string, fields: Partial<Task>) => {
    setTasks((currentTasks) => [...currentTasks, createTask(title, fields)])
  }

  const updateTask = (id: string, changes: Partial<Task>) => {
    setTasks((currentTasks) => updateTaskById(currentTasks, id, changes))
  }

  const completeTask = (id: string) => updateTask(id, { completedAt: Date.now() })
  const reopenTask = (id: string) => updateTask(id, { completedAt: null })

  return { tasks, addTask, completeTask, reopenTask }
}
