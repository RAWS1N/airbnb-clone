"use client"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'

const Logo = () => {
    const router = useRouter()
    const handleClick = () => {
      router.push("/")
    }
  return (
   <Image
        onClick={handleClick}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/images/logo.png"
    />
  )
}

export default Logo