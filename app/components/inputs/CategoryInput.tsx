"use client"

import React from 'react'
import { IconType } from 'react-icons'


interface CategoryInputProps {
  label: string
  onClick: (value: string) => void
  selected: boolean
  Icon: IconType
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, Icon, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
      rounded-xl
      border-2
      p-2 
      flex 
      flex-col
      gap-3 
    hover:border-black 
      transition 
      cursor-pointer
      ${selected ? "border-black" : "border-neutral-200"}
      `
      }
    >
      <Icon size={28}/>
      <div className="font-semibold">
        {label}
      </div>
    </div>
  )
}

export default CategoryInput