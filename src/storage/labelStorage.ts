import type { Label } from '../models/label.ts'

const STORAGE_KEY = 'todomemo-labels'
const CURRENT_VERSION = 1

type SavedData = {
  version: typeof CURRENT_VERSION
  labels: Label[]
}

export const loadLabels = (): Label[] => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as SavedData | null
    if (saved?.version !== CURRENT_VERSION) return []
    return saved.labels
  } catch {
    return []
  }
}

export const saveLabels = (labels: Label[]) => {
  const data: SavedData = { version: CURRENT_VERSION, labels }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // 容量不足やプライベートブラウズの制限で保存できなくても、アプリは使い続けられるようにする
  }
}
