import { useState } from 'react'
import type { Label } from '../models/label.ts'
import { sortByHighlight, type Destination, type Task } from '../models/task.ts'
import { TaskList } from './TaskList.tsx'

type LeftoverCardProps = {
  tasks: Task[]
  labels: Label[]
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
  onMoveAll: (destination: Destination) => void
}

const PREVIEW_COUNT = 3

const CARD_BUTTON_CLASS = 'min-h-11 rounded-full px-4 text-sm'

export const LeftoverCard = ({ tasks, labels, onToggleCompleted, onOpen, onMoveAll }: LeftoverCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  if (tasks.length === 0) return null

  const sortedTasks = sortByHighlight(tasks)
  const shownTasks = isExpanded ? sortedTasks : sortedTasks.slice(0, PREVIEW_COUNT)
  const hiddenCount = tasks.length - shownTasks.length

  return (
    <section
      aria-labelledby="leftover-title"
      className="mb-4 rounded-xl border border-border bg-surface-raised px-4 pt-4 pb-3"
    >
      <h2 id="leftover-title" className="font-hand text-xl font-semibold">
        おはよう。残りが{tasks.length}こあるよ
      </h2>
      <p className="mt-1 text-sm text-content-muted">終わらなかった日もあるよね。どうする?</p>
      <TaskList tasks={shownTasks} labels={labels} onToggleCompleted={onToggleCompleted} onOpen={onOpen} />
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="flex min-h-11 items-center text-sm text-content-muted"
        >
          ほか{hiddenCount}こも見る
        </button>
      )}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onMoveAll('today')}
          className={`${CARD_BUTTON_CLASS} flex-1 bg-content text-surface-raised`}
        >
          全部今日へ
        </button>
        <button
          type="button"
          onClick={() => onMoveAll('someday')}
          className={`${CARD_BUTTON_CLASS} border border-border bg-surface-raised`}
        >
          全部いつかへ
        </button>
      </div>
    </section>
  )
}
