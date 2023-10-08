import prisma from "@/app/libs/prismadb"



const getListingById = async(listingId?:string) => {
    try {
        const listing = await prisma.listing.findFirst({
            where : {
                id : listingId
            },
            include : {
                user : true
                
                    
            },
            
        })
        if(!listingId) return null
        return listing
    }
    catch(e:any){
        throw new Error(e)
    }
}


export default getListingById