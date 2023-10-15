"use client"

import EmptyState from "./components/EmptyState"
import {useEffect} from 'react'

interface ErrorProps {
  error : Error
}

const Error:React.FC<ErrorProps> = ({error}) => {

  useEffect(() => {
    console.log(error)
  },[])

  return (
    <EmptyState
        title="Uh Oh"
        subtitle="Something went wrong!"
    />
  )
}

export default Error