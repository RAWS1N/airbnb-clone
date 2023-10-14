import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string,
    userId?: string,
    authorId?: string
}

const getReservations = async (params: IParams) => {
    try {
        const { listingId, userId, authorId } = params
        const query: any = {}

        if (listingId){
            query.listingId = listingId
        } 
        if (userId){
            query.userId = userId
        } 
        if (authorId){
            query.listing = { userId: authorId }
        } 

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        // const SafeReservations = reservations.map(reservation => ({
        //     ...reservation,
        //     listing : {...reservation.listing}
        // }))
        return reservations

    } catch (e: any) { 
        throw new Error()
    }
}


export default getReservations