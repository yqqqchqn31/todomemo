import { toast } from 'sonner'
import { AppToaster } from './components/AppToaster.tsx'
import { CompletedToastMessage } from './components/CompletedToastMessage.tsx'
import { TabBar } from './components/TabBar.tsx'
import { TaskInput } from './components/TaskInput.tsx'
import { TaskList } from './components/TaskList.tsx'
import { useTabPager } from './hooks/useTabPager.ts'
import { useTasks } from './hooks/useTasks.ts'
import { createTodayTab, createUnsortedTab } from './models/tab.ts'
import { isCompleted, type Task } from './models/task.ts'

export const App = () => {
  const { tasks, addTask, completeTask, reopenTask } = useTasks()
  const { pagerRef, activeIndex, handleScroll, goTo } = useTabPager()

  const tabs = [createTodayTab(tasks, new Date()), createUnsortedTab(tasks)]
  const activeTab = tabs[activeIndex]

  const toggleCompleted = (task: Task) => {
    if (isCompleted(task)) {
      reopenTask(task.id)
      return
    }

    completeTask(task.id)
    toast(<CompletedToastMessage title={task.title} />, {
      action: { label: '元に戻す', onClick: () => reopenTask(task.id) },
    })
  }

  return (
    <div className="mx-auto flex h-dvh max-w-lg flex-col">
      <header className="flex-none px-5 pt-safe-7 pb-2">
        <p className="text-sm text-content-muted">{activeTab.caption}</p>
        <h1 className="mt-0.5 font-hand text-4xl font-semibold">{activeTab.label}</h1>
      </header>
      <TabBar tabs={tabs} activeIndex={activeIndex} onSelect={goTo} />
      <div
        ref={pagerRef}
        onScroll={handleScroll}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
      >
        {tabs.map((tab) => (
          <section
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className="w-full flex-none snap-start overflow-y-auto px-5 pt-2 pb-safe-24"
          >
            <TaskList tasks={tab.tasks} onToggleCompleted={toggleCompleted} />
          </section>
        ))}
      </div>
      <TaskInput onAdd={(title) => addTask(title, activeTab.fieldsForNewTask)} />
      <AppToaster />
    </div>
  )
}
