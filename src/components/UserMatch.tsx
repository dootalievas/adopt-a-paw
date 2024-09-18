/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import { useGlobalState } from '../context/GlobalStateProvider'
import DogCard from './DogCard'
import { Button } from '@headlessui/react'

const UserMatch = () => {
    const { match, generateMatch, } = useGlobalState()

    return (
        <div >
            <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-6">
                <iframe
                    className="w-24 h-24"
                    src="https://lottie.host/embed/d2273154-70ba-4a69-85ed-824d5f41456e/mtxH1aeFZ9.json"
                ></iframe>
                <p className="text-center text-3xl md:text-6xl p-2 md:p-4">{'Your matching paws!'}</p>
                <iframe
                    className="w-24 h-24"
                    src="https://lottie.host/embed/d2273154-70ba-4a69-85ed-824d5f41456e/mtxH1aeFZ9.json"
                ></iframe>
            </div>
            {match ? (
                <div className="flex flex-col justify-center items-center gap-6">
                    <DogCard
                        image={match.img} name={match.name} age={match.age} breed={match.breed} location={match.zip_code} />
                    <Button className=" border border-gray-300 text-white text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-1/5 p-2.5 bg-orange-500" onClick={generateMatch} >
                        Rematch
                    </Button>
                </div>
            ) : (<p className="text-center text-3xl md:text-6xl p-2 md:p-4">No paws have been selected</p>)}
        </div>
    )
}

export default UserMatch