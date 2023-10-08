"use client"
import useCountries from '@/app/hooks/useCountries'
import { Listing, Reservation, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import Button from '../Button'

interface ListingCardProps {
  currentUser? : User | null,
  data : Listing,
  reservation?:Reservation
  onAction?: (id:string) => void
  disabled?:boolean
  actionLabel?:string
  actionId?:string
}

const ListingCard:React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId=""
}) => {
  const router = useRouter()
  const {getByValue}  = useCountries()
  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(disabled) return 
    onAction?.(actionId)
  },[onAction,actionId,disabled])

  const price = useMemo(() => {
    if(reservation) return reservation.totalPrice
    return data.price
  },[reservation,data.price])

  const reservationDate = useMemo(() => {
    if(!reservation) return null
    const startDate = new Date(reservation.startDate)
    const endDate  = new Date(reservation.endDate)
    return `${format(startDate,"PP")} - ${format(endDate,"PP")}`
    
  },[reservation])

  return (
    <div 
    onClick={() => router.push(`/listings/${data.id}`)}
    className="col-span-1 first-letter:cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="
        aspect-square
        relative w-full
        overflow-hidden
        rounded-xl
        ">
          <Image 
          fill
          src={data.imageSrc} 
          alt="listing"
          className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
              <HeartButton
                listingId={data.id}
                currentUser={currentUser}
              />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex items-center gap-1">
            <div className="font-semibold">
              ₹ {price}
            </div>
            {!reservation && <div className="fint-light">Night</div>}
        </div>
        {onAction && actionLabel && (
          <Button small onClick={handleCancel} label={actionLabel} disabled={disabled}/>
        )}
      </div>
    </div>
  )
}

export default ListingCard