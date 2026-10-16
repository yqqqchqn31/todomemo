import mascotGorone from '../assets/mascot-gorone.webp'

const DEFAULT_HINT = '思いついたら、下の欄にそのまま'

type EmptyStateProps = {
  message: string
  hint?: string
  isMascotShown: boolean
  onLoadSample?: () => void
}

export const EmptyState = ({ message, hint = DEFAULT_HINT, isMascotShown, onLoadSample }: EmptyStateProps) => {
  if (!isMascotShown) return <p className="pt-8 text-center text-sm text-content-muted">{message}</p>

  return (
    <div className="mb-6 flex flex-col items-center pt-12 text-center">
      <img src={mascotGorone} alt="" className="w-56" />
      <p className="mt-4 font-hand text-2xl font-semibold">{message}</p>
      <p className="mt-1 text-sm text-content-muted">{hint}</p>
      {onLoadSample && (
        <button type="button" onClick={onLoadSample} className="mt-6 min-h-11 text-sm text-content-muted underline">
          サンプルを入れて試してみる
        </button>
      )}
    </div>
  )
}
