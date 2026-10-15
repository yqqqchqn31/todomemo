export const LABEL_COLORS = ['purple', 'green', 'blue', 'orange', 'pink', 'teal'] as const

export type LabelColor = (typeof LABEL_COLORS)[number]

export type Label = {
  id: string
  name: string
  color: LabelColor
}

export const createLabel = (name: string, existingCount: number): Label => ({
  id: crypto.randomUUID(),
  name,
  color: LABEL_COLORS[existingCount % LABEL_COLORS.length],
})
