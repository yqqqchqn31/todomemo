import mascotGorone from '../assets/mascot-gorone.webp'

type EmptyStateProps = {
  message: string
  isMascotShown: boolean
}

export const EmptyState = ({ message, isMascotShown }: EmptyStateProps) => {
  if (!isMascotShown) return <p className="pt-8 text-center text-sm text-content-muted">{message}</p>

  return (
    <div className="flex flex-col items-center pt-12 text-center">
      <img src={mascotGorone} alt="" className="w-56" />
      <p className="mt-4 font-hand text-2xl font-semibold">{message}</p>
      <p className="mt-1 text-sm text-content-muted">思いついたら、下の欄にそのまま</p>
    </div>
  )
}
