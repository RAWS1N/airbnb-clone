import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'


const getFavoriteListings = async() => {
    try{
        const currentUser = await getCurrentUser()
        if(!currentUser){
            return []
        }
        const favorites = await prisma.listing.findMany({
            where : {
                id : {
                    in : [...currentUser.favoriteIds || []]
                }
            }
        })
        return favorites
    } catch(e:any){
        throw new Error()
    }
}


export default getFavoriteListings