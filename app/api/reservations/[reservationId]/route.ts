import { NextRequest,NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    reservationId?:string
}

export async function DELETE(req:NextRequest,{params}:{params:IParams}){
    const {reservationId} = params
    const currentUser = await getCurrentUser()
    try{
        if(!currentUser){
            return NextResponse.error()
        }
        if(!reservationId || typeof reservationId !==  "string"){
            throw new Error()
        }
        const reservation = await prisma.reservation.deleteMany({
            where : {
                id : reservationId,
                OR : [{userId : currentUser.id},{listing : {userId:currentUser.id}}]
            }
        })
        return NextResponse.json(reservation,{status:202})
    } catch(e:any){
        throw new Error()
    }
}