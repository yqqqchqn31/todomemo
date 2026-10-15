import { useEffect, useState } from 'react'
import { createTask, type Task } from '../models/task.ts'
import { loadTasks, saveTasks } from '../storage/taskStorage.ts'

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (title: string, fields: Partial<Task>) => {
    setTasks((currentTasks) => [...currentTasks, createTask(title, fields)])
  }

  const updateTaskById = (id: string, changes: Partial<Task>) => {
    setTasks((currentTasks) => currentTasks.map((task) => (task.id === id ? { ...task, ...changes } : task)))
  }

  const removeTaskById = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const restoreTask = (task: Task, index: number) => {
    setTasks((currentTasks) => [...currentTasks.slice(0, index), task, ...currentTasks.slice(index)])
  }

  const completeTaskById = (id: string) => updateTaskById(id, { completedAt: Date.now() })
  const reopenTaskById = (id: string) => updateTaskById(id, { completedAt: null })

  return { tasks, addTask, updateTaskById, removeTaskById, restoreTask, completeTaskById, reopenTaskById }
}
