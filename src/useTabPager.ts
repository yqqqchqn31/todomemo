import { useRef, useState } from 'react'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useTabPager = () => {
  const pagerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = () => {
    const pager = pagerRef.current
    if (!pager) return
    setActiveIndex(Math.round(pager.scrollLeft / pager.clientWidth))
  }

  const goTo = (index: number) => {
    const pager = pagerRef.current
    if (!pager) return
    pager.scrollTo({ left: index * pager.clientWidth, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return { pagerRef, activeIndex, handleScroll, goTo }
}
