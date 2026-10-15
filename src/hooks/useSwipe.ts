import { useRef, type PointerEvent } from 'react'

const SWIPE_THRESHOLD_PX = 50

type SwipeCallbacks = {
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight }: SwipeCallbacks) => {
  const startXRef = useRef<number | null>(null)

  const handlePointerDown = (event: PointerEvent) => {
    startXRef.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent) => {
    const startX = startXRef.current
    startXRef.current = null
    if (startX == null) return

    const distance = event.clientX - startX
    if (distance <= -SWIPE_THRESHOLD_PX) {
      onSwipeLeft()
      return
    }
    if (distance >= SWIPE_THRESHOLD_PX) onSwipeRight()
  }

  return { onPointerDown: handlePointerDown, onPointerUp: handlePointerUp }
}
