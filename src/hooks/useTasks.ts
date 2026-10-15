import { useEffect, useState } from 'react'
import { createTask, type Task } from '../models/task.ts'
import { loadTasks, saveTasks } from '../storage/taskStorage.ts'

export const useTasks = () => {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (title: string, fields: Partial<Task>) => {
    const task = createTask(title, fields)
    setTasks((currentTasks) => [...currentTasks, task])
    return task
  }

  const updateTaskById = (id: string, changes: Partial<Task>) => {
    setTasks((currentTasks) => currentTasks.map((task) => (task.id === id ? { ...task, ...changes } : task)))
  }

  const addTasks = (newTasks: Task[]) => {
    setTasks((currentTasks) => [...currentTasks, ...newTasks])
  }

  const removeTasksById = (ids: string[]) => {
    setTasks((currentTasks) => currentTasks.filter((task) => !ids.includes(task.id)))
  }

  const replaceTasks = (nextTasks: Task[]) => setTasks(nextTasks)

  const removeTaskById = (id: string) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const restoreTask = (task: Task, index: number) => {
    setTasks((currentTasks) => [...currentTasks.slice(0, index), task, ...currentTasks.slice(index)])
  }

  const completeTaskById = (id: string) => updateTaskById(id, { completedAt: Date.now() })
  const reopenTaskById = (id: string) => updateTaskById(id, { completedAt: null })

  return {
    tasks,
    addTask,
    addTasks,
    updateTaskById,
    removeTaskById,
    removeTasksById,
    replaceTasks,
    restoreTask,
    completeTaskById,
    reopenTaskById,
  }
}
