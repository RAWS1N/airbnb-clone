"use client"

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import { categories } from '@/app/components/navbar/Categories'
import useLoginModal from '@/app/hooks/useLoginModal'
import { Listing, Reservation, User } from '@prisma/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import ListingReservation from '@/app/components/listings/ListingReservation'
import {Range} from 'react-date-range'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
}

interface ListingClientProps {
    listing: Listing & { user: User },
    currentUser?: User | null
    reservations?: Reservation[]
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [] }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const loginModal = useLoginModal()
    const router = useRouter()

    const disabledDates = useMemo(() => {
        let dates: Date[] = []
        reservations?.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [...dates, ...range]
        })
        return dates
    }, [reservations])
    const category = useMemo(() =>
        categories.find(category => category.label === listing.category),
        [listing.category])


    const onCreateReservation = useCallback(async () => {
        if (!currentUser) return loginModal.onOpen()
        try{
        setIsLoading(true)
        const res = await axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        })
        toast.success("Listing reserved!")
        setDateRange(initialDateRange)
        setTimeout(() => router.push('/trips'),1500)
    } catch(e:any){
        toast.error("Something went wrong")
    }
    finally {
        setIsLoading(false)
    }
    }, [
        totalPrice,
        dateRange,
        currentUser,
        listing.id,
        loginModal,
        router
    ])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(dateRange.endDate,dateRange.startDate)
            if(dayCount && listing.price){
               setTotalPrice(listing.price * dayCount)
            }else {
                setTotalPrice(listing.price)
            }
        }
    },[dateRange,listing.price])

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className='
                            grid 
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10 
                            mt-6
                    '>
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                        ">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />

                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default ListingClient