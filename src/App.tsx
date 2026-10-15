import { AppToaster } from './components/AppToaster.tsx'
import { BottomSheet } from './components/BottomSheet.tsx'
import { TabBar } from './components/TabBar.tsx'
import { TaskInput } from './components/TaskInput.tsx'
import { TaskList } from './components/TaskList.tsx'
import { UpcomingTasks } from './components/UpcomingTasks.tsx'
import { TaskSheet } from './components/task-sheet/TaskSheet.tsx'
import { useTabPager } from './hooks/useTabPager.ts'
import { useTaskActions } from './hooks/useTaskActions.tsx'
import { useTaskSheet } from './hooks/useTaskSheet.ts'
import { createSomedayTab, createTodayTab, createUnsortedTab } from './models/tab.ts'

export const App = () => {
  const {
    tasks,
    addTask,
    toggleCompleted,
    renameTask,
    toggleHighlight,
    changeDueDate,
    moveTask,
    scheduleTask,
    deleteTask,
  } = useTaskActions()
  const { pagerRef, activeIndex, handleScroll, goTo } = useTabPager()
  const { sheetTask, isSheetOpen, openSheet, closeSheet } = useTaskSheet(tasks)

  const tabs = [createTodayTab(tasks, new Date()), createUnsortedTab(tasks), createSomedayTab(tasks)]
  const activeTab = tabs[activeIndex]

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
            <TaskList tasks={tab.tasks} onToggleCompleted={toggleCompleted} onOpen={openSheet} />
            {tab.upcomingTasks && (
              <UpcomingTasks tasks={tab.upcomingTasks} onToggleCompleted={toggleCompleted} onOpen={openSheet} />
            )}
          </section>
        ))}
      </div>
      <TaskInput onAdd={(title) => addTask(title, activeTab.fieldsForNewTask)} />
      <BottomSheet isOpen={isSheetOpen} onClose={closeSheet} label="タスクのシート">
        {sheetTask && (
          <TaskSheet
            key={sheetTask.id}
            task={sheetTask}
            onRename={(title) => renameTask(sheetTask, title)}
            onToggleHighlight={() => toggleHighlight(sheetTask)}
            onMove={(destination) => {
              moveTask(sheetTask, destination)
              closeSheet()
            }}
            onSchedule={(date) => {
              scheduleTask(sheetTask, date)
              closeSheet()
            }}
            onChangeDueDate={(dueDate) => changeDueDate(sheetTask, dueDate)}
            onDelete={() => {
              deleteTask(sheetTask)
              closeSheet()
            }}
          />
        )}
      </BottomSheet>
      <AppToaster />
    </div>
  )
}
