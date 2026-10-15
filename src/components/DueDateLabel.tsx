import { getDueDateText } from '../models/dueDate.ts'

type DueDateLabelProps = {
  dueDate: string
}

export const DueDateLabel = ({ dueDate }: DueDateLabelProps) => {
  const { main, sub, isOverdue } = getDueDateText(dueDate, new Date())

  return (
    <span
      data-overdue={isOverdue}
      className="flex flex-none flex-col items-end pr-1 text-xs leading-tight text-content-muted data-[overdue=true]:text-overdue"
    >
      {main}
      {isOverdue && <span className="sr-only">過ぎました</span>}
      {sub && <span>{sub}</span>}
    </span>
  )
}
