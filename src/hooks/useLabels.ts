import { useEffect, useState } from 'react'
import { createLabel, type Label } from '../models/label.ts'
import { loadLabels, saveLabels } from '../storage/labelStorage.ts'

export const useLabels = () => {
  const [labels, setLabels] = useState(loadLabels)

  useEffect(() => {
    saveLabels(labels)
  }, [labels])

  const addLabel = (name: string) => {
    const existingLabel = labels.find((label) => label.name === name)
    if (existingLabel != null) return existingLabel

    const label = createLabel(name, labels.length)
    setLabels((currentLabels) => [...currentLabels, label])
    return label
  }

  const addLabels = (newLabels: Label[]) => {
    setLabels((currentLabels) => [...currentLabels, ...newLabels])
  }

  const removeLabelsById = (ids: string[]) => {
    setLabels((currentLabels) => currentLabels.filter((label) => !ids.includes(label.id)))
  }

  const replaceLabels = (nextLabels: Label[]) => setLabels(nextLabels)

  return { labels, addLabel, addLabels, removeLabelsById, replaceLabels }
}
