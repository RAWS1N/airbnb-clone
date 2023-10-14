import { Listing, User } from '@prisma/client'
import React from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'

interface FavoritesProps {
    favoriteListing: Listing[]
    currentUser?: User | null
}

const FavoritesClient: React.FC<FavoritesProps> = ({ favoriteListing,currentUser }) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you have favorited"
            />
            <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        ">
                {favoriteListing.map(favorite => (
                    <ListingCard
                        key={favorite.id}
                        data={favorite}
                        currentUser={currentUser}
                    />
                ))}

            </div>
        </Container>
    )
}

export default FavoritesClient