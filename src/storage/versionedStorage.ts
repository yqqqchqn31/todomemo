type Versioned = { version: number }

export const readVersioned = <T extends Versioned>(key: string, version: number): T | null => {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? 'null') as T | null
    if (saved?.version !== version) return null
    return saved
  } catch {
    return null
  }
}

export const writeVersioned = <T extends Versioned>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // 容量不足やプライベートブラウズの制限で保存できなくても、アプリは使い続けられるようにする
  }
}
