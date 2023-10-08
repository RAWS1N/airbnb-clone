import {NextResponse,NextRequest} from 'next/server'
import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'


export async function POST(request:NextRequest,response:NextResponse) {
    const data = await request.json()
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = data
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()
    }

    if(!listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where : {
            id : listingId
        },
        data : {
            reservation : {
                create : {
                    userId : currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}