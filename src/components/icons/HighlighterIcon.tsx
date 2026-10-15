type HighlighterIconProps = {
  className?: string
}

export const HighlighterIcon = ({ className }: HighlighterIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 21.5h16" className="stroke-highlight" strokeWidth="3.5" />
    <path d="M14.5 4.5l5 5-7.5 7.5h-5v-5z" />
    <path d="M7 12l5 5" />
    <path d="M7 17l-2.5 2.5h3.5l1-1" />
  </svg>
)
