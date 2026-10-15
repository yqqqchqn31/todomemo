import type { Label } from '../models/label.ts'
import type { TaskSection } from '../models/tab.ts'
import type { Task } from '../models/task.ts'
import { TaskList } from './TaskList.tsx'

type TaskSectionsProps = {
  sections: TaskSection[]
  labels: Label[]
  onToggleCompleted: (task: Task) => void
  onOpen: (task: Task) => void
}

export const TaskSections = ({ sections, labels, onToggleCompleted, onOpen }: TaskSectionsProps) =>
  sections.map((section, index) => (
    <section key={section.title ?? index}>
      {section.title && <h2 className="mt-4 text-xs text-content-muted">{section.title}</h2>}
      <TaskList tasks={section.tasks} labels={labels} onToggleCompleted={onToggleCompleted} onOpen={onOpen} />
    </section>
  ))
