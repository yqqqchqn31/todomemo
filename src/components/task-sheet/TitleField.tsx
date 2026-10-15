import { useState } from 'react'

type TitleFieldProps = {
  title: string
  onRename: (title: string) => void
}

export const TitleField = ({ title, onRename }: TitleFieldProps) => {
  const [draft, setDraft] = useState(title)

  const commit = () => {
    const trimmed = draft.trim()
    if (trimmed === '' || trimmed === title) {
      setDraft(title)
      return
    }

    onRename(trimmed)
  }

  return (
    <>
      <label htmlFor="task-title" className="sr-only">
        タスク名
      </label>
      <input
        id="task-title"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        className="w-full border-b-[1.5px] border-content bg-transparent pt-1.5 pb-2.5 text-xl font-bold"
      />
    </>
  )
}
