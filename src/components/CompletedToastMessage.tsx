type CompletedToastMessageProps = {
  title: string
}

export const CompletedToastMessage = ({ title }: CompletedToastMessageProps) => (
  <span className="flex min-w-0">
    <span className="truncate">「{title}</span>
    <span className="flex-none">」を完了しました</span>
  </span>
)
