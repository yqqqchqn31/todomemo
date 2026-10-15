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

  const removeTaskById = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const restoreTask = (task: Task, index: number) => {
    setTasks((currentTasks) => [...currentTasks.slice(0, index), task, ...currentTasks.slice(index)])
  }

  const completeTask = (id: string) => updateTask(id, { completedAt: Date.now() })
  const reopenTask = (id: string) => updateTask(id, { completedAt: null })

  return { tasks, addTask, updateTask, removeTaskById, restoreTask, completeTask, reopenTask }
}
