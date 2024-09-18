import React from 'react'

interface DogCardProps {
    image: string;
    name: string;
    age: number;
    location: string;
    breed: string;
}

const DogCard = ({ image, name, age, location, breed }: DogCardProps) => {
    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-center items-center min-h-6">
            <img
                className="rounded-lg object-cover p-2"
                src={image}
                alt={name}
                style={{ width: '150px', height: '150px' }}
            />
            <div className="px-5 text-center">
                <h5 className="mb-2 text-xl font-bold tracking-tight">{name}</h5>
                <p className="mb-1 font-normal">Breed: {breed}</p>
                <p className="mb-1 font-normal">Age: {age}</p>
                <p className="mb-1 font-normal">Location: {location}</p>
            </div>
        </div>



    )
}

export default DogCard