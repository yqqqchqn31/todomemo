import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'

const DIRECTION_LOCK_PX = 8
const STRIKE_RATIO = 0.5
const MIN_STRIKE_DISTANCE_PX = 80

type StrikeSwipeOptions = {
  isEnabled: boolean
  onStrike: () => void
}

type SwipeStart = {
  x: number
  y: number
  width: number
}

const toStrikeProgress = (distanceX: number, strikeDistance: number) => {
  if (distanceX <= 0) return 0
  if (distanceX >= strikeDistance) return 1
  return distanceX / strikeDistance
}

export const useStrikeSwipe = ({ isEnabled, onStrike }: StrikeSwipeOptions) => {
  const [progress, setProgress] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const startRef = useRef<SwipeStart | null>(null)
  const didSwipeRef = useRef(false)

  const reset = () => {
    startRef.current = null
    setIsSwiping(false)
    setProgress(0)
  }

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!isEnabled) return
    const { width } = event.currentTarget.getBoundingClientRect()
    startRef.current = { x: event.clientX, y: event.clientY, width }
  }

  const lockDirection = (event: PointerEvent<HTMLElement>, distanceX: number, distanceY: number) => {
    if (Math.abs(distanceY) > DIRECTION_LOCK_PX) {
      startRef.current = null
      return
    }
    if (distanceX < DIRECTION_LOCK_PX) return

    setIsSwiping(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const start = startRef.current
    if (start == null) return

    const distanceX = event.clientX - start.x
    const distanceY = event.clientY - start.y

    if (!isSwiping) {
      lockDirection(event, distanceX, distanceY)
      return
    }

    const strikeDistance = Math.max(start.width * STRIKE_RATIO, MIN_STRIKE_DISTANCE_PX)
    setProgress(toStrikeProgress(distanceX, strikeDistance))
  }

  const handlePointerUp = () => {
    if (isSwiping) didSwipeRef.current = true
    if (progress === 1) onStrike()
    reset()
  }

  const handleClickCapture = (event: MouseEvent) => {
    if (!didSwipeRef.current) return
    didSwipeRef.current = false
    event.stopPropagation()
  }

  return {
    progress,
    isSwiping,
    swipeHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: reset,
      onClickCapture: handleClickCapture,
    },
  }
}
