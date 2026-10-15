import { useState, type FormEvent } from 'react'
import { preventSubmitWhileConverting } from '../imeGuard.ts'

type NewLabelInputProps = {
  onCreate: (name: string) => void
}

export const NewLabelInput = ({ onCreate }: NewLabelInputProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')

  const finish = () => {
    const trimmed = name.trim()
    setName('')
    setIsEditing(false)
    if (trimmed === '') return
    onCreate(trimmed)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    finish()
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="min-h-11 rounded-full border border-dashed border-border px-4 text-sm text-content-muted"
      >
        ＋ 新しく
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-label" className="sr-only">
        新しいラベルの名前
      </label>
      <input
        id="new-label"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={preventSubmitWhileConverting}
        onBlur={finish}
        placeholder="名前"
        autoComplete="off"
        enterKeyHint="done"
        autoFocus
        className="min-h-11 w-28 rounded-full border border-content bg-surface-raised px-4 text-base"
      />
    </form>
  )
}
