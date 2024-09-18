import React from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useGlobalState } from '../context/GlobalStateProvider';


const SelectBreed = () => {
    const { selectedBreed, setSelectedBreed, breeds, showMatch } = useGlobalState()
    return (
        <>
            {showMatch ? null : (<div className="w-1/5">
                <Listbox value={selectedBreed} onChange={setSelectedBreed}>
                    <div className="relative">
                        <ListboxButton className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5">
                            {selectedBreed || 'All Breeds'}
                        </ListboxButton>

                        <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <ListboxOption value="">
                                {({ active, selected }) => (
                                    <div
                                        className={`cursor-pointer select-none relative py-2 pl-10 pr-4 ${selected ? 'bg-orange-600 text-white' : 'text-gray-900'
                                            } ${active ? 'bg-orange-200' : ''}`}
                                    >
                                        All Breeds
                                    </div>
                                )}
                            </ListboxOption>
                            {breeds.map((breed) => (
                                <ListboxOption key={breed} value={breed}>
                                    {({ active, selected }) => (
                                        <div
                                            className={`cursor-pointer select-none relative py-2 pl-10 pr-4 ${selected ? 'bg-orange-600 text-white' : 'text-gray-900'
                                                } ${active ? 'bg-orange-200' : ''}`}
                                        >
                                            {breed}
                                        </div>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </Listbox>
            </div>)}
        </>
    )
}

export default SelectBreed