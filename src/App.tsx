import { useState } from 'react'
import TaskInput from './components/TaskInput.tsx'
import TaskList from './components/TaskList.tsx'
import { createTask, type Task } from './tasks.ts'

const todayFormatter = new Intl.DateTimeFormat('ja-JP', {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
})

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  function addTask(title: string) {
    setTasks((currentTasks) => [...currentTasks, createTask(title)])
  }

  return (
    <div className="mx-auto max-w-lg">
      <header className="px-5 pt-safe-7 pb-2">
        <p className="text-sm text-content-muted">{todayFormatter.format(new Date())}</p>
        <h1 className="mt-0.5 font-hand text-4xl font-semibold">今日</h1>
      </header>
      <main className="px-5 pt-2 pb-safe-24">
        <TaskList tasks={tasks} />
      </main>
      <TaskInput onAdd={addTask} />
    </div>
  )
}
