import type { KeyboardEvent } from 'react'

// SafariではisComposingがfalseのまま確定のEnterが届くことがあるため、変換中を示すkeyCode 229も見る
const isConfirmingConversion = (event: KeyboardEvent) =>
  event.nativeEvent.isComposing || event.keyCode === 229

export const preventSubmitWhileConverting = (event: KeyboardEvent) => {
  if (event.key !== 'Enter' || !isConfirmingConversion(event)) return
  event.preventDefault()
}
