export type Tab = {
  id: string
  label: string
}

type TabBarProps = {
  tabs: Tab[]
  activeIndex: number
  onSelect: (index: number) => void
}

export const TabBar = ({ tabs, activeIndex, onSelect }: TabBarProps) => (
  <div role="tablist" className="flex gap-1 border-b border-border px-3">
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
          className={`flex h-11 items-center border-b-3 px-2 ${
            isActive ? 'border-highlight font-bold text-content' : 'border-transparent text-content-muted'
          }`}
        >
          {tab.label}
        </button>
      )
    })}
  </div>
)
