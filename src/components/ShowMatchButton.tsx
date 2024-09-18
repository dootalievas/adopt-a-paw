import React from 'react'
import { Button } from '@headlessui/react'
import { useGlobalState } from '../context/GlobalStateProvider'

const ShowMatchButton = () => {
    const { handleClick, btnText } = useGlobalState()

    return (
        <Button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-1/5 p-2.5" onClick={handleClick}>
            {btnText}
        </Button>
    )
}

export default ShowMatchButton