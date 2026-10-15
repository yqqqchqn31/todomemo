import { useEffect, useState } from 'react'
import { createLabel } from '../models/label.ts'
import { loadLabels, saveLabels } from '../storage/labelStorage.ts'

export const useLabels = () => {
  const [labels, setLabels] = useState(loadLabels)

  useEffect(() => {
    saveLabels(labels)
  }, [labels])

  const addLabel = (name: string) => {
    const label = createLabel(name, labels.length)
    setLabels((currentLabels) => [...currentLabels, label])
    return label
  }

  return { labels, addLabel }
}
