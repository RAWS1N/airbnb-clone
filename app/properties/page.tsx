import EmptyState from "../components/EmptyState"
import PropertiesClient from "./PropertiesClient"

import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"
import ClientOnly from "../components/ClientOnly"


const TripsPage = async () => {
    const currentUser = await getCurrentUser()
    const listings = await getListings({ userId: currentUser?.id })

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties."
            />
        )
    }
    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}


export default TripsPage