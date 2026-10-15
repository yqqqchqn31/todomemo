type TaskToastMessageProps = {
  title: string
  result: string
}

export const TaskToastMessage = ({ title, result }: TaskToastMessageProps) => (
  <span className="flex min-w-0 flex-wrap">
    <span className="max-w-full truncate">「{title}」</span>
    <span>{result}</span>
  </span>
)
