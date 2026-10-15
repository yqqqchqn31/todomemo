import { toast } from 'sonner'
import type { Task } from '../models/task.ts'
import { TaskToastMessage } from './TaskToastMessage.tsx'

export const showUndoToast = (message: string, undo: () => void) => {
  toast(message, { action: { label: '元に戻す', onClick: undo } })
}

export const showTaskToast = (task: Task, result: string, undo: () => void) => {
  toast(<TaskToastMessage title={task.title} result={result} />, {
    action: { label: '元に戻す', onClick: undo },
  })
}
