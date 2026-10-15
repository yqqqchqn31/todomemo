import { addDays, subDays } from 'date-fns'
import { createLabel, type Label } from './label.ts'
import { createTask, fieldsForDate, SOMEDAY_FIELDS, toISODateString, type Task } from './task.ts'

export const createSampleData = (today: Date): { labels: Label[]; tasks: Task[] } => {
  const school = createLabel('学校', 0)
  const supermarket = createLabel('スーパー', 1)
  const onDay = (days: number) => fieldsForDate(toISODateString(addDays(today, days)))

  const tasks = [
    createTask('サークルの連絡', onDay(-1)),
    createTask('歯医者の予約', onDay(-2)),
    createTask('レポート提出', {
      ...onDay(0),
      dueDate: toISODateString(today),
      labelIds: [school.id],
      isHighlighted: true,
    }),
    createTask('英語の課題', { ...onDay(0), dueDate: toISODateString(addDays(today, 2)), labelIds: [school.id] }),
    createTask('燃えるゴミ出し', { ...onDay(0), repeat: 'weekly' }),
    createTask('メールの返信', { ...onDay(0), completedAt: Date.now() }),
    createTask('本を返す', onDay(1)),
    createTask('牛乳', { labelIds: [supermarket.id] }),
    createTask('マヨネーズ', { labelIds: [supermarket.id] }),
    createTask('Twitterで見た本'),
    createTask('美容院の予約'),
    { ...createTask('旅行の計画'), createdAt: subDays(today, 20).getTime() },
    createTask('ギターを練習する', SOMEDAY_FIELDS),
  ]

  return { labels: [school, supermarket], tasks }
}
