import { AppToaster } from './components/AppToaster.tsx'
import { BottomSheet } from './components/BottomSheet.tsx'
import { LeftoverCard } from './components/LeftoverCard.tsx'
import { TabBar } from './components/TabBar.tsx'
import { TaskInput } from './components/TaskInput.tsx'
import { TaskSections } from './components/TaskSections.tsx'
import { UpcomingLink } from './components/UpcomingLink.tsx'
import { TaskSheet } from './components/task-sheet/TaskSheet.tsx'
import { useLabels } from './hooks/useLabels.ts'
import { useSwipe } from './hooks/useSwipe.ts'
import { useTabPager } from './hooks/useTabPager.ts'
import { useTaskActions } from './hooks/useTaskActions.tsx'
import { useTaskSheet } from './hooks/useTaskSheet.ts'
import { createAllTab, createLabelTab, createSomedayTab, createTodayTab } from './models/tab.ts'

export const App = () => {
  const {
    tasks,
    addTask,
    toggleCompleted,
    renameTask,
    toggleHighlight,
    changeDueDate,
    changeRepeat,
    attachLabel,
    toggleLabel,
    moveTask,
    moveAllTasks,
    scheduleTask,
    deleteTask,
  } = useTaskActions()
  const { labels, addLabel } = useLabels()
  const { pagerRef, activeIndex, handleScroll, goTo } = useTabPager()
  const { sheetTask, isSheetOpen, openSheet, closeSheet } = useTaskSheet(tasks)

  const today = new Date()
  const tabs = [
    createTodayTab(tasks, today),
    createAllTab(tasks, labels, today),
    createSomedayTab(tasks),
    ...labels.map((label) => createLabelTab(tasks, label)),
  ]
  const activeTab = tabs[activeIndex]
  const allTabIndex = tabs.findIndex((tab) => tab.id === 'all')
  const lastTabIndex = tabs.length - 1
  const goToNextTab = () => goTo(Math.min(activeIndex + 1, lastTabIndex))
  const goToPreviousTab = () => goTo(Math.max(activeIndex - 1, 0))
  const tabSwipeHandlers = useSwipe({ onSwipeLeft: goToNextTab, onSwipeRight: goToPreviousTab })

  return (
    <div className="mx-auto flex h-dvh max-w-lg flex-col">
      <header {...tabSwipeHandlers} className="flex-none touch-pan-y px-5 pt-safe-7 pb-2">
        <p className="text-sm text-content-muted">{activeTab.caption}</p>
        <h1 className="mt-0.5 font-hand text-4xl font-semibold">{activeTab.label}</h1>
      </header>
      <TabBar tabs={tabs} activeIndex={activeIndex} onSelect={goTo} />
      <div
        ref={pagerRef}
        onScroll={handleScroll}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-hidden"
      >
        {tabs.map((tab) => (
          <section
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className="w-full flex-none snap-start overflow-y-auto px-5 pt-2 pb-safe-24"
          >
            <LeftoverCard
              tasks={tab.leftoverTasks}
              labels={labels}
              onToggleCompleted={toggleCompleted}
              onOpen={openSheet}
              onMoveAll={(destination) => moveAllTasks(tab.leftoverTasks, destination)}
            />
            <TaskSections
              sections={tab.sections}
              labels={labels.filter((label) => label.id !== tab.labelId)}
              onToggleCompleted={toggleCompleted}
              onOpen={openSheet}
            />
            {tab.upcomingCount != null && (
              <UpcomingLink count={tab.upcomingCount} onClick={() => goTo(allTabIndex)} />
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
            labels={labels}
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
            onChangeRepeat={(repeat) => changeRepeat(sheetTask, repeat)}
            onToggleLabel={(labelId) => toggleLabel(sheetTask, labelId)}
            onCreateLabel={(name) => attachLabel(sheetTask, addLabel(name).id)}
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
