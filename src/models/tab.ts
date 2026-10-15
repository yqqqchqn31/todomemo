import { formatDayLabel, formatMonthDayWeekday } from './dateFormat.ts'
import type { Label } from './label.ts'
import {
  fieldsForDate,
  groupByPlannedDate,
  isLabelOnlyTask,
  isLabelTask,
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

export const createAllTab = (tasks: Task[], labels: Label[], today: Date): TaskTab => {
  const todayString = toISODateString(today)
  const upcomingTasks = tasks.filter((task) => isUpcomingTask(task, todayString))
  const upcomingSections = groupByPlannedDate(upcomingTasks).map((group) => ({
    title: formatDayLabel(group.dateString),
    tasks: group.tasks,
  }))
  const labelSections = labels.map((label) => ({
    title: label.name,
    tasks: tasks.filter((task) => isLabelOnlyTask(task, label.id)),
  }))
  const sections = [
    { title: 'とりあえず', tasks: tasks.filter(isUnsortedTask) },
    { title: '今日', tasks: tasks.filter((task) => isTodayTask(task, todayString)) },
    ...upcomingSections,
    ...labelSections,
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

export const createLabelTab = (tasks: Task[], label: Label): TaskTab => ({
  id: `label-${label.id}`,
  label: label.name,
  caption: 'ラベル',
  sections: [{ tasks: tasks.filter((task) => isLabelTask(task, label.id)) }],
  upcomingCount: null,
  fieldsForNewTask: { ...UNSORTED_FIELDS, labelIds: [label.id] },
})
