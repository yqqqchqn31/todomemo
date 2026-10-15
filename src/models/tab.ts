import { formatDayLabel, formatMonthDayWeekday } from './dateFormat.ts'
import type { Label } from './label.ts'
import {
  fieldsForDate,
  groupByPlannedDate,
  isLabelOnlyTask,
  isLabelTask,
  isLeftoverTask,
  isSomedayTask,
  isTodayTask,
  isSleepingTask,
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
  labelId: string | null
  leftoverTasks: Task[]
  sleepingTasks: Task[]
  fieldsForNewTask: Partial<Task>
  emptyMessage: string
}

export const createTodayTab = (tasks: Task[], today: Date): TaskTab => {
  const todayString = toISODateString(today)

  return {
    id: 'today',
    label: '今日',
    caption: formatMonthDayWeekday(today),
    sections: [{ tasks: tasks.filter((task) => isTodayTask(task, todayString)) }],
    upcomingCount: tasks.filter((task) => isUpcomingTask(task, todayString)).length,
    labelId: null,
    leftoverTasks: tasks.filter((task) => isLeftoverTask(task, todayString)),
    sleepingTasks: [],
    fieldsForNewTask: fieldsForDate(todayString),
    emptyMessage: 'ひと休み中',
  }
}

export const createSomedayTab = (tasks: Task[]): TaskTab => ({
  id: 'someday',
  label: 'いつか',
  caption: '急がないもの',
  sections: [{ tasks: tasks.filter(isSomedayTask) }],
  upcomingCount: null,
  labelId: null,
  leftoverTasks: [],
  sleepingTasks: [],
  fieldsForNewTask: SOMEDAY_FIELDS,
  emptyMessage: '急がないものは、なにもなし',
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
    { title: 'とりあえず', tasks: tasks.filter((task) => isUnsortedTask(task) && !isSleepingTask(task, today)) },
    {
      title: '今日',
      tasks: tasks.filter((task) => isLeftoverTask(task, todayString) || isTodayTask(task, todayString)),
    },
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
    labelId: null,
    leftoverTasks: [],
    sleepingTasks: tasks.filter((task) => isSleepingTask(task, today)),
    fieldsForNewTask: UNSORTED_FIELDS,
    emptyMessage: 'ぜんぶ片付いて、すっきり',
  }
}

export const createLabelTab = (tasks: Task[], label: Label): TaskTab => ({
  id: `label-${label.id}`,
  label: label.name,
  caption: 'ラベル',
  sections: [{ tasks: tasks.filter((task) => isLabelTask(task, label.id)) }],
  upcomingCount: null,
  labelId: label.id,
  leftoverTasks: [],
  sleepingTasks: [],
  fieldsForNewTask: { ...UNSORTED_FIELDS, labelIds: [label.id] },
  emptyMessage: 'ここは、すっきり',
})

export const isTabEmpty = (tab: TaskTab) =>
  tab.leftoverTasks.length === 0 &&
  tab.sleepingTasks.length === 0 &&
  tab.sections.every((section) => section.tasks.length === 0)
