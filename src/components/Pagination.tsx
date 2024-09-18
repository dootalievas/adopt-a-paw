import React from 'react'
import { useGlobalState } from '../context/GlobalStateProvider';



const Pagination = () => {

    const { setPage, page, totalPages, handlePageChange } = useGlobalState()

    return (
        <div className="flex  items-center lg:justify-center gap-4 mt-6 w-auto p-4 md:flex-row md:justify-start overflow-auto">
            {/* Previous Button */}
            <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setPage(Math.max(page - 1, 0))}
                disabled={page === 0}
            >
                Previous
            </button>

            {/* Page numbers */}
            {
                Array.from({ length: totalPages ?? 0 }).map((_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded ${page === index ? 'bg-orange-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))
            }

            {/* Next Button */}
            <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setPage(Math.min(page + 1, (totalPages ?? 1) - 1))}
                disabled={page === (totalPages ?? 1) - 1}
            >
                Next
            </button>
        </div >

    );
}

export default Pagination