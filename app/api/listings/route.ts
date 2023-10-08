import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(req: NextRequest, res: NextResponse) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    const body = await req.json()
    const {
        title,
        description,
        category,
        imageSrc,
        roomCount,
        bathroomCount,
        location,
        guestCount,
        price
    } = body

    Object.keys(body).forEach((value:any) => {
        if(!body[value]){
            return NextResponse.error()
        }
    })
    const listing = await prisma.listing.create({data:{
        title,
        description,
        roomCount,
        bathroomCount,
        category,
        imageSrc,
        locationValue:location.value,
        guestCount,
        price:parseInt(price,10),
        userId : currentUser.id
    }})
    return NextResponse.json(listing,{status:201})
}