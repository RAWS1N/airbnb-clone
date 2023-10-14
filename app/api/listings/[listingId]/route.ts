import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string
}

export async function DELETE(req: NextRequest, { params }: { params: IParams }) {
    const { listingId } = params
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    if (!listingId || typeof listingId !== "string") {
        throw new Error('Invalid Listing Id')
    }
    try {
        const listings = await prisma.listing.deleteMany({
            where: {
                id : listingId,
                userId : currentUser.id
            }
        })
        return NextResponse.json(listings,{status:200})
    } catch (e) {
        return NextResponse.json({message:"Could'nt delete property"},{status:400})
    }
}