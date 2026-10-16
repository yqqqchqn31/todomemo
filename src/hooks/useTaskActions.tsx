import { showTaskToast, showUndoToast } from '../components/undoToast.tsx'
import { formatShortDate } from '../models/dateFormat.ts'
import { getNextRepeatDate, type RepeatRule } from '../models/repeat.ts'
import {
  fieldsForDate,
  fieldsForDestination,
  fieldsForNextRepeat,
  isCompleted,
  toISODateString,
  type Destination,
  type Task,
} from '../models/task.ts'
import { useTasks } from './useTasks.ts'

const MOVED_RESULT: Record<Destination, string> = {
  today: 'を今日に移しました',
  someday: 'をいつかに移しました',
  unsorted: 'をとりあえずに戻しました',
}

export const useTaskActions = () => {
  const {
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
  } = useTasks()

  const toggleCompleted = (task: Task) => {
    if (isCompleted(task)) {
      reopenTaskById(task.id)
      return
    }

    completeTaskById(task.id)
    if (task.repeat == null) {
      showTaskToast(task, 'を完了しました', () => reopenTaskById(task.id))
      return
    }

    const nextDate = getNextRepeatDate(task.repeat, task.plannedDate, new Date())
    const nextTask = addTask(task.title, fieldsForNextRepeat(task, nextDate))
    showTaskToast(task, `を完了しました。次は${formatShortDate(nextDate)}`, () => {
      reopenTaskById(task.id)
      removeTaskById(nextTask.id)
    })
  }

  const renameTask = (task: Task, title: string) => updateTaskById(task.id, { title })
  const toggleHighlight = (task: Task) => updateTaskById(task.id, { isHighlighted: !task.isHighlighted })

  const changeDueDate = (task: Task, dueDate: string | null) => updateTaskById(task.id, { dueDate })

  const changeRepeat = (task: Task, repeat: RepeatRule | null) => {
    if (repeat != null && task.plannedDate == null) {
      updateTaskById(task.id, { repeat, ...fieldsForDate(toISODateString(new Date())) })
      return
    }

    updateTaskById(task.id, { repeat })
  }

  const attachLabel = (task: Task, labelId: string) => {
    if (task.labelIds.includes(labelId)) return
    updateTaskById(task.id, { labelIds: [...task.labelIds, labelId] })
  }

  const toggleLabel = (task: Task, labelId: string) => {
    if (task.labelIds.includes(labelId)) {
      updateTaskById(task.id, { labelIds: task.labelIds.filter((id) => id !== labelId) })
      return
    }

    attachLabel(task, labelId)
  }

  const relocateTask = (task: Task, fields: Partial<Task>, result: string) => {
    const previousFields = { plannedDate: task.plannedDate, isSomeday: task.isSomeday }
    updateTaskById(task.id, fields)
    showTaskToast(task, result, () => updateTaskById(task.id, previousFields))
  }

  const moveTask = (task: Task, destination: Destination) =>
    relocateTask(task, fieldsForDestination(destination, toISODateString(new Date())), MOVED_RESULT[destination])

  const scheduleTask = (task: Task, date: Date) =>
    relocateTask(task, fieldsForDate(toISODateString(date)), `を${formatShortDate(date)}に移しました`)

  const moveAllTasks = (targetTasks: Task[], destination: Destination) => {
    const fields = fieldsForDestination(destination, toISODateString(new Date()))
    targetTasks.forEach((task) => updateTaskById(task.id, fields))

    const undo = () =>
      targetTasks.forEach((task) => updateTaskById(task.id, { plannedDate: task.plannedDate, isSomeday: task.isSomeday }))
    showUndoToast(`${targetTasks.length}こ${MOVED_RESULT[destination]}`, undo)
  }

  const deleteTask = (task: Task) => {
    const index = tasks.findIndex(({ id }) => id === task.id)
    removeTaskById(task.id)
    showTaskToast(task, 'を削除しました', () => restoreTask(task, index))
  }

  const releaseTasks = (targetTasks: Task[]) => {
    const removedEntries = targetTasks
      .map((task) => ({ task, index: tasks.findIndex(({ id }) => id === task.id) }))
      .sort((a, b) => a.index - b.index)
    targetTasks.forEach((task) => removeTaskById(task.id))
    showUndoToast(`${targetTasks.length}こを手放しました`, () =>
      removedEntries.forEach(({ task, index }) => restoreTask(task, index)),
    )
  }

  const insertSampleTasks = (sampleTasks: Task[], onUndo: () => void) => {
    addTasks(sampleTasks)
    showUndoToast('サンプルを入れました', () => {
      removeTasksById(sampleTasks.map((task) => task.id))
      onUndo()
    })
  }

  return {
    tasks,
    addTask,
    toggleCompleted,
    renameTask,
    toggleHighlight,
    changeDueDate,
    changeRepeat,
    attachLabel,
    toggleLabel,
    moveTask,
    moveAllTasks,
    scheduleTask,
    deleteTask,
    releaseTasks,
    insertSampleTasks,
    replaceTasks,
  }
}
