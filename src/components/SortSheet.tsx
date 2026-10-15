import { useState } from 'react'
import type { Label } from '../models/label.ts'
import type { Destination, Task } from '../models/task.ts'
import { LABEL_COLOR_CLASS } from './labelColorClass.ts'

type SortSheetProps = {
  tasks: Task[]
  labels: Label[]
  onMove: (task: Task, destination: Destination) => void
  onAttachLabel: (task: Task, labelId: string) => void
  onRelease: (task: Task) => void
  onClose: () => void
}

const SORT_BUTTON_CLASS = 'min-h-11 rounded-full border border-border bg-surface-raised px-4 text-sm'

export const SortSheet = ({ tasks, labels, onMove, onAttachLabel, onRelease, onClose }: SortSheetProps) => {
  const [skippedIds, setSkippedIds] = useState<string[]>([])
  const queue = tasks.filter((task) => !skippedIds.includes(task.id))
  const currentTask = queue[0]

  if (currentTask == null) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <p className="font-hand text-2xl font-semibold">ぜんぶ決めた！</p>
        <button type="button" onClick={onClose} className={SORT_BUTTON_CLASS}>
          閉じる
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-2">
      <p className="text-xs text-content-muted">あと{queue.length}こ。気が向いたところでやめてOK</p>
      <p className="rounded-xl border border-border bg-surface px-4 py-6 text-center text-xl font-bold break-words">
        {currentTask.title}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => onMove(currentTask, 'today')} className={SORT_BUTTON_CLASS}>
          今日やる
        </button>
        <button type="button" onClick={() => onMove(currentTask, 'someday')} className={SORT_BUTTON_CLASS}>
          いつか
        </button>
      </div>
      {labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <button
              key={label.id}
              type="button"
              onClick={() => onAttachLabel(currentTask, label.id)}
              className={`min-h-11 rounded-full px-4 text-sm ${LABEL_COLOR_CLASS[label.color]}`}
            >
              {label.name}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => onRelease(currentTask)} className="h-11 text-sm text-danger">
          手放す
        </button>
        <button
          type="button"
          onClick={() => setSkippedIds((ids) => [...ids, currentTask.id])}
          className="h-11 text-sm text-content-muted underline"
        >
          あとで
        </button>
      </div>
    </div>
  )
}
