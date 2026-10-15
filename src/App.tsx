import { TaskInput } from './components/TaskInput.tsx'
import { TaskList } from './components/TaskList.tsx'
import { UndoToast } from './components/UndoToast.tsx'
import { isCompleted, isCompletedToday, type Task } from './tasks.ts'
import { useTasks } from './useTasks.ts'
import { useUndoToast } from './useUndoToast.ts'

const todayFormatter = new Intl.DateTimeFormat('ja-JP', {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
})

export const App = () => {
  const { tasks, addTask, completeTask, reopenTask } = useTasks()
  const { toast, showToast, closeToast } = useUndoToast()
  const todayTasks = tasks.filter((task) => !isCompleted(task) || isCompletedToday(task))

  const toggleCompleted = (task: Task) => {
    if (isCompleted(task)) {
      reopenTask(task.id)
      return
    }

    completeTask(task.id)
    showToast({ message: `「${task.title}」を完了しました`, undo: () => reopenTask(task.id) })
  }

  return (
    <div className="mx-auto max-w-lg">
      <header className="px-5 pt-safe-7 pb-2">
        <p className="text-sm text-content-muted">{todayFormatter.format(new Date())}</p>
        <h1 className="mt-0.5 font-hand text-4xl font-semibold">今日</h1>
      </header>
      <main className="px-5 pt-2 pb-safe-24">
        <TaskList tasks={todayTasks} onToggleCompleted={toggleCompleted} />
      </main>
      <TaskInput onAdd={addTask} />
      {toast && <UndoToast toast={toast} onClose={closeToast} />}
    </div>
  )
}
