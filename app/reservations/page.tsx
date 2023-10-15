import EmptyState from "../components/EmptyState"

import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservation"
import ReservationsClient from "./ReservationsClient"
import ClientOnly from "../components/ClientOnly"

const ReservationPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="looks like you have no reservation on your property"
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationPage