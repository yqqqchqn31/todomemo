import { useState } from 'react'
import type { Task } from '../models/task.ts'

export const useTaskSheet = (tasks: Task[]) => {
  const [sheetTaskId, setSheetTaskId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const sheetTask = tasks.find((task) => task.id === sheetTaskId)

  const openSheet = (task: Task) => {
    setSheetTaskId(task.id)
    setIsOpen(true)
  }

  const closeSheet = () => setIsOpen(false)

  return { sheetTask, isSheetOpen: isOpen && sheetTask !== undefined, openSheet, closeSheet }
}
