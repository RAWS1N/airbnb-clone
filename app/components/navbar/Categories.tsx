"use client"
import React from 'react'
import Container from '../Container'
import {TbBeach,TbMountain, TbPool} from 'react-icons/tb'
import {GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill} from 'react-icons/gi'
import {MdOutlineVilla} from 'react-icons/md'
import {FaSkiing} from 'react-icons/fa'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { BsSnow } from 'react-icons/bs'
import {IoDiamond} from 'react-icons/io5'

export const categories = [
    {
        label : "Beach",
        Icon : TbBeach,
        description : "This property is close to the beach!"
    },
    {
        label : "Windmills",
        Icon : GiWindmill,
        description : "This property has wind mills"
    },
    {
        label : "Modern",
        Icon : MdOutlineVilla,
        description : "This property is modern"
    },
    {
        label : "Countryside",
        Icon : TbMountain,
        description : "This property is in the countryside"
    },
    {
        label :"Pools",
        Icon : TbPool,
        description : "This property has a pool"
    },
    {
        label :"Islands",
        Icon : GiIsland,
        description : "This property is on an island"
    },
    {
        label :"Lake",
        Icon : GiBoatFishing,
        description : "This property is close to a lake"
    },
    {
        label :"Skiing",
        Icon :FaSkiing,
        description : "This property has skiing activities!"
    },
    {
        label :"Castels",
        Icon :GiCastle,
        description : "This property is in a castle"
    },
    {
        label :"Arctic",
        Icon :BsSnow,
        description : "This property is close to an arctic"
    },
    {
        label :"Cave",
        Icon :GiCaveEntrance,
        description : "This property is in a cave"
    },
    {
        label :"Desert",
        Icon :GiCactus,
        description : "This property is in a desert"
    },
    {
        label :"Barns",
        Icon :GiBarn,
        description : "This property is in the barn"
    },
    {
        label :"Lux",
        Icon :IoDiamond,
        description : "This property is luxurious"
    },
]

const Categories = () => {
    const params = useSearchParams()
    const currentCategory = params?.get("category")
    const pathName = usePathname()

    const isMainPage = pathName === '/'

    if(!isMainPage){
        return null
    }

  return (
    <Container>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
            {categories.map(category => (
                <CategoryBox
                    key={category.label}
                    label={category.label}
                    Icon={category.Icon}
                    selected={currentCategory === category.label}
                    description={category.description}
                
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories