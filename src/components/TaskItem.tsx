import { isCompleted, type Task } from '../models/task.ts'
import { CheckIcon } from './icons/CheckIcon.tsx'

type TaskItemProps = {
  task: Task
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
}

export const TaskItem = ({ task, onToggleCompleted, onOpen }: TaskItemProps) => {
  const isDone = isCompleted(task)

  return (
    <li className="flex min-h-13 items-center gap-1 border-b border-border text-lg">
      <button
        type="button"
        aria-pressed={isDone}
        aria-label={`「${task.title}」を完了にする`}
        onClick={() => onToggleCompleted(task)}
        className="flex size-11 flex-none items-center justify-center"
      >
        <span
          className={`flex size-6 items-center justify-center rounded-full border-[1.5px] ${
            isDone ? 'border-content-muted text-content-muted' : 'border-content'
          }`}
        >
          {isDone && <CheckIcon className="size-3.5" />}
        </span>
      </button>
      <button
        type="button"
        onClick={() => onOpen(task)}
        className={`min-w-0 flex-1 self-stretch py-3 text-left break-words ${isDone ? 'text-content-muted line-through' : ''}`}
      >
        <span className={task.isHighlighted ? 'bg-marker' : ''}>{task.title}</span>
      </button>
    </li>
  )
}
