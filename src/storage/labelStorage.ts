import type { Label } from '../models/label.ts'
import { readVersioned, writeVersioned } from './versionedStorage.ts'

const STORAGE_KEY = 'todomemo-labels'
const CURRENT_VERSION = 1

type SavedData = {
  version: typeof CURRENT_VERSION
  labels: Label[]
}

export const loadLabels = (): Label[] => readVersioned<SavedData>(STORAGE_KEY, CURRENT_VERSION)?.labels ?? []

export const saveLabels = (labels: Label[]) =>
  writeVersioned<SavedData>(STORAGE_KEY, { version: CURRENT_VERSION, labels })
