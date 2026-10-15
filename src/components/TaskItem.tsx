import { useStrikeSwipe } from '../hooks/useStrikeSwipe.ts'
import type { Label } from '../models/label.ts'
import { isCompleted, type Task } from '../models/task.ts'
import { DueDateLabel } from './DueDateLabel.tsx'
import { LabelChips } from './LabelChips.tsx'
import { RepeatLabel } from './RepeatLabel.tsx'
import { CheckIcon } from './icons/CheckIcon.tsx'

type TaskItemProps = {
  task: Task
  labels: Label[]
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
}

export const TaskItem = ({ task, labels, onToggleCompleted, onOpen }: TaskItemProps) => {
  const isDone = isCompleted(task)
  const taskLabels = labels.filter((label) => task.labelIds.includes(label.id))
  const { progress, isSwiping, swipeHandlers } = useStrikeSwipe({
    isEnabled: !isDone,
    onStrike: () => onToggleCompleted(task),
  })

  return (
    <li {...swipeHandlers} className="flex min-h-13 touch-pan-y items-center gap-1 border-b border-border text-lg">
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
        className={`relative min-w-0 flex-1 self-stretch py-3 text-left break-words ${isDone ? 'text-content-muted line-through' : ''}`}
      >
        <span className={task.isHighlighted ? 'bg-marker' : ''}>{task.title}</span>
        <LabelChips labels={taskLabels} />
        {task.repeat != null && <RepeatLabel repeat={task.repeat} plannedDate={task.plannedDate} />}
        <span
          aria-hidden="true"
          data-swiping={isSwiping}
          style={{ width: `${progress * 100}%` }}
          className="absolute top-1/2 left-0 h-0.5 rounded-full bg-content data-[swiping=false]:transition-[width]"
        />
      </button>
      {task.dueDate !== null && !isDone && <DueDateLabel dueDate={task.dueDate} />}
    </li>
  )
}
