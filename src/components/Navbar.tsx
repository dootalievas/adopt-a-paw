/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#313131] w-full p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-orange-600 text-3xl font-bold flex items-center">
                    <p>Adopt a Paw</p>
                    <iframe
                        className="w-14 h-14"
                        src="https://lottie.host/embed/d2273154-70ba-4a69-85ed-824d5f41456e/mtxH1aeFZ9.json"
                    ></iframe>
                </div>

                {/* Links - Hidden on small screens and toggled by the hamburger menu */}
                <div className="hidden md:flex space-x-4 text-2xl">
                    <a href="#" className="text-white hover:text-orange-600">
                        Home
                    </a>
                    <a href="#" className="text-white hover:text-orange-600">
                        About Us
                    </a>
                    <a href="#" className="text-white hover:text-orange-600">
                        Adopt
                    </a>
                    <a href="#" className="text-white hover:text-orange-600">
                        Contact
                    </a>
                </div>

                {/* Hamburger Menu */}
                <div className="md:hidden">
                    <button
                        className="text-gray-300 hover:text-black focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4">
                    <a href="#" className="block px-4 py-2 text-black hover:bg-[#F9E3E0] hover:text-black">
                        Home
                    </a>
                    <a href="#" className="block px-4 py-2 text-black hover:bg-[#F9E3E0] hover:text-black">
                        About Us
                    </a>
                    <a href="#" className="block px-4 py-2 text-black hover:bg-[#F9E3E0] hover:text-black">
                        Adopt
                    </a>
                    <a href="#" className="block px-4 py-2 text-black hover:bg-[#F9E3E0] hover:text-black">
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
