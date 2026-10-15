import { formatDayLabel, formatMonthDayWeekday } from './dateFormat.ts'
import {
  fieldsForDate,
  groupByPlannedDate,
  isSomedayTask,
  isTodayTask,
  isUnsortedTask,
  isUpcomingTask,
  SOMEDAY_FIELDS,
  toISODateString,
  UNSORTED_FIELDS,
  type Task,
} from './task.ts'

export type TaskSection = {
  title?: string
  tasks: Task[]
}

export type TaskTab = {
  id: string
  label: string
  caption: string
  sections: TaskSection[]
  upcomingCount: number | null
  fieldsForNewTask: Partial<Task>
}

export const createTodayTab = (tasks: Task[], today: Date): TaskTab => {
  const todayString = toISODateString(today)

  return {
    id: 'today',
    label: '今日',
    caption: formatMonthDayWeekday(today),
    sections: [{ tasks: tasks.filter((task) => isTodayTask(task, todayString)) }],
    upcomingCount: tasks.filter((task) => isUpcomingTask(task, todayString)).length,
    fieldsForNewTask: fieldsForDate(todayString),
  }
}

export const createSomedayTab = (tasks: Task[]): TaskTab => ({
  id: 'someday',
  label: 'いつか',
  caption: '急がないもの',
  sections: [{ tasks: tasks.filter(isSomedayTask) }],
  upcomingCount: null,
  fieldsForNewTask: SOMEDAY_FIELDS,
})

export const createAllTab = (tasks: Task[], today: Date): TaskTab => {
  const todayString = toISODateString(today)
  const upcomingTasks = tasks.filter((task) => isUpcomingTask(task, todayString))
  const upcomingSections = groupByPlannedDate(upcomingTasks).map((group) => ({
    title: formatDayLabel(group.dateString),
    tasks: group.tasks,
  }))
  const sections = [
    { title: 'とりあえず', tasks: tasks.filter(isUnsortedTask) },
    { title: '今日', tasks: tasks.filter((task) => isTodayTask(task, todayString)) },
    ...upcomingSections,
    { title: 'いつか', tasks: tasks.filter(isSomedayTask) },
  ]

  return {
    id: 'all',
    label: 'すべて',
    caption: 'ぜんぶここにあります',
    sections: sections.filter((section) => section.tasks.length > 0),
    upcomingCount: null,
    fieldsForNewTask: UNSORTED_FIELDS,
  }
}
