import { useEffect, useRef } from 'react'

type Tab = {
  id: string
  label: string
}

type TabBarProps = {
  tabs: Tab[]
  activeIndex: number
  onSelect: (index: number) => void
}

export const TabBar = ({ tabs, activeIndex, onSelect }: TabBarProps) => {
  const tablistRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const activeTab = tablistRef.current?.querySelector('[aria-selected="true"]')
    activeTab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [activeIndex])

  return (
    <div
      ref={tablistRef}
      role="tablist"
      className="flex flex-none scroll-px-3 gap-1 overflow-x-auto border-b border-border px-3 [scrollbar-width:none] after:w-2 after:flex-none after:content-['']"
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onSelect(index)}
            className={`flex h-11 flex-none items-center border-b-3 px-2 whitespace-nowrap ${
              isActive ? 'border-highlight font-bold text-content' : 'border-transparent text-content-muted'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
