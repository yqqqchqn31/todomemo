import { isCompleted, type Task } from '../tasks.ts'
import { CheckIcon } from './icons/CheckIcon.tsx'

type TaskItemProps = {
  task: Task
  onToggleCompleted: (id: string) => void
}

export const TaskItem = ({ task, onToggleCompleted }: TaskItemProps) => {
  const isDone = isCompleted(task)

  return (
    <li className="flex min-h-13 items-center gap-1 border-b border-border py-1.5 text-lg">
      <button
        type="button"
        aria-pressed={isDone}
        aria-label={`「${task.title}」を完了にする`}
        onClick={() => onToggleCompleted(task.id)}
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
      <span className={`min-w-0 break-words ${isDone ? 'text-content-muted line-through' : ''}`}>
        {task.title}
      </span>
    </li>
  )
}
