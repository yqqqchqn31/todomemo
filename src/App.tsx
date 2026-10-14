import { TaskInput } from './components/TaskInput.tsx'
import { TaskList } from './components/TaskList.tsx'
import { useTasks } from './useTasks.ts'

const todayFormatter = new Intl.DateTimeFormat('ja-JP', {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
})

export const App = () => {
  const { tasks, addTask, toggleCompleted } = useTasks()

  return (
    <div className="mx-auto max-w-lg">
      <header className="px-5 pt-safe-7 pb-2">
        <p className="text-sm text-content-muted">{todayFormatter.format(new Date())}</p>
        <h1 className="mt-0.5 font-hand text-4xl font-semibold">今日</h1>
      </header>
      <main className="px-5 pt-2 pb-safe-24">
        <TaskList tasks={tasks} onToggleCompleted={toggleCompleted} />
      </main>
      <TaskInput onAdd={addTask} />
    </div>
  )
}
