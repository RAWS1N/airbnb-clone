"use client"

import {useRouter} from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'

import { Listing, Reservation, User } from '@prisma/client'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'


interface TripsClientProps {
    reservations: (Reservation &{listing: Listing})[],
    currentUser?: User | null
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
    const [deletingId,setDeletingId] = useState('')
    const router = useRouter()

    const onCancel = useCallback(async(id:string) => {
        try{
        setDeletingId(id)
        await axios.delete(`/api/reservations/${id}`)
        toast.success("Reservation Cancelled")
        router.refresh()
        } catch(e:any){
            toast.error(e?.response?.data?.error || "Something went wrong")
        }finally {
            setDeletingId("")
        }
    },[router])

    useEffect(() => {
        router.refresh()
    },[])

    return (
        <Container>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you are going?"
            />
            <div className="
            mt-10 grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            ">
                {reservations.map((reservation) => (
                    <ListingCard 
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={reservation.id === deletingId}
                    actionLabel='Cancel reservation'
                    currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient