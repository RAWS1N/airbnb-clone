export const dynamic = 'auto'
export const dynamicParams = true

import getCurrentUser from "./actions/getCurrentUser";
import getListings,{ListingParams} from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams : ListingParams
}

const Home =  async({searchParams}:HomeProps) =>  {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if(listings.length === 0){
    return (
      <EmptyState showReset/>
    )
  }
  return (
    <Container>
      <div
      className="
      pt-24 
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
      ">
        {listings.map(listing => (
          <ListingCard
          key={listing.id}
          currentUser={currentUser}
          data={listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default Home
