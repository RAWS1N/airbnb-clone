import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'


export async function POST(request:NextRequest,response:NextResponse){
    const {email,name,password} = await request.json()
    try{
        const hashedPassword = await bcrypt.hash(password,12)
        const user = await prisma.user.create({data:{email,name,hashedPassword}})
        return NextResponse.json(user,{status:201})
    }
    catch(e:any){
        console.log(e.message)
        return NextResponse.json({success:false,message:"user not created"},{status:400})
    }
}





