import { useState } from 'react'
import { AppToaster } from './components/AppToaster.tsx'
import { BottomSheet } from './components/BottomSheet.tsx'
import { EmptyState } from './components/EmptyState.tsx'
import { LeftoverCard } from './components/LeftoverCard.tsx'
import { SleepingTasks } from './components/SleepingTasks.tsx'
import { SortPrompt } from './components/SortPrompt.tsx'
import { SortSheet } from './components/SortSheet.tsx'
import { TabBar } from './components/TabBar.tsx'
import { TaskInput } from './components/TaskInput.tsx'
import { TaskSections } from './components/TaskSections.tsx'
import { UpcomingLink } from './components/UpcomingLink.tsx'
import { TaskSheet } from './components/task-sheet/TaskSheet.tsx'
import { useLabels } from './hooks/useLabels.ts'
import { useSwipe } from './hooks/useSwipe.ts'
import { useTabPager } from './hooks/useTabPager.ts'
import { useToday } from './hooks/useToday.ts'
import { useVisibleViewport } from './hooks/useVisibleViewport.ts'
import { useTaskActions } from './hooks/useTaskActions.tsx'
import { useTaskSheet } from './hooks/useTaskSheet.ts'
import { createAllTab, createLabelTab, createSomedayTab, createTodayTab, isTabEmpty } from './models/tab.ts'
import { isSortTarget } from './models/task.ts'

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
    releaseTasks,
  } = useTaskActions()
  const { labels, addLabel } = useLabels()
  const today = useToday()
  const [isSorting, setIsSorting] = useState(false)
  useVisibleViewport()
  const { pagerRef, activeIndex, handleScroll, goTo } = useTabPager()
  const { sheetTask, isSheetOpen, openSheet, closeSheet } = useTaskSheet(tasks)

  const tabs = [
    createTodayTab(tasks, today),
    createAllTab(tasks, labels, today),
    createSomedayTab(tasks),
    ...labels.map((label) => createLabelTab(tasks, label)),
  ]
  const activeTab = tabs[activeIndex]
  const allTabIndex = tabs.findIndex((tab) => tab.id === 'all')
  const sortTargets = tasks.filter(isSortTarget)
  const lastTabIndex = tabs.length - 1
  const goToNextTab = () => goTo(Math.min(activeIndex + 1, lastTabIndex))
  const goToPreviousTab = () => goTo(Math.max(activeIndex - 1, 0))
  const tabSwipeHandlers = useSwipe({ onSwipeLeft: goToNextTab, onSwipeRight: goToPreviousTab })

  return (
    <div className="fixed inset-x-0 top-(--visible-top,0px) mx-auto flex h-(--visible-height,100dvh) max-w-lg flex-col">
      <header {...tabSwipeHandlers} className="flex-none touch-pan-y px-5 pt-safe-7 pb-2">
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
            className="w-full flex-none snap-start overflow-y-auto px-5 pt-2 pb-4"
          >
            <LeftoverCard
              tasks={tab.leftoverTasks}
              labels={labels}
              onToggleCompleted={toggleCompleted}
              onOpen={openSheet}
              onMoveAll={(destination) => moveAllTasks(tab.leftoverTasks, destination)}
            />
            {tab.id === 'all' && (
              <SortPrompt count={sortTargets.length} onStart={() => setIsSorting(true)} />
            )}
            {isTabEmpty(tab) && <EmptyState message={tab.emptyMessage} isMascotShown={tab.id === 'today'} />}
            <TaskSections
              sections={tab.sections}
              labels={labels.filter((label) => label.id !== tab.labelId)}
              onToggleCompleted={toggleCompleted}
              onOpen={openSheet}
            />
            <SleepingTasks
              tasks={tab.sleepingTasks}
              labels={labels}
              onToggleCompleted={toggleCompleted}
              onOpen={openSheet}
              onRelease={() => releaseTasks(tab.sleepingTasks)}
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
      <BottomSheet isOpen={isSorting} onClose={() => setIsSorting(false)} label="とりあえずの整理">
        {isSorting && (
          <SortSheet
            tasks={sortTargets}
            labels={labels}
            onMove={moveTask}
            onAttachLabel={attachLabel}
            onRelease={deleteTask}
            onClose={() => setIsSorting(false)}
          />
        )}
      </BottomSheet>
      <AppToaster />
    </div>
  )
}
