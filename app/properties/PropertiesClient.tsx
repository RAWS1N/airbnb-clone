"use client"

import {useRouter} from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import axios from 'axios'

import { Listing, User } from '@prisma/client'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'


interface PropetiesClientProps {
    listings: Listing[],
    currentUser?: User | null
}

const PropertiesClient: React.FC<PropetiesClientProps> = ({ listings, currentUser }) => {
    const [deletingId,setDeletingId] = useState('')
    const router = useRouter()

    const onCancel = useCallback(async(id:string) => {
        try{
        setDeletingId(id)
        await axios.delete(`/api/listings/${id}`)
        toast.success("Listing Deleted")
        router.refresh()
        } catch(e:any){
            toast.error(e?.response?.data?.message || "Something went wrong")
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
                title="Properties"
                subtitle="List of your properties."
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
                {listings.map((listing) => (
                    <ListingCard 
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={listing.id === deletingId}
                    actionLabel='Delete Property'
                    currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient