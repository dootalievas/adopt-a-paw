/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateProvider';

const DogsTable = ({ }) => {
    const [sortConfig, setSortConfig] = useState<'asc' | 'desc' | null>(null);
    const { dogs, addToFavorites } = useGlobalState();



    const handleSort = () => {
        if (sortConfig === 'asc') {
            setSortConfig('desc');
        } else {
            setSortConfig('asc');
        }
    };

    const sortedDogs = [...dogs].sort((a, b) => {
        if (sortConfig === 'asc') {
            return a.age - b.age;
        } else if (sortConfig === 'desc') {
            return b.age - a.age;
        }
        return 0;
    });

    return (
        <div className="p-4">
            <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mb-6">
                <iframe
                    className="w-24 h-24"
                    src="https://lottie.host/embed/d2273154-70ba-4a69-85ed-824d5f41456e/mtxH1aeFZ9.json"
                    title='paws'
                ></iframe>
                <p className="text-center text-3xl md:text-6xl p-2 md:p-4">Available paws</p>
                <iframe
                    className="w-24 h-24"
                    src="https://lottie.host/embed/d2273154-70ba-4a69-85ed-824d5f41456e/mtxH1aeFZ9.json"
                    title='paws'
                ></iframe>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto rounded-lg shadow-lg bg-gray-100">
                    <thead>
                        <tr className="bg-[#313131] text-white">
                            <th className="px-4 py-2 text-left">Photo</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th
                                className="px-4 py-2 text-left cursor-pointer"
                                onClick={handleSort}
                            >
                                Age {sortConfig === "asc" ? "↑" : sortConfig === "desc" ? "↓" : ""}
                            </th>
                            <th className="px-4 py-2 text-left">Breed</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedDogs.map((dog) => (
                            <tr
                                key={dog.id}
                                className="hover:bg-pastel-blue transition duration-300 ease-in-out"
                            >
                                <td className="px-4 py-2 border-b border-gray-200">
                                    <div className="flex justify-start">
                                        <img
                                            src={dog.img}
                                            alt={dog.name}
                                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-lg"
                                            loading="lazy"
                                        />
                                    </div>
                                </td>
                                <td className="px-4 py-2 border-b border-gray-200 text-dark-charcoal">
                                    {dog.name}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-200 text-gray-500">
                                    {dog.age}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-200 text-gray-500">
                                    {dog.breed}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-200 text-gray-500">
                                    {dog.zip_code}
                                </td>
                                <td className="px-4 py-2 border-b border-gray-200">
                                    <div className="flex justify-start">
                                        <button
                                            className="bg-orange-600 hover:bg-orange-400 hover:text-black text-white py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
                                            onClick={() => addToFavorites(dog.id)}
                                        >
                                            Add to Favorites
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default DogsTable;

