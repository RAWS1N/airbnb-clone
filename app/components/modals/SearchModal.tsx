"use client"

import React, { useCallback, useMemo, useState } from 'react'
import qs from 'query-string'
import Modal from './Modal'
import useSearchModal from '@/app/hooks/useSearchModal'
import { useSearchParams, useRouter } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect'
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import Calendar from '../inputs/Calendar'
import Counter from '../inputs/Counter'

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const searchModal = useSearchModal()
    const router = useRouter()
    const params = useSearchParams()

    const [location, setLocation] = useState<CountrySelectValue>()
    const [steps, setSteps] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)

    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    })


    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])


    const onBack = useCallback(() => {
        setSteps(prev => prev - 1)
    }, [])

    const onNext = useCallback(() => {
        setSteps(prev => prev + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (steps !== STEPS.INFO) {
            return onNext()
        }
        let currentQuery: any = {}
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            roomCount,
            bathroomCount,
            guestCount,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, { skipNull: true })
        setSteps(STEPS.LOCATION)
        searchModal.onClose()
        router.push(url)

    }, [
        steps,
        searchModal,
        location,
        router,
        roomCount,
        guestCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ])

    const selectCountry = (value: CountrySelectValue) => {
        setLocation(value)
    }

    const actionLabel = useMemo(() => {
        if (steps !== STEPS.INFO) {
            return "Next"
        }
        return "Submit"
    }, [steps])

    const secondaryActionLabel = useMemo(() => {
        if (steps === STEPS.LOCATION) {
            return undefined
        }
        return 'Back'
    }, [steps])

   

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title="Where do you wanna go?"
                subtitle="find your perfect location"
            />
            <CountrySelect onChange={selectCountry} />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )


    if(steps === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle='Make sure everyone is free!'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if(steps === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guest are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}
            disabled={false}
            body={bodyContent}
        />
    )
}

export default SearchModal