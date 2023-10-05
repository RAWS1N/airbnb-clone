"use client"

import React from 'react'
import { IconType } from 'react-icons'


interface ButtonProps {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    Icon?: IconType
}

const Button: React.FC<ButtonProps> = (
    {
        label,
        onClick,
        disabled,
        Icon,
        small,
        outline
    }
) => {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        relative rounded-lg hover:opacity-80
        transition w-full 
        ${outline ? "bg-white" : 'bg-rose-500'}
        ${outline ? "border-black" : 'border-rose-500'}
        ${outline ? "text-black" : 'text-white'}
        ${small ? "py-1 text-sm font-light border-[1px]" : 'py-2 text-md font-semibold border-2'}
        
        `}
        >
            {Icon ? <Icon size={18}
                className="absolute left-4 top-3"
            /> : null}

            {label}
        </button>
    )
}

export default Button