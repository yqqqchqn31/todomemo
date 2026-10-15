type TaskToastMessageProps = {
  title: string
  result: string
}

export const TaskToastMessage = ({ title, result }: TaskToastMessageProps) => (
  <span className="flex min-w-0">
    <span className="truncate">「{title}</span>
    <span className="flex-none">」{result}</span>
  </span>
)
