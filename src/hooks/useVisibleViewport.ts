import { useEffect } from 'react'

export const useVisibleViewport = () => {
  useEffect(() => {
    const viewport = window.visualViewport
    if (viewport == null) return

    const syncToVisibleArea = () => {
      document.documentElement.style.setProperty('--visible-height', `${viewport.height}px`)
      document.documentElement.style.setProperty('--visible-top', `${viewport.offsetTop}px`)
    }

    syncToVisibleArea()
    viewport.addEventListener('resize', syncToVisibleArea)
    viewport.addEventListener('scroll', syncToVisibleArea)

    return () => {
      viewport.removeEventListener('resize', syncToVisibleArea)
      viewport.removeEventListener('scroll', syncToVisibleArea)
    }
  }, [])
}
