import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import EmptyState from '../components/EmptyState'
import FavoritesClient from './FavoritesClient'



const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  const favoriteListing = await getFavoriteListings()
  if (favoriteListing.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listing'
      />
    )
  }
  return (
    <FavoritesClient favoriteListing={favoriteListing} currentUser={currentUser}/>
  )
}

export default FavoritesPage