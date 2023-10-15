import EmptyState from "./components/EmptyState"

interface ErrorProps {
    error : any
}

const Error:React.FC<ErrorProps> = ({error}) => {
  return (
    <EmptyState
        title="Uh Oh"
        subtitle="Something went wrong!"
    />
  )
}

export default Error