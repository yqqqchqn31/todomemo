type UpcomingLinkProps = {
  count: number
  onClick: () => void
}

export const UpcomingLink = ({ count, onClick }: UpcomingLinkProps) => {
  if (count === 0) return null

  return (
    <button type="button" onClick={onClick} className="mt-4 flex min-h-11 items-center text-sm text-content-muted">
      明日以降 {count}こ ›
    </button>
  )
}
