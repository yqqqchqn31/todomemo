export function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: Date.now(),
  }
}
