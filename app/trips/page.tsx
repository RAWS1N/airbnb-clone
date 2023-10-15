import EmptyState from "../components/EmptyState"
import TripsClient from "./TripsClient"

import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservation"
import ClientOnly from "../components/ClientOnly"


const TripsPage = async () => {
    const currentUser = await getCurrentUser()
    const reservations = await getReservations({ userId: currentUser?.id })

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you haven't reserved any trips."
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}


export default TripsPage