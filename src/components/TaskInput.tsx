import { useState, type FormEvent, type PointerEvent } from 'react'
import { ArrowUpIcon } from './icons/ArrowUpIcon.tsx'
import { preventSubmitWhileConverting } from './imeGuard.ts'

const keepKeyboardOpen = (event: PointerEvent) => {
  event.preventDefault()
}

type TaskInputProps = {
  onAdd: (title: string) => void
}

export const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const title = text.trim()
    if (title === '') return
    onAdd(title)
    setText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-x-0 bottom-0 mx-auto flex max-w-lg gap-2 border-t border-border bg-surface px-3 pt-2.5 pb-safe-3"
    >
      <label htmlFor="new-task" className="sr-only">
        タスクを書く
      </label>
      <input
        id="new-task"
        className="h-12 flex-1 rounded-full border-[1.5px] border-content bg-surface-raised px-4 text-base text-content"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={preventSubmitWhileConverting}
        placeholder="思いついたら、そのまま書く"
        autoComplete="off"
        enterKeyHint="send"
        autoFocus
      />
      <button
        type="submit"
        aria-label="追加"
        className="flex size-12 flex-none items-center justify-center rounded-full bg-content text-surface-raised"
        onPointerDown={keepKeyboardOpen}
      >
        <ArrowUpIcon className="size-6" />
      </button>
    </form>
  )
}
